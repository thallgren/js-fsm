/*
import * as grpc from "grpc";
import * as fsmpb from "../servicepb/service_pb";
import * as fsm_grpc from "../servicepb/service_grpc_pb";
import * as datapb from "../datapb/reflect"

import * as health from "grpc-health-check/health";
import {toPcoreType} from "./puppet_types";
import * as net from "net";
import {ServerDuplexStream} from "grpc";
import {Data, FromDataConverter, ToDataConverter} from "./richdata";

const InvokeActivity = 0;
const GenesisResource = 10;
const GenesisNotice = 11;

export type NamedValues = { [s: string]: any };
export type StringMap = { [s: string]: string };

type ActivityData = [string, string, NamedValues];

function isNamedValues(value: any): value is NamedValues {
  return typeof value === 'object' && value.constructor == Object;
}

function isActivityData(value : any): value is ActivityData {
  if(Array.isArray(value)) {
    let av = <any[]>value;
    return av.length === 3 && typeof av[0] === 'string' && typeof av[1] === 'string' && isNamedValues(av[2]);
  }
  return false;
}

type ActivityFunction = (genesis: Context, input: NamedValues) => Promise<NamedValues>;
type MessageStream = ServerDuplexStream<fsmpb.Message, fsmpb.Message>

export type ParamDecl = { type: string, lookup: Data }
export type ParamMap = { [x: string]: string | ParamDecl }

type IterAtom = number | string | boolean | ParamDecl;
export type IterValue = number | ParamDecl | Array<IterAtom> | { [x:string]: IterAtom }

export interface Activity {
  readonly input?: ParamMap;
  readonly output?: StringMap;
}

export interface Function extends Activity {
  readonly iterate?: IterValue;
  readonly producer: ActivityFunction;
}

export interface Actor extends Activity {
  readonly activities : { [s: string]: Function | Actor };
}

export abstract class Resource {
  readonly title: string;

  protected constructor({title}: { title: string }) {
    this.title = title
  }

  __ptype() : string {
    return 'Resource'
  }

  __pvalue() : {[s: string]: any} {
    return { title: this.title };
  }
}
export class Context {
  private readonly stream: MessageStream;
  private readonly toData: ToDataConverter;
  private readonly fromData: FromDataConverter;
  private readonly nsBase: {}

  private call<T extends {}>(id: number, argsHash: {}): Promise<T> {
    return new Promise((resolve: (result: T) => void, reject: (reason?: any) => void) => {
      try {
        let am = new fsmpb.Message();
        am.setId(id);
        am.setValue(datapb.toData(this.toData.convert(argsHash)));

        let stream = this.stream;
        stream.once('data', (result: fsmpb.Message) => {
          if (result.getId() != id) {
            throw new Error(`expected reply with id ${id}, got ${result.getId()}`);
          }
          resolve(this.fromData.convert(<T>datapb.fromData(result.getValue())));
        });
        stream.write(am);
      } catch (err) {
        reject(err);
      }
    });
  }

  resource<T extends Resource>(resource: T): Promise<T> {
    return this.call<T>(GenesisResource, resource)
  }

  notice(message: string): void {
    let am = new fsmpb.Message();
    am.setId(GenesisNotice);
    am.setValue(datapb.toData(message));
    this.stream.write(am);
  }

  constructor(nsBase: {}, stream: MessageStream) {
    this.nsBase = nsBase;
    this.stream = stream;
    this.toData = new ToDataConverter(this.nsBase);
    this.fromData = new FromDataConverter(this.nsBase);
  }
}

class FunctionImpl implements Function {
  readonly producer: ActivityFunction;
  readonly iterate?: IterValue;
  readonly input?: ParamMap;
  readonly output?: StringMap;

  constructor(activity : Function) {
    this.producer = activity.producer;
    this.iterate = activity.iterate;
    this.input = activity.input;
    this.output = activity.output;
  }

  private static convertType(t : string, types: StringMap) : string {
    let ct = types[t];
    if(ct === undefined)
      ct = toPcoreType(t);
    return ct;
  }

  static createParams(values: ParamMap, types: StringMap): Array<fsmpb.Parameter> {
    let params: Array<fsmpb.Parameter> = [];
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        let value = values[key];
        let p = new fsmpb.Parameter();
        if(typeof value === 'string') {
          p.setType(this.convertType(<string>value, types));
        } else {
          let pd = <ParamDecl>value;
          p.setType(this.convertType(pd.type, types));
          p.setLookup(datapb.toData(pd.lookup));
        }
        p.setName(key);
        params.push(p);
      }
    }
    return params;
  }

  pbActivity(name: string, types: StringMap): fsmpb.Activity {
    let a = new fsmpb.Activity();
    a.setName(name);
    a.setInputList(FunctionImpl.createParams(this.input, types));
    a.setOutputList(FunctionImpl.createParams(this.output, types));
    if(this.iterate !== undefined)
      a.setIterate(datapb.toData(this.iterate));
    return a;
  }
}

export class Service {
  private readonly server: grpc.Server;
  private readonly startPort : number;
  private readonly endPort : number;
  private readonly actors : { [s: string]: Actor };
  private readonly types : StringMap;
  private readonly nsBase : {};

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

  constructor(nsBase : {}, startPort : number, endPort : number) {
    this.nsBase = nsBase;
    this.server = new grpc.Server();
    this.startPort = startPort;
    this.endPort = endPort;
    this.actors = {};
    this.types = {};
    this.server.addService(health.service, new health.Implementation({plugin: 'SERVING'}));
    this.server.addService(fsm_grpc.ActorsService, {
      getActor : (call : grpc.ServerUnaryCall<fsmpb.ActorRequest>, callback : (error : Error | null, actor : fsmpb.Actor) => void) => {
        callback(null, this.getActor(call.request.getName()))
      },
      invokeActivity: (stream: MessageStream) => {
        stream.on('data', am => {
          if (am.getId() == InvokeActivity) {
            this.invokeActivity(am, stream)
          }
        });
        stream.on('end', () => stream.end());
      },
    });
  }

  addActor(name : string, declaration: Actor) : void {
    this.actors[name] = new ActorImpl(name, declaration);
  }

  registerType(name : string, decl: string) {
    this.types[name] = toPcoreType(decl);
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

  private getActor(actorName : string): fsmpb.Actor {
    // TODO: Load on demand instead of using addActor function to populate
    let actor = this.actors[actorName];
    if(actor !== undefined) {
      let ar = new fsmpb.Actor();
      let as : Array<fsmpb.Action> = [];
      for(let key in actor.activities) {
        let activity = actor.activities[key];
        if((<FunctionImpl>activity).pbActivity !== undefined)
          as.push((<FunctionImpl>activity).pbActivity(key, this.types))
      }
      ar.setActionsList(as);
      ar.setInputList(FunctionImpl.createParams(actor.input, this.types));
      ar.setOutputList(FunctionImpl.createParams(actor.output, this.types));
      return ar;
    }
    throw new Error(`no such actor '${actorName}'`);
  }

  private invokeActivity(am: fsmpb.Message, stream: MessageStream) {
    let value = datapb.fromData(am.getValue());
    if(!isActivityData(value)) {
      process.stderr.write(`data ${value}\n`);
      throw new Error('unexpected data sent to invokeActivity');
    }

    let ad = <ActivityData>value;
    let actorName = ad[0];
    let actor = this.actors[actorName];
    if(actor === undefined)
      throw new Error(`no such actor '${actorName}'`);

    let activityName = ad[1];
    let activity = actor.activities[activityName];
    if(activity === undefined)
      throw new Error(`no such activity '${activityName}' in actor '${actorName}'`);

    let genesis = new Context(this.nsBase, stream);
    (<Function>activity).producer(genesis, ad[2]).then((result: {}) => {
      am.setValue(datapb.toData(result));
      stream.write(am);
    });
  }
}

class ActorImpl implements Actor {
  readonly name: string;
  readonly input?: ParamMap;
  readonly output?: StringMap;
  readonly activities : { [s: string]: Function | Actor };

  constructor(name : string, declaration : Actor) {
    this.name = name;
    this.input = declaration.input;
    this.output = declaration.output;
    this.activities = {};
    for(let activityName in declaration.activities) {
      let activity = declaration.activities[activityName];
      this.activities[activityName] = (<Function>activity).producer === undefined
        ? new ActorImpl(activityName, <Actor>activity)
        : new FunctionImpl(<Function>activity);
    }
  }
}
*/