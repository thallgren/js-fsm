import {Lyra} from "../src/servicesdk/builder";
import ServiceBuilder = Lyra.ServiceBuilder;
import {Genesis} from "./ec2_types";

let sb = new ServiceBuilder('testing');
sb.workflow('attach', (wb) => {
  wb.input({
    region: {type: 'string', lookup: 'aws.region'},
    tags  : {type: 'StringMap', lookup: 'aws.tags'}
  }),
    wb.output({
      vpc_id             : 'string',
      subnet_id          : 'string',
      internet_gateway_id: 'string'
    }),
    wb.resource('vpc', (rb) => {
      rb.input({region: 'string', tags: 'StringMap'}),
        rb.output({vpc_id: 'string', subnet_id: 'string'}),
        rb.state((input) => new Genesis.Aws.Vpc({
          title               : 'nyx-attachinternetgateway-test',
          ensure              : 'present',
          region              : input.region,
          cidr_block          : "192.168.0.0/16",
          tags                : input.tags,
          enable_dns_hostnames: true,
          enable_dns_support  : true
        }));
    });
  /*
      subnet : {
        output: {subnet_id: 'string'},
        state : (vpc_id: string, region: string, tags: StringMap) => {
          return new Genesis.Aws.Subnet({
            title                  : 'nyx-attachinternetgateway-test',
            ensure                 : 'present',
            region                 : region,
            vpc_id                 : vpc_id,
            cidr_block             : "192.168.1.0/24",
            tags                   : tags,
            map_public_ip_on_launch: true
          });
        }
      },
   */
});