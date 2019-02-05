/// <reference types="jest" />
import {PcoreObject, PcoreValue, Serializer} from "../src/pcore/Serializer";
import {Context} from "../src/pcore/Context";
import {ArrayLogger} from "../src/pcore/Logger";
import {MemCollector} from "../src/pcore/Collector";
import {StringMap} from "../src/pcore/Util";
import {Namespace, TypedName} from "../src/pcore/TypedName";
import {Parameter} from "../src/pcore/Parameter";
import {Deferred} from "../src/pcore/Deferred";

export namespace My {
  export class Thing {
    constructor(public message: string) {};

    what() {
      return this.message;
    }
  }

  export namespace Own {
    export class Thing {
      constructor(public message: string) {};

      what() {
        return this.message;
      }
    }

    export class Item implements PcoreObject {
      private message : string;

      constructor({message} : {message: string}) {
        this.message = message;
      }

      what() {
        return this.message;
      }

      __ptype() : string {
        return 'Some::Item';
      }
    }
  }


  export class Stuff implements PcoreValue {
    private message : string;

    constructor({x} : {x: string}) {
      this.message = x;
    }

    what() {
      return this.message;
    }

    __ptype() : string {
      return 'Some::Stuff';
    }

    __pvalue() : StringMap {
      return { x: this.message };
    }
  }
}

describe('Serializer', () => {
  it('streams a regexp', () => {
    let obj = /foo.*bar/;
    let ctx = new Context(this, new ArrayLogger());
    let collector = new MemCollector();
    let ser = new Serializer(ctx, {});
    ser.convert(obj, collector);

    let createdObj = collector.value();
    let expectedObj = new Map(Object.entries({__ptype: 'Regexp', __pvalue: 'foo.*bar'}));
    expect(createdObj).toEqual(expectedObj);
  });

  it('streams a Timestamp', () => {
    let obj = new Date("2019-02-04T02:13:20.1234");
    let ctx = new Context(this, new ArrayLogger());
    let collector = new MemCollector();
    let ser = new Serializer(ctx, {});
    ser.convert(obj, collector);

    let createdObj = collector.value();
    let expectedObj = new Map(Object.entries({__ptype: 'Timestamp', __pvalue: '2019-02-04T01:13:20.123Z'}));
    expect(createdObj).toEqual(expectedObj);
  });

  it('streams a TypedName', () => {
    let obj = new TypedName(Namespace.NsService, 'a::service::name');
    let ctx = new Context(this, new ArrayLogger());
    let collector = new MemCollector();
    let ser = new Serializer(ctx, {});
    ser.convert(obj, collector);

    let createdObj = collector.value();
    let expectedObj = new Map(Object.entries({
      __ptype: 'TypedName',
      name: 'a::service::name',
      namespace: 'service'
    }));
    expect(createdObj).toEqual(expectedObj);
  });

  it('streams a Parameter', () => {
    let obj = new Parameter('x', 'Date', new Deferred('lookup', 'some.stuff'));
    let ctx = new Context(this, new ArrayLogger());
    let collector = new MemCollector();
    let ser = new Serializer(ctx, {});
    ser.convert(obj, collector);

    let createdObj = collector.value();
    let expectedObj = new Map(Object.entries({
      __ptype: 'Parameter',
      name: 'x',
      type: new Map(Object.entries({
        __ptype: 'Type',
        __pvalue: 'Timestamp'
      })),
      value: new Map(Object.entries({
        __ptype: 'Deferred',
        name: 'lookup',
        arguments: ['some.stuff']
      }))
    }));
    expect(createdObj).toEqual(expectedObj);
  });

  it('streams a data hash', () => {
    let obj = new My.Own.Thing('Hello world');
    let ctx = new Context(this, new ArrayLogger());
    let collector = new MemCollector();
    let ser = new Serializer(ctx, {});
    ser.convert(obj, collector);

    let createdObj = collector.value();
    let expectedObj = new Map(Object.entries({__ptype: 'My::Own::Thing', message: 'Hello world'}));
    expect(createdObj).toEqual(expectedObj);
  });

  it('streams a __ptype property', () => {
    let obj = new My.Own.Item({message: 'Hello world'});
    let ctx = new Context(this, new ArrayLogger());
    let collector = new MemCollector();
    let ser = new Serializer(ctx, {});
    ser.convert(obj, collector);

    let createdObj = collector.value();
    let expectedObj = new Map(Object.entries({__ptype: 'Some::Item', message: 'Hello world'}));
    expect(createdObj).toEqual(expectedObj);
  });

  it('streams a __pvalue property', () => {
    let obj = new My.Stuff({x: 'Hello world'});
    let ctx = new Context(this, new ArrayLogger());
    let collector = new MemCollector();
    let ser = new Serializer(ctx, {});
    ser.convert(obj, collector);

    let createdObj = collector.value();
    let expectedObj = new Map(Object.entries({__ptype: 'Some::Stuff', x: 'Hello world'}));
    expect(createdObj).toEqual(expectedObj);
  });
});
