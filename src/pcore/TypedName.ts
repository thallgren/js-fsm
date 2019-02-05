import {PcoreValue} from "./Serializer";
import {StringMap} from "./Util";

export enum Namespace {
  NsType = 'type',
  NsFunction = 'function',
  NsInterface = 'interface',
  NsDefinition = 'definition',
  NsHandler = 'handler',
  NsService = 'service',
  NsActivity = 'activity',
  NsAllocator = 'allocator',
  NsConstructor = 'constructor'
}

export const RuntimeAuthority = new URL('http://puppet.com/2016.1/runtime');

export class TypedName implements PcoreValue {
  private static readonly allowedCharacters = new RegExp('^[a-z][0-9_a-z]*$');

  readonly authority: URL;
  readonly namespace: Namespace;
  readonly name: string;
  readonly canonical;
  readonly parts: Array<string>;

  constructor(namespace : Namespace, name : string, authority : URL = RuntimeAuthority) {

    let parts = name.toLowerCase().split('::');
    if(parts.length > 0 && parts[0] === '' && name.length > 2) {
      // Name starts with '::'. Get rid of it.
      parts = parts.slice(1);
      name = name.substring(2);
    }
    parts.forEach((v) => {
      if(!TypedName.allowedCharacters.test(v)) {
        throw new Error(`Invalid characters in part '${v}' of name '${name}'`);
      }
    });
    this.namespace = namespace;
    this.name = name;
    this.authority = authority;
    this.parts = parts;
    this.canonical = `${this.authority}/${namespace}/${name}`.toLowerCase();
  }

  __ptype(): string {
    return "TypedName";
  }

  __pvalue(): string | StringMap {
    let mv = {
      namespace : this.namespace.toString(),
      name : this.name
    }
    if(this.authority !== RuntimeAuthority) {
      mv['authority'] = this.authority.toString();
    }
    return mv;
  }
}
