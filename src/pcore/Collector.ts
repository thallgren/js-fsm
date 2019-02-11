import {ValueConsumer} from "./Serializer";

export interface Collector extends ValueConsumer {
  value() : any
}

export class MemCollector implements Collector {
  private readonly values : Array<any>;
  private readonly stack : Array<Array<any>>;

  constructor() {
    this.values = new Array<any>();
    this.stack = new Array<Array<any>>();
    this.stack.push(new Array<any>());
  }

  add(value: boolean | number | string | Uint8Array | null) {
    this.addAny(value);
  }

  addArray(len: number, doer: () => void) {
    let ar = new Array<any>();
    this.addAny(ar);
    this.stack.push(ar);
    doer();
    this.stack.pop();
  }

  addHash(len: number, doer: () => void) {
    let h = new Map<any,any>();
    this.addAny(h);
    this.stack.push(new Array<any>());
    doer();
    let els = this.stack.pop();
    if(els.length % 2 !== 0) {
      throw new Error('Hash function produced uneven number of elements');
    }
    for(let i = 0; i < els.length; i += 2) {
      h.set(els[i], els[i+1]);
    }
  }

  addRef(ref: number) {
    this.stack[this.stack.length - 1].push(this.values[ref]);
  }

  canDoComplexKeys(): boolean {
    return true;
  }

  canDoBinary(): boolean {
    return true;
  }

  stringDedupThreshold(): number {
    return 0;
  }

  value(): any {
    return this.stack[0][0];
  }

  private addAny(value: any) {
    this.stack[this.stack.length - 1].push(value);
    this.values.push(value);
  }
}
