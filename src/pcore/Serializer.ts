import {Context} from "./Context";
import {allStringKeys, isHash, strictString, StringMap} from "./Util";
import {Sensitive} from "./Sensitive";

export const PTYPE_KEY = '__ptype';
export const PVALUE_KEY = '__pvalue';

export interface PcoreObject {
  __ptype() : string
}

export interface PcoreValue extends PcoreObject {
  __pvalue() : string | number | StringMap
}

export function isPcoreObject(value : any) : value is PcoreObject {
  return value && typeof value.__ptype === 'function'
}

export function isPcoreValue(value : any) : value is PcoreValue {
  return value && typeof value.__pvalue === 'function'
}

export const DEFAULT = Symbol('default');


const NoDedup = 0;
const NoKeyDedup = 1;
const MaxDedup = 2;

export interface ValueConsumer {
  canDoBinary() : boolean
  canDoComplexKeys() : boolean;
  add(value : boolean | number | string | null);
  addArray(len : number, doer : () => void);
  addHash(len : number, doer : () => void);
  addRef(ref : number);
  stringDedupThreshold() : number;
}

export class Serializer {
  readonly context : Context;
  readonly richData : boolean;
  readonly dedupLevel : number;

  constructor(c : Context, options : {rich_data? : boolean, dedup_level? : number}) {
    this.context = c;
    this.dedupLevel = options.dedup_level === undefined ? MaxDedup : options.dedup_level;
    this.richData = options.rich_data === undefined ? true : options.rich_data;
  }

  convert(value : any, consumer : ValueConsumer) {
    let c = new SerializerContext(this, consumer, this.dedupLevel >= MaxDedup && !consumer.canDoComplexKeys() ? NoKeyDedup : this.dedupLevel);
    c.toData(1, value);
  }
}

class SerializerContext {
  private readonly config : Serializer;
  private readonly consumer : ValueConsumer;
  private readonly values : Map<any,number>;
  private readonly strings : {[s: string] : number};
  private readonly path : Array<any>;
  private readonly dedupLevel : number;
  private refIndex : number;

  constructor(config : Serializer, consumer : ValueConsumer, dedupLevel : number) {
    this.config = config;
    this.consumer = consumer;
    this.dedupLevel = dedupLevel;
    this.values = new Map<any, number>();
    this.strings = {};
    this.path = [];
    this.refIndex = 0;
  }

  toData(level : number, value : any) {
    if(value === null || value === undefined) {
      this.addData(null);
      return;
    }

    switch (typeof value) {
    case 'number':
    case 'boolean':
      this.addData(value);
      break;
    case 'string':
      this.addString(level, value);
      break;
    case 'function':
      if (this.config.richData) {
        // A constructor actually denotes a type
        let tn = this.config.context.typeNames.nameForType(value);
        if (tn === undefined) {
          throw new Error(`${this.pathToString()}: unable to serialize function ${value}`)
        }
        this.process(value, () => this.addHash(1, () => {
          this.addString(2, PTYPE_KEY);
          this.addString(1, tn);
        }));
      } else {
        this.unknownToStringWithWarning(level, value);
      }
      break;
    case 'object':
      switch (value.constructor) {
      case Object:
        this.process(value, () => {
          let h = (<StringMap>value);
          let keys = Object.keys(h);
          this.addHash(keys.length, () => {
            for(let key in value) {
              if(value.hasOwnProperty(key)) {
                let prop = value[key];
                if (typeof prop !== 'function') {
                  this.addString(2, key);
                  this.withPath(key, () => this.toData(1, prop));
                }
              }
            }
          })
        });
        break;
      case Map:
        this.process(value, () => {
          let h = (<Map<any,any>>value);
          this.addHash(h.size, () => {
            if(this.consumer.canDoComplexKeys() || allStringKeys(h)) {
              h.forEach((value, key) => {
                this.toData(2, key);
                this.withPath(key, () => this.toData(1, value[key]));
              })
            } else {
              this.nonStringKeyedHashToData(h);
            }
          })
        });
        break;
      case Array:
        this.process(value, () => {
          let arr = (<Array<any>>value);
          this.addArray(arr.length, () => {
            for(let idx = 0; idx < arr.length; idx++) {
              this.withPath(idx, () => this.toData(1, arr[idx]));
            }
          })
        });
        break;
      case Date:
        this.process(value, () => this.addHash(2, () => {
          this.addString(2, PTYPE_KEY);
          this.addString(1, 'Timestamp');
          this.addString(2, PVALUE_KEY);
          this.withPath(PVALUE_KEY, () => this.addData((<Date>value).toISOString()));
        }));
        break;
      case RegExp:
        this.process(value, () => this.addHash(2, () => {
          this.addString(2, PTYPE_KEY);
          this.addString(1, 'Regexp');
          this.addString(2, PVALUE_KEY);
          this.withPath(PVALUE_KEY, () => this.addData((<RegExp>value).source));
        }));
        break;
      case String:
        this.addString(level, value.valueOf());
        break;
      case Number:
      case Boolean:
        this.addData(value.valueOf());
        break;
      case Sensitive:
        if (this.config.richData) {
          this.process(value, () => this.addHash(2, () => {
            this.addString(2, PTYPE_KEY);
            this.addString(1, 'Sensitive');
            this.addString(2, PVALUE_KEY);
            this.withPath(PVALUE_KEY, () => this.toData(1, (<Sensitive>value).unwrap()))
          }));
        } else {
          this.unknownToStringWithWarning(level, value);
        }
        break;
      case undefined:
        this.addData(null);
        break;
      default:
        if (this.config.richData) {
          this.valueToDataHash(value);
        } else {
          this.unknownToStringWithWarning(1, value);
        }
      }
    }
  }

  private nonStringKeyedHashToData(hash : Map<any, any>) {
    if(this.config.richData) {
      this.toKeyExtendedHash(hash);
      return;
    }

    this.process(hash, () => this.addHash(hash.size, () => hash.forEach((v, k) => {
      let s = strictString(k);
      if(s !== undefined) {
        this.addString(2, s);
        this.withPath(s, () => this.toData(1, v));
      } else {
        this.unknownToStringWithWarning(2, k);
        this.withPath(k, () => this.toData(1, v));
      }
    })));
  }

  private toKeyExtendedHash(hash : Map<any, any>) {
    this.process(hash, () => this.addHash(2, () => {
      this.addString(2, PTYPE_KEY);
      this.addString(1, 'Hash');
      this.addString(2, PVALUE_KEY);
      this.addArray(hash.size * 2, () => hash.forEach((v, k) => {
        this.toData(1, k);
        this.withPath(k, () => this.toData(1, v))
      }))
    }))
  }

  private valueToDataHash(value : any) {
    let pt = isPcoreObject(value) ? value.__ptype() : this.config.context.typeNames.nameForType(value.constructor);
    if (pt === undefined) {
      this.unknownToStringWithWarning(1, value);
      return;
    }

    this.process(value, () => {
      let pv = isPcoreValue(value) ? value.__pvalue() : SerializerContext.initializerFor(value);
      if (isHash(pv)) {
        let pm = (<StringMap>pv);
        this.addHash(pm.size + 1, () => {
          this.addString(2, PTYPE_KEY);
          this.addString(1, pt);
          Object.entries(pm).forEach((e) => {
            this.addString(2, e[0]);
            this.toData(1, e[1]);
          })
        })
      } else {
        this.addHash(2, () => {
          this.addString(2, PTYPE_KEY);
          this.addString(1, pt);
          this.addString(2, PVALUE_KEY);
          this.withPath(PVALUE_KEY, () => this.toData(1, pv))
        });
      }
    })
  }

  private addArray(len : number, doer : () => void) {
    this.refIndex++;
    this.consumer.addArray(len, doer);
  }

  private addHash(len : number, doer : () => void) {
    this.refIndex++;
    this.consumer.addHash(len, doer);
  }

  private addString(level : number, value : string) {
    if(this.dedupLevel >= level && value.length > this.consumer.stringDedupThreshold()) {
      let ref = this.strings[value];
      if(ref !== undefined) {
        this.consumer.addRef(ref);
        return;
      } else {
        this.strings[value] = this.refIndex;
      }
    }
    this.addData(value);
  }

  private addData(value : boolean | number | string | null) {
    this.refIndex++;
    this.consumer.add(value);
  }

  private pathToString() : string {
    return this.path.join('/')
  }

  private process(value : any, doer : () => void) : void {
    if(this.dedupLevel == NoDedup) {
      doer();
      return;
    }
    let ref = this.values.get(value);
    if(ref !== undefined) {
      this.consumer.addRef(ref);
    } else {
      this.values.set(value, this.refIndex);
      doer();
    }
  }

  private unknownToStringWithWarning(level : number, value : any) {
    let s = value.toString();
    let ts = typeof value;
    if(ts === 'object') {
      ts = value.constructor.name
    }
    this.config.context.logger.warning("%s contains a value of type %s. It will be converted to the string '%s'", this.pathToString(), ts, s);
    this.addString(level, s);
  }

  private withPath(value : any, doer : () => void) : void {
    this.path.push(value);
    doer();
    this.path.pop();
  }

  private static initializerFor(value : object) : StringMap {
    let init = {};
    for(let key in value) {
      if(value.hasOwnProperty(key)) {
        let prop = value[key];
        if(typeof prop !== 'function')
          init[key] = prop;
      }
    }
    return init;
  }
}
