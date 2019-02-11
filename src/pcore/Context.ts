import {isHash, makeBoolean, makeFloat, makeInt, makeString, StringMap} from "./Util";
import {Logger} from "./Logger";

const wellknownTypes = {
    Boolean : makeBoolean,
    Integer : makeInt,
    Float : makeFloat,
    Number : makeFloat,
    String : makeString,
  };

  /**
   * Maps constructors to names of types
   */
  export class TypeNames {
    private typeMap : Map<()=>void, string>;

    constructor(base : {}) {
      let tn = new Map<()=>void, string>();
      TypeNames.createTypeMap(null, base, tn);
      this.typeMap = tn;
    }

    nameForType(type : ()=>void) : string | undefined {
      return this.typeMap.get(type);
    }

    private static createTypeMap(ns : string, base : any, map : Map<()=>void, string>) : void {
      if(typeof base === 'function') {
        map.set(base, ns);
        return;
      }

      if(typeof base === 'object') {
        for (let key in base) {
          if (key.match(/^[A-Z]/)) {
            TypeNames.createTypeMap(ns === null ? key : ns + '::' + key, base[key], map);
          }
        }
      }
    }
  }

  export class Context {
    private readonly nsBase : StringMap;
    readonly logger : Logger;
    readonly typeNames : TypeNames;

    constructor(nsBase : StringMap, logger : Logger) {
      this.nsBase = nsBase;
      this.typeNames = new TypeNames(nsBase)
      this.logger = logger;
    }

    /**
     * Parse a double-colon separated type name and return the
     * corresponding constructor for the type
     *
     * @param typeString
     */
    parseType(typeString: string) : any {
      let parts = typeString.split('::');
      if(parts.length == 1) {
        // Check if wellknown type
        let t = wellknownTypes[parts[0]]
        if(t !== undefined) {
          return t;
        }
      }

      let c = this.nsBase;
      for(let i in parts) {
        c = c[parts[i]];
        if(c === undefined)
          break;
      }
      if(c !== undefined && typeof c !== 'function')
      // Not a function, so not a constructor
        c = undefined;
      return c;
    }

    createInstance(type: any, value: any) : any {
      let tf = function(){};
      tf.prototype = type.prototype;
      let inst = new tf;

      if(isHash(value)) {
        let ks = Object.keys(value);
        if(ks.length === 0)
          return inst;

        if(type.prototype.__ptype !== undefined)
          type.apply(inst, [value]);
        else
          type.apply(inst, ks.map(k => value[k]));
        return inst;
      }

      type.apply(inst, [value]);
      return inst;
    }
  }
