/// <reference types="jest" />

import {inferWorkflowTypes} from "../src/pcore/TypeTransformer";

describe('inferWorkflowTypes', () => {
  it('finds types', () => {
    let collector = inferWorkflowTypes(['examples/vpc_with_subnet.ts']);

    expect(collector).toEqual(
      {
        "vpc": {"input": {"region": "string", "tags": "StringMap"}, "type": "Aws::Vpc"},
        "subnet": {"input": {"region": "string", "tags": "StringMap", "vpc_id": "string"}, "type": "Aws::Subnet"},
        "routetable": {"input": {"tags": "StringMap", "vpc_id": "string"}, "type": "Aws::RouteTable"}
      });
  });
});
