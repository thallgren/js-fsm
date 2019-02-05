import {PcoreValue} from "./Serializer";
import {toPcoreType} from "./TypeTransformer";

export class Type implements PcoreValue {
  readonly typeString : string;

  constructor(typeString : string) {
    this.typeString = toPcoreType(typeString);
  }

  __ptype(): string {
    return "Type";
  }

  __pvalue(): string {
    return this.typeString;
  }
}

export const AnyType = new Type('Any');
