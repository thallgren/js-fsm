/// <reference types="jest" />

import {Lyra, resource, workflow} from "../src/servicesdk/builder";
import {StringMap} from "../src/pcore/Util";
import {Aws} from "../examples/Aws";

describe('ServiceBuilder', () => {
  it('builds definitions', () => {
    let defs = Lyra.serve(__filename,'test::service', 'aws', workflow({
      input: {
        tags: {type: 'StringMap', lookup: 'aws.tags'}
      },

      output: {
        vpc_id       : 'string',
        subnet_id    : 'string',
        routetable_id: 'string'
      },

      activities: {
        vpc: resource({
          output: ['vpc_id', 'subnet_id'],
          state : (region: string, tags: StringMap) => new Aws.Vpc({
            amazon_provided_ipv6_cidr_block: false,
            cidr_block                     : '192.168.0.0/16',
            enable_dns_hostnames           : false,
            enable_dns_support             : false,
            is_default                     : false,
            state                          : 'available',
            tags                           : tags,
          })
        }),

        subnet: resource({
          output: 'subnet_id',
          state : (vpc_id: string, region: string, tags: StringMap) => new Aws.Subnet({
            vpc_id                         : vpc_id,
            cidr_block                     : '192.168.1.0/24',
            ipv6_cidr_block                : "",
            tags                           : tags,
            assign_ipv6_address_on_creation: false,
            map_public_ip_on_launch        : false,
            default_for_az                 : false,
            state                          : 'available'
          })
        }),

        routetable: resource({
          output: {routetable_id: 'string'},
          state : (vpc_id: string, tags: StringMap) => new Aws.RouteTable({
            vpc_id: vpc_id,
            tags  : tags
          })
        })
      }
    }));
    console.log(defs);
  });
});
