import {DEFAULT, PTYPE_KEY, PVALUE_KEY} from "./Serializer";
import {MemCollector} from "./Collector";
import {Context} from "./Context";
import {allStringKeys} from "./Util";
import {types} from "util";
import {Sensitive} from "./Sensitive";

export class Deserializer extends MemCollector {
  private readonly allowUnresolved : boolean;
  private readonly context : Context;
  private readonly converted : Map<any, any>;
  private val : any;

  constructor(ctx : Context, options : { allow_unresolved? : boolean }) {
    super();
    this.allowUnresolved = !!options.allow_unresolved;
    this.context = ctx;
    this.converted = new Map<any, any>();
  }

  value() : any {
    if(this.val === undefined) {
      this.val = this.convert(super.value());
    }
    return this.val;
  }

  private convert(value : any) : any {
    let v = this.converted.get(value);
    if(v !== undefined) {
      return v;
    }

    if(types.isMap(value) && allStringKeys(value)) {
      let hash = (<Map<string, any>>value);
      let pcoreType = hash.get(PTYPE_KEY);
      if(pcoreType !== undefined) {
        switch(pcoreType) {
        case 'Hash':
          return this.convertHash(hash);
        case 'Sensitive':
          return this.convertSensitive(hash);
        case 'Default':
          return DEFAULT;
        }
        return this.convertOther(hash, pcoreType);
      }
    }
  }

  private convertHash(hash : Map<string, any>) : Map<any, any> {
    let value = (<Array<any>>hash.get(PVALUE_KEY));
    let result = new Map<any, any>();
    this.converted.set(hash, result);
    for(let idx = 0; idx < value.length; idx += 2) {
      result.set(this.convert(value[idx]), this.convert(value[idx+1]));
    }
    return result;
  }

  private convertSensitive(hash : Map<string, any>) : Sensitive {
    let sv = new Sensitive(this.convert(hash.get(PVALUE_KEY)));
    this.converted.set(hash, sv);
    return sv;
  }

  private convertOther(hash : Map<string, any>, pcoreType : any) : any {
    let value = hash.get(PVALUE_KEY);
    if(value === undefined) {
      hash.delete(PTYPE_KEY);
      value = hash;
    }
    if(types.isMap(pcoreType)) {
      // Type deserialization is not supported in typescript
      throw Error("Deserialization of types is not supported")
    }
    let typ = this.context.parseType(pcoreType);
    if(typ === undefined) {
      if(this.allowUnresolved) {
        return value;
      }
      throw Error(`Deserialization of value of unknown type ${pcoreType}`)
    }
    return this.context.createInstance(typ, value);
  }
}
