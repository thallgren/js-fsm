import {PcoreValue} from "./Serializer";
import {StringMap} from "./Util";

export class Deferred implements PcoreValue {
  readonly name : string;
  readonly args : Array<any>;

  constructor(name : string, ...args : any) {
    this.name = name;
    this.args = args;
  }

  __ptype(): string {
    return "Deferred";
  }

  __pvalue(): StringMap {
    return { name: this.name, arguments: this.args };
  }
}
