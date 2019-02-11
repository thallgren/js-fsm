/// <reference types="jest" />

import {transpileManifest} from "../src/pcore/TypeTransformer";

describe('inferWorkflowTypes', () => {
  it('finds types', () => {
    let tr = transpileManifest(['examples/vpc_with_subnet.ts']);

    expect(tr.inferredTypes).toEqual(
      {
        vpc: {
          input: {
            region: "string", tags: "StringMap"
          },
          type: "Aws::Vpc"
        },
        vpcDone: {
          input: {
            vpc_id: "string"
          },
          output: {
            vpc_ok: "boolean"
          }
        },
        subnet: {
          input: {
            region: "string", tags: "StringMap", vpc_id: "string"
          },
          type: "Aws::Subnet"
        },
        routetable: {
          input: {
            tags: "StringMap", vpc_id: "string"
          },
          type: "Aws::RouteTable"
        }
      });
  });
});
