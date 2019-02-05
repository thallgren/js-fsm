import {Data} from "../genesis/richdata";
import {Namespace, TypedName} from "../pcore/TypedName";
import {PcoreObject} from "../pcore/Serializer";
import {AnyType, Type} from "../pcore/Type";
import {Deferred} from "../pcore/Deferred";
import {Parameter} from "../pcore/Parameter";
import {StringMap} from "../pcore/Util";

export class Lyra {
  static serve(a : ActivityHash) : void {

  }
}
/**
 * A StateProducer produces a state based on input variables
 */
export type StateProducer = (...args : any) => Object

/**
 * A StateProducer produces a state based on input variables
 */
export type ActionFunction = (input : StringMap) => StringMap

export type InParam = { type?: string, lookup?: Data };

export type OutParam = { type?: string, alias?: string };

/**
 * The ActivityHash contains the properties common to all Activities
 */
export interface ActivityHash {
  input?: string | Array<string> | { [s: string]: string | InParam }
  output?: string | Array<string> | { [s: string]: string | OutParam }
  when?: string
}

/**
 * The ActionHash contains the properties of a workflow action.
 */
export interface ActionHash extends ActivityHash {
  do: ActionFunction
}

/**
 * The ResourceHash contains the properties of a workflow resource.
 */
export interface ResourceHash extends ActivityHash {
  externalId?: string
  state: StateProducer
}

export interface WorkflowHash extends ActivityHash {
  activities: {[s: string]: ActivityHash }
}

export function action(a : ActionHash) : ActivityHash {
  return a;
}

export function resource(a : ResourceHash) : ActivityHash {
  return a;
}

export function workflow(a : WorkflowHash) : ActivityHash {
  return a;
}

export class ServiceBuilder {
  readonly serviceId : TypedName;
  readonly definitions : Array<Definition>;
  readonly stateProducers : StringMap;
  readonly actionFunctions : StringMap;

  constructor(serviceName : string) {
    this.serviceId = new TypedName(Namespace.NsService, serviceName);
  }

  action(name : string, bf : (rb : ActionBuilder) => void) {
    let rb = new ActionBuilder(name, null);
    bf(rb);
    this.definitions.push(rb.build(this));
  }

  resource(name : string, bf : (rb : ResourceBuilder) => void) {
    let rb = new ResourceBuilder(name, null);
    bf(rb);
    this.definitions.push(rb.build(this));
  }

  workflow(name : string, bf : (rb : WorkflowBuilder) => void) {
    let rb = new WorkflowBuilder(name, null);
    bf(rb);
    this.definitions.push(rb.build(this));
  }
}

export class Definition implements PcoreObject {
  readonly identifier : TypedName;
  readonly serviceId : TypedName;
  readonly properties : { [s: string]: any };

  constructor(serviceId : TypedName, identifier : TypedName, properties : { [s: string]: any }) {
    this.serviceId = serviceId;
    this.identifier = identifier;
    this.properties = properties;
  }

  __ptype() : string {
    return 'Service::Definition';
  }
}

export class ActivityBuilder {
  private readonly name: string;
  private readonly parent : ActivityBuilder | null;
  private readonly in : { [s: string]: Parameter } = {};
  private readonly out : { [s: string]: Parameter } = {};
  private guard? : string;

  constructor(name : string, parent : ActivityBuilder | null) {
    this.name = name;
    this.parent = parent;
  }

  getName() : string {
    return this.parent !== null ? this.parent.qualifyName(this.name) : this.name;
  }

  when(guard : string) {
    this.guard = guard;
  }

  input(params : string | Array<string> | { [s: string]: string | InParam }) {
    Object.assign(this.in, this.convertParams(true, params));
  }

  output(params : string | Array<string> | { [s: string]: string | OutParam }) {
    Object.assign(this.out, this.convertParams(false, params));
  }

  build(sb : ServiceBuilder) : Definition {
    return new Definition(sb.serviceId, new TypedName(Namespace.NsDefinition, this.getName()), this.definitionProperties(sb));
  }

  protected qualifyName(n : string) : string {
    return this.getName() + '::' + n;
  }

  private convertParams(isIn : boolean, params : string | Array<string> | { [s: string]: string | InParam | OutParam }): { [s: string]: Parameter }  {
    let result = {};
    if(typeof params == 'string') {
      // A single untyped parameter name
      result[params] = new Parameter(params, AnyType);
    } else if(Array.isArray(params)) {
      // Array of untyped parameter names
      params.forEach((p : string) => {
        result[p] = new Parameter(p, AnyType);
      })
    } else {
      // Map of typed parameters
      for(const [key, value] of Object.entries(params)) {
        let type = AnyType;
        let alu = undefined;
        if(typeof value == 'string') {
          type = new Type(value);
        } else {
          if(value.hasOwnProperty('type')) {
            type = new Type(value['type']);
          }

          // Input parameters can have lookup, output parameters can have alias.
          if(isIn) {
            if(value.hasOwnProperty('lookup')) {
              alu = new Deferred('lookup', value['lookup']);
            }
          } else {
            if(value.hasOwnProperty('alias')) {
              alu = value['alias'];
            }
          }
        }
        result[key] = new Parameter(key, type, alu);
      }
    }
    return result;
  }

  protected definitionProperties(sb : ServiceBuilder): StringMap {
    let props = {};
    if(Object.keys(this.in).length > 0) {
      props['input'] = this.in;
    }
    if(Object.keys(this.out).length > 0) {
      props['output'] = this.out;
    }
    if(this.guard !== undefined) {
      props['when'] = this.guard;
    }
    return props;
  }
}

export class ResourceBuilder extends ActivityBuilder {
  private extId: string;
  private stateProducer: StateProducer;

  externalId(extId : string) {
    this.extId = extId;
  }

  state(stateProducer: StateProducer) {
    this.stateProducer = stateProducer
  }

  build(sb : ServiceBuilder) : Definition {
    if(this.stateProducer !== null) {
      sb.stateProducers[this.getName()] = this.stateProducer;
    }
    return super.build(sb);
  }

  protected definitionProperties(sb : ServiceBuilder): StringMap {
    let props = super.definitionProperties(sb);
    if(this.extId != null) {
      props['external_id'] = this.extId;
    }
    return props;
  }
}

export class ActionBuilder extends ActivityBuilder {
  private actionFunction: ActionFunction;

  do(actionFunction: ActionFunction) {
    this.actionFunction = actionFunction
  }

  build(sb : ServiceBuilder) : Definition {
    if(this.actionFunction !== null) {
      sb.actionFunctions[this.getName()] = this.actionFunction;
    }
    return super.build(sb);
  }
}

export class WorkflowBuilder extends ActivityBuilder {
  private readonly activities: Array<ActivityBuilder> = [];

  action(name : string, bf : (rb : ActionBuilder) => void) {
    let rb = new ActionBuilder(name, this);
    bf(rb);
    this.activities.push(rb);
  }

  resource(name : string, bf : (rb : ResourceBuilder) => void) {
    let rb = new ResourceBuilder(name, this);
    bf(rb);
    this.activities.push(rb);
  }

  workflow(name : string, bf : (rb : WorkflowBuilder) => void) {
    let rb = new WorkflowBuilder(name, this);
    bf(rb);
    this.activities.push(rb);
  }

  protected definitionProperties(sb : ServiceBuilder): StringMap {
    let props = super.definitionProperties(sb);
    props['activities'] = this.activities.map((ab) => ab.build(sb));
    return props;
  }
}
