import {ValueConsumer} from "./Serializer";
import {Data, DataArray, DataEntry, DataHash} from "../../generated/datapb/data_pb";

export class ProtoConsumer implements ValueConsumer {
  private readonly stack : Array<Array<Data>>;

  constructor() {
    this.stack = new Array<Array<Data>>();
    this.stack.push(new Array<Data>());
  }

  add(value: boolean | number | string | null) {
    let d = new Data();

    switch (typeof value) {
    case 'number':
      value % 1 === 0 ? d.setIntegerValue(value) : d.setFloatValue(value);
      break;
    case 'boolean':
      d.setBooleanValue(value);
      break;
    case 'string':
      d.setStringValue(value);
      break;
    default:
      d.setUndefValue(value);
    }
    this.addData(d);
  }

  addArray(len: number, doer: () => void) {
    this.stack.push(new Array<Data>());
    doer();
    let els = this.stack.pop();

    let a = new DataArray();
    a.setValuesList(els);
    let d = new Data();
    d.setArrayValue(a);
    this.addData(d);
  }

  addHash(len: number, doer: () => void) {
    this.stack.push(new Array<Data>());
    doer();
    let els = this.stack.pop();

    if(els.length % 2 !== 0) {
      throw new Error('Hash function produced uneven number of elements');
    }
    let entries = new Array<DataEntry>();
    for(let i = 0; i < els.length; i += 2) {
      let de = new DataEntry();
      de.setKey(els[i]);
      de.setValue(els[i+1]);
      entries.push(de);
    }
    let h = new DataHash();
    h.setEntriesList(entries);
    let d = new Data();
    d.setHashValue(h);
    this.addData(d);
  }

  addRef(ref: number) {
    let d = new Data();
    d.setReference(ref);
    this.addData(d);
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

  value() : Data {
    return this.stack[0][0];
  }

  private addData(value : Data) {
    this.stack[this.stack.length - 1].push(value);
  }
}
