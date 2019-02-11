import {Definition, ServiceBuilder, StateProducer} from "./builder";
import {StringMap} from "../pcore/Util";

export class ManifestService {
  private readonly callables : StringMap;
  private readonly definitions : Array<Definition>;
  private readonly stateFunctions : {[s: string] : StateProducer};

  constructor(sb : ServiceBuilder) {
    let cbs = {};
    for(const [k, v] of Object.entries(sb.actionFunctions)) {
      cbs[k] =  { do: v };
    }
    this.callables = cbs;
    this.definitions = sb.definitions;
    this.stateFunctions = sb.stateProducers;
  }

  invoke(identifier : string, name : string, args : Array<any>) : any {
    let c = this.callables[identifier];
    if(c === undefined) {
      throw `Unable to find implementation of ${identifier}`;
    }
    let m = c[name];
    if(m === undefined) {
      throw `Implementation of ${identifier} has no method named ${name}`;
    }
    return m(...args);
  }

  metadata() : [Object, Array<Definition>] {
    return [null, this.definitions];
  }

  state(name : string, input : StringMap) : Object {
    let f = this.stateFunctions[name];
    if(f === undefined) {
      throw `unable to find state producer for ${name}`;
    }

    let pns = parameterNames(f);
    let args = [];
    for(let i = 0; i < pns.length; i++){
      let pn = pns[i];
      let v = input[pn];
      if(v === undefined) {
        throw Error(`state ${name} cannot be produced. Missing input parameter ${pn}`)
      }
      args.push(v);
    }
    return f(...args);
  }
}

const paramNamePattern = new RegExp('^(?:function(?:\\s+\\w+)?\\s*)?\\(([^)]*)\\)', 'm');

function parameterNames(s : StateProducer) : Array<string> {
  return s.toString().match(paramNamePattern)[1].split(',').map(v => v.trim());
}
