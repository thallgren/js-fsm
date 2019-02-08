import {Data} from "../genesis/richdata";
import {Namespace, TypedName} from "../pcore/TypedName";
import {PcoreObject} from "../pcore/Serializer";
import {AnyType, Type} from "../pcore/Type";
import {Deferred} from "../pcore/Deferred";
import {Parameter} from "../pcore/Parameter";
import {StringMap} from "../pcore/Util";
import {inferWorkflowTypes} from "../pcore/TypeTransformer";

export class Lyra {
  static serve(manifestFile : string | null, serviceName : string, name : string, activity : ActivityMap) : Array<Definition> {
    let sb = new ServiceBuilder(serviceName);
    let inferred : StringMap = null;
    if(manifestFile !== null) {
      inferred = inferWorkflowTypes([manifestFile]);
    }
    sb.fromMap(name, activity, inferred);
    return sb.definitions;
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
 * The ActivityMap contains the properties common to all Activities
 */
export interface ActivityMap {
  style?: 'action' | 'resource' | 'workflow'
  input?: string | Array<string> | { [s: string]: string | InParam }
  output?: string | Array<string> | { [s: string]: string | OutParam }
  when?: string
}

/**
 * The ActionMap contains the properties of a workflow action.
 */
export interface ActionMap extends ActivityMap {
  do: ActionFunction
}

/**
 * The ResourceMap contains the properties of a workflow resource.
 */
export interface ResourceMap extends ActivityMap {
  externalId?: string
  state: StateProducer
  type?: string
}

export interface WorkflowMap extends ActivityMap {
  activities: {[s: string]: ActivityMap }
}

export function action(a : ActionMap) : ActivityMap {
  a.style = 'action';
  return a;
}

export function resource(a : ResourceMap) : ActivityMap {
  a.style = 'resource';
  return a;
}

export function workflow(a : WorkflowMap) : ActivityMap {
  a.style = 'workflow';
  return a;
}

export class ServiceBuilder {
  readonly serviceId : TypedName;
  readonly definitions : Array<Definition> = [];
  readonly stateProducers : StringMap = {};
  readonly actionFunctions : StringMap = {};

  constructor(serviceName : string) {
    this.serviceId = new TypedName(Namespace.NsService, serviceName);
  }

  fromMap(n : string, a : ActivityMap, inferred : StringMap) {
    switch(a.style) {
    case 'action':
      let ab = new ActionBuilder(n, null);
      ab.fromMap((<ActionMap>a));
      this.definitions.push(ab.build(this, inferred));
      break;
    case 'resource':
      let rb = new ResourceBuilder(n, null);
      rb.fromMap((<ResourceMap>a));
      this.definitions.push(rb.build(this, inferred));
      break;
    case 'workflow':
      let wb = new WorkflowBuilder(n, null);
      wb.fromMap((<WorkflowMap>a));
      this.definitions.push(wb.build(this, inferred));
      break;
    default:
      throw new Error(`activity hash for ${n} has no valid style`);
    }
  }

  action(name : string, bf : (rb : ActionBuilder) => void) {
    let rb = new ActionBuilder(name, null);
    bf(rb);
    this.definitions.push(rb.build(this, null));
  }

  resource(name : string, bf : (rb : ResourceBuilder) => void) {
    let rb = new ResourceBuilder(name, null);
    bf(rb);
    this.definitions.push(rb.build(this, null));
  }

  workflow(name : string, bf : (rb : WorkflowBuilder) => void) {
    let rb = new WorkflowBuilder(name, null);
    bf(rb);
    this.definitions.push(rb.build(this, null));
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
  private in : { [s: string]: Parameter };
  private out : { [s: string]: Parameter };
  private guard? : string;

  constructor(name : string, parent : ActivityBuilder | null) {
    this.name = name;
    this.parent = parent;
  }

  amendWithInferredTypes(inferred : StringMap) {
    if(this.in === undefined) {
      let ii = inferred['input'];
      if(ii !== undefined) {
        this.input(ii);
      }
    }
  }

  getLeafName() : string {
    return this.name;
  }

  getName() : string {
    return this.parent !== null ? this.parent.qualifyName(this.name) : this.name;
  }

  fromMap(m : ActivityMap) {
    this.when(m.when);
    this.input(m.input);
    this.output(m.output);
  }

  when(guard : string) {
    this.guard = guard;
  }

  input(params : string | Array<string> | { [s: string]: string | InParam }) {
    if(params) {
      let ps = this.convertParams(true, params);
      if(this.in === undefined) {
        this.in = ps;
      } else {
        Object.assign(this.in, ps);
      }
    }
  }

  output(params : string | Array<string> | { [s: string]: string | OutParam }) {
    if(params) {
      let ps = this.convertParams(false, params);
      if(this.out === undefined) {
        this.out = ps;
      } else {
        Object.assign(this.out, ps);
      }
    }
  }

  build(sb : ServiceBuilder, inferred : StringMap) : Definition {
    if(inferred !== null)
      this.amendWithInferredTypes(inferred);
    return new Definition(sb.serviceId, new TypedName(Namespace.NsDefinition, this.getName()), this.definitionProperties(sb, inferred));
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

  protected definitionProperties(sb : ServiceBuilder, inferred : StringMap): StringMap {
    let props = {};
    if(this.in !== undefined) {
      props['input'] = this.in;
    }
    if(this.out !== undefined) {
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
  private typ: string;
  private stateProducer: StateProducer;

  amendWithInferredTypes(inferred : StringMap) {
    super.amendWithInferredTypes(inferred);
    if(this.typ === undefined) {
      let it = inferred['type'];
      if(it !== undefined) {
        this.type(it);
      }
    }
  }

  externalId(extId : string) {
    this.extId = extId;
  }

  state(stateProducer: StateProducer) {
    this.stateProducer = stateProducer
  }

  type(t: string) {
    this.typ = t;
  }

  build(sb : ServiceBuilder, inferred : StringMap) : Definition {
    if(this.stateProducer !== null) {
      sb.stateProducers[this.getName()] = this.stateProducer;
    }
    return super.build(sb, inferred);
  }

  fromMap(m : ResourceMap) {
    super.fromMap(m);
    this.state(m.state);
    this.type(m.type);
    this.externalId(m.externalId);
  }

  protected definitionProperties(sb : ServiceBuilder, inferred : StringMap): StringMap {
    let props = super.definitionProperties(sb, inferred);
    if(this.extId != undefined) {
      props['external_id'] = this.extId;
    }
    if(this.typ != undefined) {
      props['type'] = this.typ;
    }
    return props;
  }
}

export class ActionBuilder extends ActivityBuilder {
  private actionFunction: ActionFunction;

  do(actionFunction: ActionFunction) {
    this.actionFunction = actionFunction
  }

  build(sb : ServiceBuilder, inferred : StringMap) : Definition {
    if(this.actionFunction !== null) {
      sb.actionFunctions[this.getName()] = this.actionFunction;
    }
    return super.build(sb, inferred);
  }

  fromMap(m : ActionMap) {
    super.fromMap(m);
    this.do(m.do);
  }
}

export class WorkflowBuilder extends ActivityBuilder {
  private readonly activities: Array<ActivityBuilder> = [];

  amendWithInferredTypes(inferred : StringMap) {
    super.amendWithInferredTypes(inferred);
    this.activities.forEach((a) => {
      let sub = inferred[a.getLeafName()];
      if(sub !== undefined) {
        a.amendWithInferredTypes(sub);
      }
    });
  }

  fromMap(m : WorkflowMap) {
    super.fromMap(m);
    for(const [n, a] of Object.entries(m.activities)) {
      switch(a.style) {
      case 'action':
        let ab = new ActionBuilder(n, this);
        ab.fromMap((<ActionMap>a));
        this.activities.push(ab);
        break;
      case 'resource':
        let rb = new ResourceBuilder(n, this);
        rb.fromMap((<ResourceMap>a));
        this.activities.push(rb);
        break;
      case 'workflow':
        let wb = new WorkflowBuilder(n, this);
        wb.fromMap((<WorkflowMap>a));
        this.activities.push(wb);
        break;
      default:
        throw new Error(`activity hash for ${this.qualifyName(n)} has no valid style`);
      }
    }
  }

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

  protected definitionProperties(sb : ServiceBuilder, inferred : StringMap): StringMap {
    let props = super.definitionProperties(sb, inferred);
    props['activities'] = this.activities.map((ab) => ab.build(sb, inferred));
    return props;
  }
}
