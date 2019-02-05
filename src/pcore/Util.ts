export type StringMap = {[s: string] : any};

export function isHash(value : any) : value is StringMap {
  return value && typeof value === 'object' && value.constructor === Object;
}

export function strictString(value : any) : string | undefined {
  if(value === undefined || value === null)
    return undefined;
  if(typeof value === 'string')
    return value;
  if(typeof value === 'object' && value.constructor === String)
    return value.valueOf();
  return undefined;
}

export function allStringKeys(map : Map<any,any>) : boolean {
  for(let key in map.keys()) {
    if(strictString(key) === undefined) {
      return false;
    }
  }
  return true;
}

export function makeInt(arg : any) : number {
  let n = NaN;
  if(typeof arg === 'number') {
    n = arg;
  } else if(typeof arg === 'string') {
    n = Number(arg);
  }
  // TODO: Add hash constructor etc.
  if(isNaN(n) || (n % 1) !== 0) {
    throw new Error(`not an integer '${arg}'`)
  }
  return n;
}

export function makeFloat(arg : any) : number {
  let n = NaN;
  if(typeof arg === 'number') {
    n = arg;
  } else if(typeof arg === 'string') {
    n = Number(arg);
  }
  // TODO: Add hash constructor etc.
  if(isNaN(n)) {
    throw new Error(`not a float '${arg}'`)
  }
  return n;
}

export function makeBoolean(arg : any) : boolean {
  if(typeof arg === 'boolean') {
    return arg;
  }
  if(typeof arg === 'string') {
    switch(arg.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    }
  }
  if(typeof arg === 'number') {
    return arg !== 0;
  }
  throw new Error(`not a boolean '${arg}'`)
}

export function makeString(arg : any) : string {
  return arg.toString();
}
