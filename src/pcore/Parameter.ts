import {PcoreValue} from "./Serializer";
import {StringMap} from "./Util";
import {AnyType, Type} from "./Type";

export class Parameter implements PcoreValue {
  readonly name : string;
  readonly type? : Type;
  readonly value? : any;
  readonly captures? : boolean;

  constructor(name : string, type? : string | Type, value? : any, captures? : boolean) {
    this.name = name;
    if (type === undefined)
      type = AnyType;
    else if (typeof type === 'string')
      type = new Type(type);

    this.type = type;
    this.value = value;
    this.captures = captures;
  }

  __ptype(): string {
    return "Parameter";
  }

  __pvalue(): StringMap {
    let m = { name: this.name, type: this.type };
    if(this.value !== undefined) {
      m['value'] = this.value;
    }
    if(this.value === null) {
      m['has_value'] = true;
    }
    if(this.captures === true) {
      m['captures_rest'] = true;
    }
    return m;
  }
}
