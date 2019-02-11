import * as net from "net";
import * as grpc from "grpc";
import * as health from "grpc-health-check/health";
import {sendUnaryData, ServerUnaryCall} from "grpc";
import {TypedName} from "../pcore/TypedName";
import {Data} from "../../generated/datapb/data_pb";
import {Serializer} from "../pcore/Serializer";
import {consumePBData, ProtoConsumer} from "../pcore/ProtoConsumer";
import {Context} from "../pcore/Context";
import {StreamLogger} from "../pcore/Logger";
import {Deserializer} from "../pcore/Deserializer";
import {EmptyRequest, InvokeRequest, MetadataResponse, StateRequest} from "../../generated/servicepb/service_pb";
import {DefinitionServiceService} from "../servicepb/service_grpc_pb";
import {ManifestLoader} from "./ManifestLoader";

export class Service {
  readonly serviceId : TypedName;
  readonly callables : {[s: string] : Object}
  private readonly server: grpc.Server;
  private readonly startPort : number;
  private readonly endPort : number;
  private readonly context : Context;

  private static getAvailablePort(start : number, end : number) : Promise<number> {
    function getNextAvailablePort(currentPort : number, resolve : (port : number) => void, reject : (reason? : Error) => void) {
      const server = net.createServer();
      server.listen(currentPort, () => {
        server.once('close', () => {
          resolve(currentPort);
        });
        server.close();
      });

      server.on('error', () => {
        if(++currentPort >= end) {
          reject(new Error(`unable to find a free port in range ${start} - ${end}`))
        } else {
          getNextAvailablePort(++currentPort, resolve, reject);
        }
      });
    }
    return new Promise((resolve, reject) => {
      getNextAvailablePort(start, resolve, reject);
    });
  }

  private static toData(ctx : Context, value : any) : Data {
    let consumer = new ProtoConsumer();
    let ser = new Serializer(ctx, {});
    ser.convert(value, consumer);
    return consumer.value();
  }

  private static fromData(ctx : Context, value : any) : any {
    let consumer = new Deserializer(ctx, {});
    consumePBData(value, consumer);
    return consumer.value();
  }

  constructor(nsBase : {}, serviceId : TypedName, startPort : number, endPort : number) {
    this.server = new grpc.Server();
    this.serviceId = serviceId;
    this.startPort = startPort;
    this.endPort = endPort;
    this.context = new Context(nsBase, new StreamLogger(process.stderr));

    this.callables = {'JS::ManifestLoader': new ManifestLoader(this)};
    this.server.addService(health.service, new health.Implementation({plugin: 'SERVING'}));

    this.server.addService(DefinitionServiceService, {
      identity: (call: ServerUnaryCall<EmptyRequest>, callback: sendUnaryData<Data>) => {
        callback(null, Service.toData(this.context, this.serviceId));
      },

      invoke: (call: ServerUnaryCall<InvokeRequest>, callback: sendUnaryData<Data>) => {
        let rq = call.request;
        let args = (<Array<any>>Service.fromData(this.context,rq.getArguments()));
        let c = this.callables[rq.getIdentifier()];
        if(c === undefined) {
          throw `Unable to find implementation of ${rq.getIdentifier()}`;
        }
        let m = c[rq.getMethod()];
        if(m === undefined) {
          throw `Implementation of ${rq.getIdentifier()} has no method named ${rq.getMethod()}`;
        }
        callback(null, Service.toData(this.context, m(...args)));
      },

      metadata: (call: ServerUnaryCall<EmptyRequest>, callback: sendUnaryData<MetadataResponse>) => {
        callback(null, new MetadataResponse());
      },

      state: (call: ServerUnaryCall<StateRequest>, callback: sendUnaryData<Data>) => {
        throw `Request for unknown state ${call.request.getIdentifier()}`;
      }
    });
  }

  start() {
    Service.getAvailablePort(this.startPort, this.endPort).then(port => {
      let addr = `0.0.0.0:${port}`;
      this.server.bind(addr, grpc.ServerCredentials.createInsecure());

      // go-plugin awaits this reply on stdout
      console.log(`1|1|tcp|${addr}|grpc`);

      process.stderr.write(`using address ${addr}\n`);
      this.server.start();
    });
  }
}
