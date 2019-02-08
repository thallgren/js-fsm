import {PcoreValue} from "../src/pcore/Serializer";

export namespace Aws {

  export class BlockDeviceMapping implements PcoreValue {
    readonly device_name: string;
    readonly ebs: EbsBlockDevice | null;
    readonly no_device: string;
    readonly virtual_name: string;

    constructor({
      device_name = '',
      ebs = null,
      no_device = '',
      virtual_name = ''
    }: {
      device_name?: string,
      ebs?: EbsBlockDevice | null,
      no_device?: string,
      virtual_name?: string
    }) {
      this.device_name = device_name;
      this.ebs = ebs;
      this.no_device = no_device;
      this.virtual_name = virtual_name;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.device_name !== '')
        ih['device_name'] = this.device_name;
      if(this.ebs !== null)
        ih['ebs'] = this.ebs;
      if(this.no_device !== '')
        ih['no_device'] = this.no_device;
      if(this.virtual_name !== '')
        ih['virtual_name'] = this.virtual_name;
      return ih;
    }

    __ptype() : string {
      return 'Aws::BlockDeviceMapping';
    }
  }

  export class CpuOptions implements PcoreValue {
    readonly core_count: number;
    readonly threads_per_core: number;

    constructor({
      core_count = 0,
      threads_per_core = 0
    }: {
      core_count?: number,
      threads_per_core?: number
    }) {
      this.core_count = core_count;
      this.threads_per_core = threads_per_core;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.core_count !== 0)
        ih['core_count'] = this.core_count;
      if(this.threads_per_core !== 0)
        ih['threads_per_core'] = this.threads_per_core;
      return ih;
    }

    __ptype() : string {
      return 'Aws::CpuOptions';
    }
  }

  export class EbsBlockDevice implements PcoreValue {
    readonly delete_on_termination: boolean;
    readonly encrypted: boolean;
    readonly iops: number;
    readonly kms_key_id: string;
    readonly snapshot_id: string;
    readonly volume_size: number;
    readonly volume_type: string;

    constructor({
      delete_on_termination = false,
      encrypted = false,
      iops = 0,
      kms_key_id = '',
      snapshot_id = '',
      volume_size = 0,
      volume_type = ''
    }: {
      delete_on_termination?: boolean,
      encrypted?: boolean,
      iops?: number,
      kms_key_id?: string,
      snapshot_id?: string,
      volume_size?: number,
      volume_type?: string
    }) {
      this.delete_on_termination = delete_on_termination;
      this.encrypted = encrypted;
      this.iops = iops;
      this.kms_key_id = kms_key_id;
      this.snapshot_id = snapshot_id;
      this.volume_size = volume_size;
      this.volume_type = volume_type;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.delete_on_termination !== false)
        ih['delete_on_termination'] = this.delete_on_termination;
      if(this.encrypted !== false)
        ih['encrypted'] = this.encrypted;
      if(this.iops !== 0)
        ih['iops'] = this.iops;
      if(this.kms_key_id !== '')
        ih['kms_key_id'] = this.kms_key_id;
      if(this.snapshot_id !== '')
        ih['snapshot_id'] = this.snapshot_id;
      if(this.volume_size !== 0)
        ih['volume_size'] = this.volume_size;
      if(this.volume_type !== '')
        ih['volume_type'] = this.volume_type;
      return ih;
    }

    __ptype() : string {
      return 'Aws::EbsBlockDevice';
    }
  }

  export class GroupIdentifier implements PcoreValue {
    readonly group_id: string;
    readonly group_name: string;

    constructor({
      group_id = '',
      group_name = ''
    }: {
      group_id?: string,
      group_name?: string
    }) {
      this.group_id = group_id;
      this.group_name = group_name;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.group_id !== '')
        ih['group_id'] = this.group_id;
      if(this.group_name !== '')
        ih['group_name'] = this.group_name;
      return ih;
    }

    __ptype() : string {
      return 'Aws::GroupIdentifier';
    }
  }

  export class IamInstanceProfile implements PcoreValue {
    readonly arn: string;
    readonly name: string;
    readonly id: string;

    constructor({
      arn = '',
      name = '',
      id = ''
    }: {
      arn?: string,
      name?: string,
      id?: string
    }) {
      this.arn = arn;
      this.name = name;
      this.id = id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.arn !== '')
        ih['arn'] = this.arn;
      if(this.name !== '')
        ih['name'] = this.name;
      if(this.id !== '')
        ih['id'] = this.id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::IamInstanceProfile';
    }
  }

  export class IamRole implements PcoreValue {
    readonly role_name: string;
    readonly assume_role_policy_document: string;
    readonly tags: {[s: string]: string};
    readonly description: string | null;
    readonly path: string | null;

    constructor({
      role_name,
      assume_role_policy_document,
      tags,
      description = null,
      path = null
    }: {
      role_name: string,
      assume_role_policy_document: string,
      tags: {[s: string]: string},
      description?: string | null,
      path?: string | null
    }) {
      this.role_name = role_name;
      this.assume_role_policy_document = assume_role_policy_document;
      this.tags = tags;
      this.description = description;
      this.path = path;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['role_name'] = this.role_name;
      ih['assume_role_policy_document'] = this.assume_role_policy_document;
      ih['tags'] = this.tags;
      if(this.description !== null)
        ih['description'] = this.description;
      if(this.path !== null)
        ih['path'] = this.path;
      return ih;
    }

    __ptype() : string {
      return 'Aws::IamRole';
    }
  }

  export class Instance implements PcoreValue {
    readonly image_id: string;
    readonly instance_type: string;
    readonly max_count: number;
    readonly min_count: number;
    readonly additional_info: string;
    readonly block_device_mappings: Array<BlockDeviceMapping>;
    readonly client_token: string;
    readonly cpu_options: CpuOptions | null;
    readonly disable_api_termination: boolean;
    readonly ebs_optimized: boolean;
    readonly iam_instance_profile: IamInstanceProfile | null;
    readonly instance_initiated_shutdown_behavior: string;
    readonly ipv6_address_count: number;
    readonly ipv6_addresses: Array<InstanceIpv6Address>;
    readonly kernel_id: string;
    readonly key_name: string;
    readonly launch_template: LaunchTemplateSpecification | null;
    readonly monitoring: Monitoring | null;
    readonly placement: Placement | null;
    readonly private_ip_address: string;
    readonly ramdisk_id: string;
    readonly subnet_id: string;
    readonly user_data: string;
    readonly owner_id: string;
    readonly requester_id: string;
    readonly reservation_id: string;
    readonly ami_launch_index: number;
    readonly architecture: string;
    readonly ena_support: boolean;
    readonly hypervisor: string;
    readonly instance_id: string;
    readonly instance_lifecycle: string;
    readonly platform: string;
    readonly private_dns_name: string;
    readonly product_codes: Array<ProductCode>;
    readonly public_dns_name: string;
    readonly public_ip_address: string;
    readonly ram_disk_id: string;
    readonly root_device_name: string;
    readonly root_device_type: string;
    readonly security_groups: Array<GroupIdentifier>;
    readonly source_dest_check: boolean;
    readonly spot_instance_request_id: string;
    readonly sriov_net_support: string;
    readonly state: InstanceState | null;
    readonly state_reason: StateReason | null;
    readonly state_transition_reason: string;
    readonly tags: {[s: string]: string} | null;
    readonly virtualization_type: string;
    readonly vpc_id: string;

    constructor({
      image_id,
      instance_type,
      max_count,
      min_count,
      additional_info = '',
      block_device_mappings = [],
      client_token = '',
      cpu_options = null,
      disable_api_termination = false,
      ebs_optimized = false,
      iam_instance_profile = null,
      instance_initiated_shutdown_behavior = '',
      ipv6_address_count = 0,
      ipv6_addresses = [],
      kernel_id = '',
      key_name = '',
      launch_template = null,
      monitoring = null,
      placement = null,
      private_ip_address = '',
      ramdisk_id = '',
      subnet_id = '',
      user_data = '',
      owner_id = '',
      requester_id = '',
      reservation_id = '',
      ami_launch_index = 0,
      architecture = '',
      ena_support = false,
      hypervisor = '',
      instance_id = '',
      instance_lifecycle = '',
      platform = '',
      private_dns_name = '',
      product_codes = [],
      public_dns_name = '',
      public_ip_address = '',
      ram_disk_id = '',
      root_device_name = '',
      root_device_type = '',
      security_groups = [],
      source_dest_check = false,
      spot_instance_request_id = '',
      sriov_net_support = '',
      state = null,
      state_reason = null,
      state_transition_reason = '',
      tags,
      virtualization_type = '',
      vpc_id = ''
    }: {
      image_id: string,
      instance_type: string,
      max_count: number,
      min_count: number,
      additional_info?: string,
      block_device_mappings?: Array<BlockDeviceMapping>,
      client_token?: string,
      cpu_options?: CpuOptions | null,
      disable_api_termination?: boolean,
      ebs_optimized?: boolean,
      iam_instance_profile?: IamInstanceProfile | null,
      instance_initiated_shutdown_behavior?: string,
      ipv6_address_count?: number,
      ipv6_addresses?: Array<InstanceIpv6Address>,
      kernel_id?: string,
      key_name?: string,
      launch_template?: LaunchTemplateSpecification | null,
      monitoring?: Monitoring | null,
      placement?: Placement | null,
      private_ip_address?: string,
      ramdisk_id?: string,
      subnet_id?: string,
      user_data?: string,
      owner_id?: string,
      requester_id?: string,
      reservation_id?: string,
      ami_launch_index?: number,
      architecture?: string,
      ena_support?: boolean,
      hypervisor?: string,
      instance_id?: string,
      instance_lifecycle?: string,
      platform?: string,
      private_dns_name?: string,
      product_codes?: Array<ProductCode>,
      public_dns_name?: string,
      public_ip_address?: string,
      ram_disk_id?: string,
      root_device_name?: string,
      root_device_type?: string,
      security_groups?: Array<GroupIdentifier>,
      source_dest_check?: boolean,
      spot_instance_request_id?: string,
      sriov_net_support?: string,
      state?: InstanceState | null,
      state_reason?: StateReason | null,
      state_transition_reason?: string,
      tags: {[s: string]: string} | null,
      virtualization_type?: string,
      vpc_id?: string
    }) {
      this.image_id = image_id;
      this.instance_type = instance_type;
      this.max_count = max_count;
      this.min_count = min_count;
      this.additional_info = additional_info;
      this.block_device_mappings = block_device_mappings;
      this.client_token = client_token;
      this.cpu_options = cpu_options;
      this.disable_api_termination = disable_api_termination;
      this.ebs_optimized = ebs_optimized;
      this.iam_instance_profile = iam_instance_profile;
      this.instance_initiated_shutdown_behavior = instance_initiated_shutdown_behavior;
      this.ipv6_address_count = ipv6_address_count;
      this.ipv6_addresses = ipv6_addresses;
      this.kernel_id = kernel_id;
      this.key_name = key_name;
      this.launch_template = launch_template;
      this.monitoring = monitoring;
      this.placement = placement;
      this.private_ip_address = private_ip_address;
      this.ramdisk_id = ramdisk_id;
      this.subnet_id = subnet_id;
      this.user_data = user_data;
      this.owner_id = owner_id;
      this.requester_id = requester_id;
      this.reservation_id = reservation_id;
      this.ami_launch_index = ami_launch_index;
      this.architecture = architecture;
      this.ena_support = ena_support;
      this.hypervisor = hypervisor;
      this.instance_id = instance_id;
      this.instance_lifecycle = instance_lifecycle;
      this.platform = platform;
      this.private_dns_name = private_dns_name;
      this.product_codes = product_codes;
      this.public_dns_name = public_dns_name;
      this.public_ip_address = public_ip_address;
      this.ram_disk_id = ram_disk_id;
      this.root_device_name = root_device_name;
      this.root_device_type = root_device_type;
      this.security_groups = security_groups;
      this.source_dest_check = source_dest_check;
      this.spot_instance_request_id = spot_instance_request_id;
      this.sriov_net_support = sriov_net_support;
      this.state = state;
      this.state_reason = state_reason;
      this.state_transition_reason = state_transition_reason;
      this.tags = tags;
      this.virtualization_type = virtualization_type;
      this.vpc_id = vpc_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['image_id'] = this.image_id;
      ih['instance_type'] = this.instance_type;
      ih['max_count'] = this.max_count;
      ih['min_count'] = this.min_count;
      if(this.additional_info !== '')
        ih['additional_info'] = this.additional_info;
      if(this.block_device_mappings !== [])
        ih['block_device_mappings'] = this.block_device_mappings;
      if(this.client_token !== '')
        ih['client_token'] = this.client_token;
      if(this.cpu_options !== null)
        ih['cpu_options'] = this.cpu_options;
      if(this.disable_api_termination !== false)
        ih['disable_api_termination'] = this.disable_api_termination;
      if(this.ebs_optimized !== false)
        ih['ebs_optimized'] = this.ebs_optimized;
      if(this.iam_instance_profile !== null)
        ih['iam_instance_profile'] = this.iam_instance_profile;
      if(this.instance_initiated_shutdown_behavior !== '')
        ih['instance_initiated_shutdown_behavior'] = this.instance_initiated_shutdown_behavior;
      if(this.ipv6_address_count !== 0)
        ih['ipv6_address_count'] = this.ipv6_address_count;
      if(this.ipv6_addresses !== [])
        ih['ipv6_addresses'] = this.ipv6_addresses;
      if(this.kernel_id !== '')
        ih['kernel_id'] = this.kernel_id;
      if(this.key_name !== '')
        ih['key_name'] = this.key_name;
      if(this.launch_template !== null)
        ih['launch_template'] = this.launch_template;
      if(this.monitoring !== null)
        ih['monitoring'] = this.monitoring;
      if(this.placement !== null)
        ih['placement'] = this.placement;
      if(this.private_ip_address !== '')
        ih['private_ip_address'] = this.private_ip_address;
      if(this.ramdisk_id !== '')
        ih['ramdisk_id'] = this.ramdisk_id;
      if(this.subnet_id !== '')
        ih['subnet_id'] = this.subnet_id;
      if(this.user_data !== '')
        ih['user_data'] = this.user_data;
      if(this.owner_id !== '')
        ih['owner_id'] = this.owner_id;
      if(this.requester_id !== '')
        ih['requester_id'] = this.requester_id;
      if(this.reservation_id !== '')
        ih['reservation_id'] = this.reservation_id;
      if(this.ami_launch_index !== 0)
        ih['ami_launch_index'] = this.ami_launch_index;
      if(this.architecture !== '')
        ih['architecture'] = this.architecture;
      if(this.ena_support !== false)
        ih['ena_support'] = this.ena_support;
      if(this.hypervisor !== '')
        ih['hypervisor'] = this.hypervisor;
      if(this.instance_id !== '')
        ih['instance_id'] = this.instance_id;
      if(this.instance_lifecycle !== '')
        ih['instance_lifecycle'] = this.instance_lifecycle;
      if(this.platform !== '')
        ih['platform'] = this.platform;
      if(this.private_dns_name !== '')
        ih['private_dns_name'] = this.private_dns_name;
      if(this.product_codes !== [])
        ih['product_codes'] = this.product_codes;
      if(this.public_dns_name !== '')
        ih['public_dns_name'] = this.public_dns_name;
      if(this.public_ip_address !== '')
        ih['public_ip_address'] = this.public_ip_address;
      if(this.ram_disk_id !== '')
        ih['ram_disk_id'] = this.ram_disk_id;
      if(this.root_device_name !== '')
        ih['root_device_name'] = this.root_device_name;
      if(this.root_device_type !== '')
        ih['root_device_type'] = this.root_device_type;
      if(this.security_groups !== [])
        ih['security_groups'] = this.security_groups;
      if(this.source_dest_check !== false)
        ih['source_dest_check'] = this.source_dest_check;
      if(this.spot_instance_request_id !== '')
        ih['spot_instance_request_id'] = this.spot_instance_request_id;
      if(this.sriov_net_support !== '')
        ih['sriov_net_support'] = this.sriov_net_support;
      if(this.state !== null)
        ih['state'] = this.state;
      if(this.state_reason !== null)
        ih['state_reason'] = this.state_reason;
      if(this.state_transition_reason !== '')
        ih['state_transition_reason'] = this.state_transition_reason;
      ih['tags'] = this.tags;
      if(this.virtualization_type !== '')
        ih['virtualization_type'] = this.virtualization_type;
      if(this.vpc_id !== '')
        ih['vpc_id'] = this.vpc_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::Instance';
    }
  }

  export class InstanceHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::InstanceHandler';
    }
  }

  export class InstanceIpv6Address implements PcoreValue {
    readonly ipv6_address: string;

    constructor({
      ipv6_address = ''
    }: {
      ipv6_address?: string
    }) {
      this.ipv6_address = ipv6_address;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.ipv6_address !== '')
        ih['ipv6_address'] = this.ipv6_address;
      return ih;
    }

    __ptype() : string {
      return 'Aws::InstanceIpv6Address';
    }
  }

  export class InstanceState implements PcoreValue {
    readonly code: number;
    readonly name: string;

    constructor({
      code = 0,
      name = ''
    }: {
      code?: number,
      name?: string
    }) {
      this.code = code;
      this.name = name;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.code !== 0)
        ih['code'] = this.code;
      if(this.name !== '')
        ih['name'] = this.name;
      return ih;
    }

    __ptype() : string {
      return 'Aws::InstanceState';
    }
  }

  export class InternetGateway implements PcoreValue {
    readonly tags: {[s: string]: string};
    readonly internet_gateway_id: string | null;
    readonly attachments: Array<InternetGatewayAttachment>;

    constructor({
      tags,
      internet_gateway_id = null,
      attachments = []
    }: {
      tags: {[s: string]: string},
      internet_gateway_id?: string | null,
      attachments?: Array<InternetGatewayAttachment>
    }) {
      this.tags = tags;
      this.internet_gateway_id = internet_gateway_id;
      this.attachments = attachments;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['tags'] = this.tags;
      if(this.internet_gateway_id !== null)
        ih['internet_gateway_id'] = this.internet_gateway_id;
      if(this.attachments !== [])
        ih['attachments'] = this.attachments;
      return ih;
    }

    __ptype() : string {
      return 'Aws::InternetGateway';
    }
  }

  export class InternetGatewayAttachment implements PcoreValue {
    readonly state: string;
    readonly vpc_id: string;

    constructor({
      state,
      vpc_id
    }: {
      state: string,
      vpc_id: string
    }) {
      this.state = state;
      this.vpc_id = vpc_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['state'] = this.state;
      ih['vpc_id'] = this.vpc_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::InternetGatewayAttachment';
    }
  }

  export class InternetGatewayHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::InternetGatewayHandler';
    }
  }

  export class IpPermission implements PcoreValue {
    readonly from_port: number;
    readonly ip_protocol: string;
    readonly ip_ranges: Array<IpRange>;
    readonly ipv6_ranges: Array<Ipv6Range>;
    readonly prefix_list_ids: Array<PrefixListId>;
    readonly to_port: number;
    readonly user_id_group_pairs: Array<UserIdGroupPair>;

    constructor({
      from_port = 0,
      ip_protocol = '',
      ip_ranges = [],
      ipv6_ranges = [],
      prefix_list_ids = [],
      to_port = 0,
      user_id_group_pairs = []
    }: {
      from_port?: number,
      ip_protocol?: string,
      ip_ranges?: Array<IpRange>,
      ipv6_ranges?: Array<Ipv6Range>,
      prefix_list_ids?: Array<PrefixListId>,
      to_port?: number,
      user_id_group_pairs?: Array<UserIdGroupPair>
    }) {
      this.from_port = from_port;
      this.ip_protocol = ip_protocol;
      this.ip_ranges = ip_ranges;
      this.ipv6_ranges = ipv6_ranges;
      this.prefix_list_ids = prefix_list_ids;
      this.to_port = to_port;
      this.user_id_group_pairs = user_id_group_pairs;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.from_port !== 0)
        ih['from_port'] = this.from_port;
      if(this.ip_protocol !== '')
        ih['ip_protocol'] = this.ip_protocol;
      if(this.ip_ranges !== [])
        ih['ip_ranges'] = this.ip_ranges;
      if(this.ipv6_ranges !== [])
        ih['ipv6_ranges'] = this.ipv6_ranges;
      if(this.prefix_list_ids !== [])
        ih['prefix_list_ids'] = this.prefix_list_ids;
      if(this.to_port !== 0)
        ih['to_port'] = this.to_port;
      if(this.user_id_group_pairs !== [])
        ih['user_id_group_pairs'] = this.user_id_group_pairs;
      return ih;
    }

    __ptype() : string {
      return 'Aws::IpPermission';
    }
  }

  export class IpRange implements PcoreValue {
    readonly cidr_ip: string;
    readonly description: string;

    constructor({
      cidr_ip = '',
      description = ''
    }: {
      cidr_ip?: string,
      description?: string
    }) {
      this.cidr_ip = cidr_ip;
      this.description = description;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.cidr_ip !== '')
        ih['cidr_ip'] = this.cidr_ip;
      if(this.description !== '')
        ih['description'] = this.description;
      return ih;
    }

    __ptype() : string {
      return 'Aws::IpRange';
    }
  }

  export class Ipv6Range implements PcoreValue {
    readonly cidr_ipv6: string;
    readonly description: string;

    constructor({
      cidr_ipv6 = '',
      description = ''
    }: {
      cidr_ipv6?: string,
      description?: string
    }) {
      this.cidr_ipv6 = cidr_ipv6;
      this.description = description;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.cidr_ipv6 !== '')
        ih['cidr_ipv6'] = this.cidr_ipv6;
      if(this.description !== '')
        ih['description'] = this.description;
      return ih;
    }

    __ptype() : string {
      return 'Aws::Ipv6Range';
    }
  }

  export class KeyPair implements PcoreValue {
    readonly public_key_material: string;
    readonly key_name: string;
    readonly key_fingerprint: string;

    constructor({
      public_key_material,
      key_name,
      key_fingerprint = ''
    }: {
      public_key_material: string,
      key_name: string,
      key_fingerprint?: string
    }) {
      this.public_key_material = public_key_material;
      this.key_name = key_name;
      this.key_fingerprint = key_fingerprint;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['public_key_material'] = this.public_key_material;
      ih['key_name'] = this.key_name;
      if(this.key_fingerprint !== '')
        ih['key_fingerprint'] = this.key_fingerprint;
      return ih;
    }

    __ptype() : string {
      return 'Aws::KeyPair';
    }
  }

  export class KeyPairHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::KeyPairHandler';
    }
  }

  export class LaunchTemplateSpecification implements PcoreValue {
    readonly launch_template_id: string;
    readonly launch_template_name: string;
    readonly version: string;

    constructor({
      launch_template_id = '',
      launch_template_name = '',
      version = ''
    }: {
      launch_template_id?: string,
      launch_template_name?: string,
      version?: string
    }) {
      this.launch_template_id = launch_template_id;
      this.launch_template_name = launch_template_name;
      this.version = version;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.launch_template_id !== '')
        ih['launch_template_id'] = this.launch_template_id;
      if(this.launch_template_name !== '')
        ih['launch_template_name'] = this.launch_template_name;
      if(this.version !== '')
        ih['version'] = this.version;
      return ih;
    }

    __ptype() : string {
      return 'Aws::LaunchTemplateSpecification';
    }
  }

  export class Monitoring implements PcoreValue {
    readonly enabled: boolean;
    readonly state: string;

    constructor({
      enabled = false,
      state = ''
    }: {
      enabled?: boolean,
      state?: string
    }) {
      this.enabled = enabled;
      this.state = state;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.enabled !== false)
        ih['enabled'] = this.enabled;
      if(this.state !== '')
        ih['state'] = this.state;
      return ih;
    }

    __ptype() : string {
      return 'Aws::Monitoring';
    }
  }
  export namespace Native {

    export class CapacityReservationSpecificationResponse implements PcoreValue {
      readonly capacity_reservation_preference: string | null;
      readonly capacity_reservation_target: CapacityReservationTargetResponse | null;

      constructor({
        capacity_reservation_preference = null,
        capacity_reservation_target = null
      }: {
        capacity_reservation_preference?: string | null,
        capacity_reservation_target?: CapacityReservationTargetResponse | null
      }) {
        this.capacity_reservation_preference = capacity_reservation_preference;
        this.capacity_reservation_target = capacity_reservation_target;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.capacity_reservation_preference !== null)
          ih['capacity_reservation_preference'] = this.capacity_reservation_preference;
        if(this.capacity_reservation_target !== null)
          ih['capacity_reservation_target'] = this.capacity_reservation_target;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::CapacityReservationSpecificationResponse';
      }
    }

    export class CapacityReservationTargetResponse implements PcoreValue {
      readonly capacity_reservation_id: string | null;

      constructor({
        capacity_reservation_id = null
      }: {
        capacity_reservation_id?: string | null
      }) {
        this.capacity_reservation_id = capacity_reservation_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.capacity_reservation_id !== null)
          ih['capacity_reservation_id'] = this.capacity_reservation_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::CapacityReservationTargetResponse';
      }
    }

    export class CpuOptions implements PcoreValue {
      readonly core_count: number | null;
      readonly threads_per_core: number | null;

      constructor({
        core_count = null,
        threads_per_core = null
      }: {
        core_count?: number | null,
        threads_per_core?: number | null
      }) {
        this.core_count = core_count;
        this.threads_per_core = threads_per_core;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.core_count !== null)
          ih['core_count'] = this.core_count;
        if(this.threads_per_core !== null)
          ih['threads_per_core'] = this.threads_per_core;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::CpuOptions';
      }
    }

    export class EbsInstanceBlockDevice implements PcoreValue {
      readonly attach_time:  | null;
      readonly delete_on_termination: boolean | null;
      readonly status: string | null;
      readonly volume_id: string | null;

      constructor({
        attach_time = null,
        delete_on_termination = null,
        status = null,
        volume_id = null
      }: {
        attach_time?:  | null,
        delete_on_termination?: boolean | null,
        status?: string | null,
        volume_id?: string | null
      }) {
        this.attach_time = attach_time;
        this.delete_on_termination = delete_on_termination;
        this.status = status;
        this.volume_id = volume_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.attach_time !== null)
          ih['attach_time'] = this.attach_time;
        if(this.delete_on_termination !== null)
          ih['delete_on_termination'] = this.delete_on_termination;
        if(this.status !== null)
          ih['status'] = this.status;
        if(this.volume_id !== null)
          ih['volume_id'] = this.volume_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::EbsInstanceBlockDevice';
      }
    }

    export class ElasticGpuAssociation implements PcoreValue {
      readonly elastic_gpu_association_id: string | null;
      readonly elastic_gpu_association_state: string | null;
      readonly elastic_gpu_association_time: string | null;
      readonly elastic_gpu_id: string | null;

      constructor({
        elastic_gpu_association_id = null,
        elastic_gpu_association_state = null,
        elastic_gpu_association_time = null,
        elastic_gpu_id = null
      }: {
        elastic_gpu_association_id?: string | null,
        elastic_gpu_association_state?: string | null,
        elastic_gpu_association_time?: string | null,
        elastic_gpu_id?: string | null
      }) {
        this.elastic_gpu_association_id = elastic_gpu_association_id;
        this.elastic_gpu_association_state = elastic_gpu_association_state;
        this.elastic_gpu_association_time = elastic_gpu_association_time;
        this.elastic_gpu_id = elastic_gpu_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.elastic_gpu_association_id !== null)
          ih['elastic_gpu_association_id'] = this.elastic_gpu_association_id;
        if(this.elastic_gpu_association_state !== null)
          ih['elastic_gpu_association_state'] = this.elastic_gpu_association_state;
        if(this.elastic_gpu_association_time !== null)
          ih['elastic_gpu_association_time'] = this.elastic_gpu_association_time;
        if(this.elastic_gpu_id !== null)
          ih['elastic_gpu_id'] = this.elastic_gpu_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::ElasticGpuAssociation';
      }
    }

    export class ElasticInferenceAcceleratorAssociation implements PcoreValue {
      readonly elastic_inference_accelerator_arn: string | null;
      readonly elastic_inference_accelerator_association_id: string | null;
      readonly elastic_inference_accelerator_association_state: string | null;
      readonly elastic_inference_accelerator_association_time:  | null;

      constructor({
        elastic_inference_accelerator_arn = null,
        elastic_inference_accelerator_association_id = null,
        elastic_inference_accelerator_association_state = null,
        elastic_inference_accelerator_association_time = null
      }: {
        elastic_inference_accelerator_arn?: string | null,
        elastic_inference_accelerator_association_id?: string | null,
        elastic_inference_accelerator_association_state?: string | null,
        elastic_inference_accelerator_association_time?:  | null
      }) {
        this.elastic_inference_accelerator_arn = elastic_inference_accelerator_arn;
        this.elastic_inference_accelerator_association_id = elastic_inference_accelerator_association_id;
        this.elastic_inference_accelerator_association_state = elastic_inference_accelerator_association_state;
        this.elastic_inference_accelerator_association_time = elastic_inference_accelerator_association_time;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.elastic_inference_accelerator_arn !== null)
          ih['elastic_inference_accelerator_arn'] = this.elastic_inference_accelerator_arn;
        if(this.elastic_inference_accelerator_association_id !== null)
          ih['elastic_inference_accelerator_association_id'] = this.elastic_inference_accelerator_association_id;
        if(this.elastic_inference_accelerator_association_state !== null)
          ih['elastic_inference_accelerator_association_state'] = this.elastic_inference_accelerator_association_state;
        if(this.elastic_inference_accelerator_association_time !== null)
          ih['elastic_inference_accelerator_association_time'] = this.elastic_inference_accelerator_association_time;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::ElasticInferenceAcceleratorAssociation';
      }
    }

    export class GroupIdentifier implements PcoreValue {
      readonly group_id: string | null;
      readonly group_name: string | null;

      constructor({
        group_id = null,
        group_name = null
      }: {
        group_id?: string | null,
        group_name?: string | null
      }) {
        this.group_id = group_id;
        this.group_name = group_name;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.group_id !== null)
          ih['group_id'] = this.group_id;
        if(this.group_name !== null)
          ih['group_name'] = this.group_name;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::GroupIdentifier';
      }
    }

    export class HibernationOptions implements PcoreValue {
      readonly configured: boolean | null;

      constructor({
        configured = null
      }: {
        configured?: boolean | null
      }) {
        this.configured = configured;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.configured !== null)
          ih['configured'] = this.configured;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::HibernationOptions';
      }
    }

    export class IamInstanceProfile implements PcoreValue {
      readonly arn: string | null;
      readonly id: string | null;

      constructor({
        arn = null,
        id = null
      }: {
        arn?: string | null,
        id?: string | null
      }) {
        this.arn = arn;
        this.id = id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.arn !== null)
          ih['arn'] = this.arn;
        if(this.id !== null)
          ih['id'] = this.id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::IamInstanceProfile';
      }
    }

    export class Instance implements PcoreValue {
      readonly block_device_mappings: Array<InstanceBlockDeviceMapping | null>;
      readonly elastic_gpu_associations: Array<ElasticGpuAssociation | null>;
      readonly elastic_inference_accelerator_associations: Array<ElasticInferenceAcceleratorAssociation | null>;
      readonly licenses: Array<LicenseConfiguration | null>;
      readonly network_interfaces: Array<InstanceNetworkInterface | null>;
      readonly product_codes: Array<ProductCode | null>;
      readonly security_groups: Array<GroupIdentifier | null>;
      readonly tags: Array<Tag | null>;
      readonly ami_launch_index: number | null;
      readonly architecture: string | null;
      readonly capacity_reservation_id: string | null;
      readonly capacity_reservation_specification: CapacityReservationSpecificationResponse | null;
      readonly client_token: string | null;
      readonly cpu_options: CpuOptions | null;
      readonly ebs_optimized: boolean | null;
      readonly ena_support: boolean | null;
      readonly hibernation_options: HibernationOptions | null;
      readonly hypervisor: string | null;
      readonly iam_instance_profile: IamInstanceProfile | null;
      readonly image_id: string | null;
      readonly instance_id: string | null;
      readonly instance_lifecycle: string | null;
      readonly instance_type: string | null;
      readonly kernel_id: string | null;
      readonly key_name: string | null;
      readonly launch_time:  | null;
      readonly monitoring: Monitoring | null;
      readonly placement: Placement | null;
      readonly platform: string | null;
      readonly private_dns_name: string | null;
      readonly private_ip_address: string | null;
      readonly public_dns_name: string | null;
      readonly public_ip_address: string | null;
      readonly ramdisk_id: string | null;
      readonly root_device_name: string | null;
      readonly root_device_type: string | null;
      readonly source_dest_check: boolean | null;
      readonly spot_instance_request_id: string | null;
      readonly sriov_net_support: string | null;
      readonly state: InstanceState | null;
      readonly state_reason: StateReason | null;
      readonly state_transition_reason: string | null;
      readonly subnet_id: string | null;
      readonly virtualization_type: string | null;
      readonly vpc_id: string | null;

      constructor({
        block_device_mappings,
        elastic_gpu_associations,
        elastic_inference_accelerator_associations,
        licenses,
        network_interfaces,
        product_codes,
        security_groups,
        tags,
        ami_launch_index = null,
        architecture = null,
        capacity_reservation_id = null,
        capacity_reservation_specification = null,
        client_token = null,
        cpu_options = null,
        ebs_optimized = null,
        ena_support = null,
        hibernation_options = null,
        hypervisor = null,
        iam_instance_profile = null,
        image_id = null,
        instance_id = null,
        instance_lifecycle = null,
        instance_type = null,
        kernel_id = null,
        key_name = null,
        launch_time = null,
        monitoring = null,
        placement = null,
        platform = null,
        private_dns_name = null,
        private_ip_address = null,
        public_dns_name = null,
        public_ip_address = null,
        ramdisk_id = null,
        root_device_name = null,
        root_device_type = null,
        source_dest_check = null,
        spot_instance_request_id = null,
        sriov_net_support = null,
        state = null,
        state_reason = null,
        state_transition_reason = null,
        subnet_id = null,
        virtualization_type = null,
        vpc_id = null
      }: {
        block_device_mappings: Array<InstanceBlockDeviceMapping | null>,
        elastic_gpu_associations: Array<ElasticGpuAssociation | null>,
        elastic_inference_accelerator_associations: Array<ElasticInferenceAcceleratorAssociation | null>,
        licenses: Array<LicenseConfiguration | null>,
        network_interfaces: Array<InstanceNetworkInterface | null>,
        product_codes: Array<ProductCode | null>,
        security_groups: Array<GroupIdentifier | null>,
        tags: Array<Tag | null>,
        ami_launch_index?: number | null,
        architecture?: string | null,
        capacity_reservation_id?: string | null,
        capacity_reservation_specification?: CapacityReservationSpecificationResponse | null,
        client_token?: string | null,
        cpu_options?: CpuOptions | null,
        ebs_optimized?: boolean | null,
        ena_support?: boolean | null,
        hibernation_options?: HibernationOptions | null,
        hypervisor?: string | null,
        iam_instance_profile?: IamInstanceProfile | null,
        image_id?: string | null,
        instance_id?: string | null,
        instance_lifecycle?: string | null,
        instance_type?: string | null,
        kernel_id?: string | null,
        key_name?: string | null,
        launch_time?:  | null,
        monitoring?: Monitoring | null,
        placement?: Placement | null,
        platform?: string | null,
        private_dns_name?: string | null,
        private_ip_address?: string | null,
        public_dns_name?: string | null,
        public_ip_address?: string | null,
        ramdisk_id?: string | null,
        root_device_name?: string | null,
        root_device_type?: string | null,
        source_dest_check?: boolean | null,
        spot_instance_request_id?: string | null,
        sriov_net_support?: string | null,
        state?: InstanceState | null,
        state_reason?: StateReason | null,
        state_transition_reason?: string | null,
        subnet_id?: string | null,
        virtualization_type?: string | null,
        vpc_id?: string | null
      }) {
        this.block_device_mappings = block_device_mappings;
        this.elastic_gpu_associations = elastic_gpu_associations;
        this.elastic_inference_accelerator_associations = elastic_inference_accelerator_associations;
        this.licenses = licenses;
        this.network_interfaces = network_interfaces;
        this.product_codes = product_codes;
        this.security_groups = security_groups;
        this.tags = tags;
        this.ami_launch_index = ami_launch_index;
        this.architecture = architecture;
        this.capacity_reservation_id = capacity_reservation_id;
        this.capacity_reservation_specification = capacity_reservation_specification;
        this.client_token = client_token;
        this.cpu_options = cpu_options;
        this.ebs_optimized = ebs_optimized;
        this.ena_support = ena_support;
        this.hibernation_options = hibernation_options;
        this.hypervisor = hypervisor;
        this.iam_instance_profile = iam_instance_profile;
        this.image_id = image_id;
        this.instance_id = instance_id;
        this.instance_lifecycle = instance_lifecycle;
        this.instance_type = instance_type;
        this.kernel_id = kernel_id;
        this.key_name = key_name;
        this.launch_time = launch_time;
        this.monitoring = monitoring;
        this.placement = placement;
        this.platform = platform;
        this.private_dns_name = private_dns_name;
        this.private_ip_address = private_ip_address;
        this.public_dns_name = public_dns_name;
        this.public_ip_address = public_ip_address;
        this.ramdisk_id = ramdisk_id;
        this.root_device_name = root_device_name;
        this.root_device_type = root_device_type;
        this.source_dest_check = source_dest_check;
        this.spot_instance_request_id = spot_instance_request_id;
        this.sriov_net_support = sriov_net_support;
        this.state = state;
        this.state_reason = state_reason;
        this.state_transition_reason = state_transition_reason;
        this.subnet_id = subnet_id;
        this.virtualization_type = virtualization_type;
        this.vpc_id = vpc_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['block_device_mappings'] = this.block_device_mappings;
        ih['elastic_gpu_associations'] = this.elastic_gpu_associations;
        ih['elastic_inference_accelerator_associations'] = this.elastic_inference_accelerator_associations;
        ih['licenses'] = this.licenses;
        ih['network_interfaces'] = this.network_interfaces;
        ih['product_codes'] = this.product_codes;
        ih['security_groups'] = this.security_groups;
        ih['tags'] = this.tags;
        if(this.ami_launch_index !== null)
          ih['ami_launch_index'] = this.ami_launch_index;
        if(this.architecture !== null)
          ih['architecture'] = this.architecture;
        if(this.capacity_reservation_id !== null)
          ih['capacity_reservation_id'] = this.capacity_reservation_id;
        if(this.capacity_reservation_specification !== null)
          ih['capacity_reservation_specification'] = this.capacity_reservation_specification;
        if(this.client_token !== null)
          ih['client_token'] = this.client_token;
        if(this.cpu_options !== null)
          ih['cpu_options'] = this.cpu_options;
        if(this.ebs_optimized !== null)
          ih['ebs_optimized'] = this.ebs_optimized;
        if(this.ena_support !== null)
          ih['ena_support'] = this.ena_support;
        if(this.hibernation_options !== null)
          ih['hibernation_options'] = this.hibernation_options;
        if(this.hypervisor !== null)
          ih['hypervisor'] = this.hypervisor;
        if(this.iam_instance_profile !== null)
          ih['iam_instance_profile'] = this.iam_instance_profile;
        if(this.image_id !== null)
          ih['image_id'] = this.image_id;
        if(this.instance_id !== null)
          ih['instance_id'] = this.instance_id;
        if(this.instance_lifecycle !== null)
          ih['instance_lifecycle'] = this.instance_lifecycle;
        if(this.instance_type !== null)
          ih['instance_type'] = this.instance_type;
        if(this.kernel_id !== null)
          ih['kernel_id'] = this.kernel_id;
        if(this.key_name !== null)
          ih['key_name'] = this.key_name;
        if(this.launch_time !== null)
          ih['launch_time'] = this.launch_time;
        if(this.monitoring !== null)
          ih['monitoring'] = this.monitoring;
        if(this.placement !== null)
          ih['placement'] = this.placement;
        if(this.platform !== null)
          ih['platform'] = this.platform;
        if(this.private_dns_name !== null)
          ih['private_dns_name'] = this.private_dns_name;
        if(this.private_ip_address !== null)
          ih['private_ip_address'] = this.private_ip_address;
        if(this.public_dns_name !== null)
          ih['public_dns_name'] = this.public_dns_name;
        if(this.public_ip_address !== null)
          ih['public_ip_address'] = this.public_ip_address;
        if(this.ramdisk_id !== null)
          ih['ramdisk_id'] = this.ramdisk_id;
        if(this.root_device_name !== null)
          ih['root_device_name'] = this.root_device_name;
        if(this.root_device_type !== null)
          ih['root_device_type'] = this.root_device_type;
        if(this.source_dest_check !== null)
          ih['source_dest_check'] = this.source_dest_check;
        if(this.spot_instance_request_id !== null)
          ih['spot_instance_request_id'] = this.spot_instance_request_id;
        if(this.sriov_net_support !== null)
          ih['sriov_net_support'] = this.sriov_net_support;
        if(this.state !== null)
          ih['state'] = this.state;
        if(this.state_reason !== null)
          ih['state_reason'] = this.state_reason;
        if(this.state_transition_reason !== null)
          ih['state_transition_reason'] = this.state_transition_reason;
        if(this.subnet_id !== null)
          ih['subnet_id'] = this.subnet_id;
        if(this.virtualization_type !== null)
          ih['virtualization_type'] = this.virtualization_type;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Instance';
      }
    }

    export class InstanceBlockDeviceMapping implements PcoreValue {
      readonly device_name: string | null;
      readonly ebs: EbsInstanceBlockDevice | null;

      constructor({
        device_name = null,
        ebs = null
      }: {
        device_name?: string | null,
        ebs?: EbsInstanceBlockDevice | null
      }) {
        this.device_name = device_name;
        this.ebs = ebs;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.device_name !== null)
          ih['device_name'] = this.device_name;
        if(this.ebs !== null)
          ih['ebs'] = this.ebs;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InstanceBlockDeviceMapping';
      }
    }

    export class InstanceIpv6Address implements PcoreValue {
      readonly ipv6_address: string | null;

      constructor({
        ipv6_address = null
      }: {
        ipv6_address?: string | null
      }) {
        this.ipv6_address = ipv6_address;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.ipv6_address !== null)
          ih['ipv6_address'] = this.ipv6_address;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InstanceIpv6Address';
      }
    }

    export class InstanceNetworkInterface implements PcoreValue {
      readonly groups: Array<GroupIdentifier | null>;
      readonly ipv6_addresses: Array<InstanceIpv6Address | null>;
      readonly private_ip_addresses: Array<InstancePrivateIpAddress | null>;
      readonly association: InstanceNetworkInterfaceAssociation | null;
      readonly attachment: InstanceNetworkInterfaceAttachment | null;
      readonly description: string | null;
      readonly mac_address: string | null;
      readonly network_interface_id: string | null;
      readonly owner_id: string | null;
      readonly private_dns_name: string | null;
      readonly private_ip_address: string | null;
      readonly source_dest_check: boolean | null;
      readonly status: string | null;
      readonly subnet_id: string | null;
      readonly vpc_id: string | null;

      constructor({
        groups,
        ipv6_addresses,
        private_ip_addresses,
        association = null,
        attachment = null,
        description = null,
        mac_address = null,
        network_interface_id = null,
        owner_id = null,
        private_dns_name = null,
        private_ip_address = null,
        source_dest_check = null,
        status = null,
        subnet_id = null,
        vpc_id = null
      }: {
        groups: Array<GroupIdentifier | null>,
        ipv6_addresses: Array<InstanceIpv6Address | null>,
        private_ip_addresses: Array<InstancePrivateIpAddress | null>,
        association?: InstanceNetworkInterfaceAssociation | null,
        attachment?: InstanceNetworkInterfaceAttachment | null,
        description?: string | null,
        mac_address?: string | null,
        network_interface_id?: string | null,
        owner_id?: string | null,
        private_dns_name?: string | null,
        private_ip_address?: string | null,
        source_dest_check?: boolean | null,
        status?: string | null,
        subnet_id?: string | null,
        vpc_id?: string | null
      }) {
        this.groups = groups;
        this.ipv6_addresses = ipv6_addresses;
        this.private_ip_addresses = private_ip_addresses;
        this.association = association;
        this.attachment = attachment;
        this.description = description;
        this.mac_address = mac_address;
        this.network_interface_id = network_interface_id;
        this.owner_id = owner_id;
        this.private_dns_name = private_dns_name;
        this.private_ip_address = private_ip_address;
        this.source_dest_check = source_dest_check;
        this.status = status;
        this.subnet_id = subnet_id;
        this.vpc_id = vpc_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['groups'] = this.groups;
        ih['ipv6_addresses'] = this.ipv6_addresses;
        ih['private_ip_addresses'] = this.private_ip_addresses;
        if(this.association !== null)
          ih['association'] = this.association;
        if(this.attachment !== null)
          ih['attachment'] = this.attachment;
        if(this.description !== null)
          ih['description'] = this.description;
        if(this.mac_address !== null)
          ih['mac_address'] = this.mac_address;
        if(this.network_interface_id !== null)
          ih['network_interface_id'] = this.network_interface_id;
        if(this.owner_id !== null)
          ih['owner_id'] = this.owner_id;
        if(this.private_dns_name !== null)
          ih['private_dns_name'] = this.private_dns_name;
        if(this.private_ip_address !== null)
          ih['private_ip_address'] = this.private_ip_address;
        if(this.source_dest_check !== null)
          ih['source_dest_check'] = this.source_dest_check;
        if(this.status !== null)
          ih['status'] = this.status;
        if(this.subnet_id !== null)
          ih['subnet_id'] = this.subnet_id;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InstanceNetworkInterface';
      }
    }

    export class InstanceNetworkInterfaceAssociation implements PcoreValue {
      readonly ip_owner_id: string | null;
      readonly public_dns_name: string | null;
      readonly public_ip: string | null;

      constructor({
        ip_owner_id = null,
        public_dns_name = null,
        public_ip = null
      }: {
        ip_owner_id?: string | null,
        public_dns_name?: string | null,
        public_ip?: string | null
      }) {
        this.ip_owner_id = ip_owner_id;
        this.public_dns_name = public_dns_name;
        this.public_ip = public_ip;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.ip_owner_id !== null)
          ih['ip_owner_id'] = this.ip_owner_id;
        if(this.public_dns_name !== null)
          ih['public_dns_name'] = this.public_dns_name;
        if(this.public_ip !== null)
          ih['public_ip'] = this.public_ip;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InstanceNetworkInterfaceAssociation';
      }
    }

    export class InstanceNetworkInterfaceAttachment implements PcoreValue {
      readonly attach_time:  | null;
      readonly attachment_id: string | null;
      readonly delete_on_termination: boolean | null;
      readonly device_index: number | null;
      readonly status: string | null;

      constructor({
        attach_time = null,
        attachment_id = null,
        delete_on_termination = null,
        device_index = null,
        status = null
      }: {
        attach_time?:  | null,
        attachment_id?: string | null,
        delete_on_termination?: boolean | null,
        device_index?: number | null,
        status?: string | null
      }) {
        this.attach_time = attach_time;
        this.attachment_id = attachment_id;
        this.delete_on_termination = delete_on_termination;
        this.device_index = device_index;
        this.status = status;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.attach_time !== null)
          ih['attach_time'] = this.attach_time;
        if(this.attachment_id !== null)
          ih['attachment_id'] = this.attachment_id;
        if(this.delete_on_termination !== null)
          ih['delete_on_termination'] = this.delete_on_termination;
        if(this.device_index !== null)
          ih['device_index'] = this.device_index;
        if(this.status !== null)
          ih['status'] = this.status;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InstanceNetworkInterfaceAttachment';
      }
    }

    export class InstancePrivateIpAddress implements PcoreValue {
      readonly association: InstanceNetworkInterfaceAssociation | null;
      readonly primary: boolean | null;
      readonly private_dns_name: string | null;
      readonly private_ip_address: string | null;

      constructor({
        association = null,
        primary = null,
        private_dns_name = null,
        private_ip_address = null
      }: {
        association?: InstanceNetworkInterfaceAssociation | null,
        primary?: boolean | null,
        private_dns_name?: string | null,
        private_ip_address?: string | null
      }) {
        this.association = association;
        this.primary = primary;
        this.private_dns_name = private_dns_name;
        this.private_ip_address = private_ip_address;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.association !== null)
          ih['association'] = this.association;
        if(this.primary !== null)
          ih['primary'] = this.primary;
        if(this.private_dns_name !== null)
          ih['private_dns_name'] = this.private_dns_name;
        if(this.private_ip_address !== null)
          ih['private_ip_address'] = this.private_ip_address;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InstancePrivateIpAddress';
      }
    }

    export class InstanceState implements PcoreValue {
      readonly code: number | null;
      readonly name: string | null;

      constructor({
        code = null,
        name = null
      }: {
        code?: number | null,
        name?: string | null
      }) {
        this.code = code;
        this.name = name;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.code !== null)
          ih['code'] = this.code;
        if(this.name !== null)
          ih['name'] = this.name;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InstanceState';
      }
    }

    export class InternetGateway implements PcoreValue {
      readonly attachments: Array<InternetGatewayAttachment | null>;
      readonly tags: Array<Tag | null>;
      readonly internet_gateway_id: string | null;
      readonly owner_id: string | null;

      constructor({
        attachments,
        tags,
        internet_gateway_id = null,
        owner_id = null
      }: {
        attachments: Array<InternetGatewayAttachment | null>,
        tags: Array<Tag | null>,
        internet_gateway_id?: string | null,
        owner_id?: string | null
      }) {
        this.attachments = attachments;
        this.tags = tags;
        this.internet_gateway_id = internet_gateway_id;
        this.owner_id = owner_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['attachments'] = this.attachments;
        ih['tags'] = this.tags;
        if(this.internet_gateway_id !== null)
          ih['internet_gateway_id'] = this.internet_gateway_id;
        if(this.owner_id !== null)
          ih['owner_id'] = this.owner_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InternetGateway';
      }
    }

    export class InternetGatewayAttachment implements PcoreValue {
      readonly state: string | null;
      readonly vpc_id: string | null;

      constructor({
        state = null,
        vpc_id = null
      }: {
        state?: string | null,
        vpc_id?: string | null
      }) {
        this.state = state;
        this.vpc_id = vpc_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.state !== null)
          ih['state'] = this.state;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::InternetGatewayAttachment';
      }
    }

    export class IpPermission implements PcoreValue {
      readonly ip_ranges: Array<IpRange | null>;
      readonly ipv6_ranges: Array<Ipv6Range | null>;
      readonly prefix_list_ids: Array<PrefixListId | null>;
      readonly user_id_group_pairs: Array<UserIdGroupPair | null>;
      readonly from_port: number | null;
      readonly ip_protocol: string | null;
      readonly to_port: number | null;

      constructor({
        ip_ranges,
        ipv6_ranges,
        prefix_list_ids,
        user_id_group_pairs,
        from_port = null,
        ip_protocol = null,
        to_port = null
      }: {
        ip_ranges: Array<IpRange | null>,
        ipv6_ranges: Array<Ipv6Range | null>,
        prefix_list_ids: Array<PrefixListId | null>,
        user_id_group_pairs: Array<UserIdGroupPair | null>,
        from_port?: number | null,
        ip_protocol?: string | null,
        to_port?: number | null
      }) {
        this.ip_ranges = ip_ranges;
        this.ipv6_ranges = ipv6_ranges;
        this.prefix_list_ids = prefix_list_ids;
        this.user_id_group_pairs = user_id_group_pairs;
        this.from_port = from_port;
        this.ip_protocol = ip_protocol;
        this.to_port = to_port;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['ip_ranges'] = this.ip_ranges;
        ih['ipv6_ranges'] = this.ipv6_ranges;
        ih['prefix_list_ids'] = this.prefix_list_ids;
        ih['user_id_group_pairs'] = this.user_id_group_pairs;
        if(this.from_port !== null)
          ih['from_port'] = this.from_port;
        if(this.ip_protocol !== null)
          ih['ip_protocol'] = this.ip_protocol;
        if(this.to_port !== null)
          ih['to_port'] = this.to_port;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::IpPermission';
      }
    }

    export class IpRange implements PcoreValue {
      readonly cidr_ip: string | null;
      readonly description: string | null;

      constructor({
        cidr_ip = null,
        description = null
      }: {
        cidr_ip?: string | null,
        description?: string | null
      }) {
        this.cidr_ip = cidr_ip;
        this.description = description;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.cidr_ip !== null)
          ih['cidr_ip'] = this.cidr_ip;
        if(this.description !== null)
          ih['description'] = this.description;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::IpRange';
      }
    }

    export class Ipv6Range implements PcoreValue {
      readonly cidr_ipv6: string | null;
      readonly description: string | null;

      constructor({
        cidr_ipv6 = null,
        description = null
      }: {
        cidr_ipv6?: string | null,
        description?: string | null
      }) {
        this.cidr_ipv6 = cidr_ipv6;
        this.description = description;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.cidr_ipv6 !== null)
          ih['cidr_ipv6'] = this.cidr_ipv6;
        if(this.description !== null)
          ih['description'] = this.description;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Ipv6Range';
      }
    }

    export class LicenseConfiguration implements PcoreValue {
      readonly license_configuration_arn: string | null;

      constructor({
        license_configuration_arn = null
      }: {
        license_configuration_arn?: string | null
      }) {
        this.license_configuration_arn = license_configuration_arn;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.license_configuration_arn !== null)
          ih['license_configuration_arn'] = this.license_configuration_arn;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::LicenseConfiguration';
      }
    }

    export class Monitoring implements PcoreValue {
      readonly state: string | null;

      constructor({
        state = null
      }: {
        state?: string | null
      }) {
        this.state = state;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.state !== null)
          ih['state'] = this.state;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Monitoring';
      }
    }

    export class Placement implements PcoreValue {
      readonly affinity: string | null;
      readonly availability_zone: string | null;
      readonly group_name: string | null;
      readonly host_id: string | null;
      readonly partition_number: number | null;
      readonly spread_domain: string | null;
      readonly tenancy: string | null;

      constructor({
        affinity = null,
        availability_zone = null,
        group_name = null,
        host_id = null,
        partition_number = null,
        spread_domain = null,
        tenancy = null
      }: {
        affinity?: string | null,
        availability_zone?: string | null,
        group_name?: string | null,
        host_id?: string | null,
        partition_number?: number | null,
        spread_domain?: string | null,
        tenancy?: string | null
      }) {
        this.affinity = affinity;
        this.availability_zone = availability_zone;
        this.group_name = group_name;
        this.host_id = host_id;
        this.partition_number = partition_number;
        this.spread_domain = spread_domain;
        this.tenancy = tenancy;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.affinity !== null)
          ih['affinity'] = this.affinity;
        if(this.availability_zone !== null)
          ih['availability_zone'] = this.availability_zone;
        if(this.group_name !== null)
          ih['group_name'] = this.group_name;
        if(this.host_id !== null)
          ih['host_id'] = this.host_id;
        if(this.partition_number !== null)
          ih['partition_number'] = this.partition_number;
        if(this.spread_domain !== null)
          ih['spread_domain'] = this.spread_domain;
        if(this.tenancy !== null)
          ih['tenancy'] = this.tenancy;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Placement';
      }
    }

    export class PrefixListId implements PcoreValue {
      readonly description: string | null;
      readonly prefix_list_id: string | null;

      constructor({
        description = null,
        prefix_list_id = null
      }: {
        description?: string | null,
        prefix_list_id?: string | null
      }) {
        this.description = description;
        this.prefix_list_id = prefix_list_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.description !== null)
          ih['description'] = this.description;
        if(this.prefix_list_id !== null)
          ih['prefix_list_id'] = this.prefix_list_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::PrefixListId';
      }
    }

    export class ProductCode implements PcoreValue {
      readonly product_code_id: string | null;
      readonly product_code_type: string | null;

      constructor({
        product_code_id = null,
        product_code_type = null
      }: {
        product_code_id?: string | null,
        product_code_type?: string | null
      }) {
        this.product_code_id = product_code_id;
        this.product_code_type = product_code_type;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.product_code_id !== null)
          ih['product_code_id'] = this.product_code_id;
        if(this.product_code_type !== null)
          ih['product_code_type'] = this.product_code_type;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::ProductCode';
      }
    }

    export class PropagatingVgw implements PcoreValue {
      readonly gateway_id: string | null;

      constructor({
        gateway_id = null
      }: {
        gateway_id?: string | null
      }) {
        this.gateway_id = gateway_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.gateway_id !== null)
          ih['gateway_id'] = this.gateway_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::PropagatingVgw';
      }
    }

    export class Route implements PcoreValue {
      readonly destination_cidr_block: string | null;
      readonly destination_ipv6_cidr_block: string | null;
      readonly destination_prefix_list_id: string | null;
      readonly egress_only_internet_gateway_id: string | null;
      readonly gateway_id: string | null;
      readonly instance_id: string | null;
      readonly instance_owner_id: string | null;
      readonly nat_gateway_id: string | null;
      readonly network_interface_id: string | null;
      readonly origin: string | null;
      readonly state: string | null;
      readonly transit_gateway_id: string | null;
      readonly vpc_peering_connection_id: string | null;

      constructor({
        destination_cidr_block = null,
        destination_ipv6_cidr_block = null,
        destination_prefix_list_id = null,
        egress_only_internet_gateway_id = null,
        gateway_id = null,
        instance_id = null,
        instance_owner_id = null,
        nat_gateway_id = null,
        network_interface_id = null,
        origin = null,
        state = null,
        transit_gateway_id = null,
        vpc_peering_connection_id = null
      }: {
        destination_cidr_block?: string | null,
        destination_ipv6_cidr_block?: string | null,
        destination_prefix_list_id?: string | null,
        egress_only_internet_gateway_id?: string | null,
        gateway_id?: string | null,
        instance_id?: string | null,
        instance_owner_id?: string | null,
        nat_gateway_id?: string | null,
        network_interface_id?: string | null,
        origin?: string | null,
        state?: string | null,
        transit_gateway_id?: string | null,
        vpc_peering_connection_id?: string | null
      }) {
        this.destination_cidr_block = destination_cidr_block;
        this.destination_ipv6_cidr_block = destination_ipv6_cidr_block;
        this.destination_prefix_list_id = destination_prefix_list_id;
        this.egress_only_internet_gateway_id = egress_only_internet_gateway_id;
        this.gateway_id = gateway_id;
        this.instance_id = instance_id;
        this.instance_owner_id = instance_owner_id;
        this.nat_gateway_id = nat_gateway_id;
        this.network_interface_id = network_interface_id;
        this.origin = origin;
        this.state = state;
        this.transit_gateway_id = transit_gateway_id;
        this.vpc_peering_connection_id = vpc_peering_connection_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.destination_cidr_block !== null)
          ih['destination_cidr_block'] = this.destination_cidr_block;
        if(this.destination_ipv6_cidr_block !== null)
          ih['destination_ipv6_cidr_block'] = this.destination_ipv6_cidr_block;
        if(this.destination_prefix_list_id !== null)
          ih['destination_prefix_list_id'] = this.destination_prefix_list_id;
        if(this.egress_only_internet_gateway_id !== null)
          ih['egress_only_internet_gateway_id'] = this.egress_only_internet_gateway_id;
        if(this.gateway_id !== null)
          ih['gateway_id'] = this.gateway_id;
        if(this.instance_id !== null)
          ih['instance_id'] = this.instance_id;
        if(this.instance_owner_id !== null)
          ih['instance_owner_id'] = this.instance_owner_id;
        if(this.nat_gateway_id !== null)
          ih['nat_gateway_id'] = this.nat_gateway_id;
        if(this.network_interface_id !== null)
          ih['network_interface_id'] = this.network_interface_id;
        if(this.origin !== null)
          ih['origin'] = this.origin;
        if(this.state !== null)
          ih['state'] = this.state;
        if(this.transit_gateway_id !== null)
          ih['transit_gateway_id'] = this.transit_gateway_id;
        if(this.vpc_peering_connection_id !== null)
          ih['vpc_peering_connection_id'] = this.vpc_peering_connection_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Route';
      }
    }

    export class RouteTable implements PcoreValue {
      readonly associations: Array<RouteTableAssociation | null>;
      readonly propagating_vgws: Array<PropagatingVgw | null>;
      readonly routes: Array<Route | null>;
      readonly tags: Array<Tag | null>;
      readonly owner_id: string | null;
      readonly route_table_id: string | null;
      readonly vpc_id: string | null;

      constructor({
        associations,
        propagating_vgws,
        routes,
        tags,
        owner_id = null,
        route_table_id = null,
        vpc_id = null
      }: {
        associations: Array<RouteTableAssociation | null>,
        propagating_vgws: Array<PropagatingVgw | null>,
        routes: Array<Route | null>,
        tags: Array<Tag | null>,
        owner_id?: string | null,
        route_table_id?: string | null,
        vpc_id?: string | null
      }) {
        this.associations = associations;
        this.propagating_vgws = propagating_vgws;
        this.routes = routes;
        this.tags = tags;
        this.owner_id = owner_id;
        this.route_table_id = route_table_id;
        this.vpc_id = vpc_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['associations'] = this.associations;
        ih['propagating_vgws'] = this.propagating_vgws;
        ih['routes'] = this.routes;
        ih['tags'] = this.tags;
        if(this.owner_id !== null)
          ih['owner_id'] = this.owner_id;
        if(this.route_table_id !== null)
          ih['route_table_id'] = this.route_table_id;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::RouteTable';
      }
    }

    export class RouteTableAssociation implements PcoreValue {
      readonly main: boolean | null;
      readonly route_table_association_id: string | null;
      readonly route_table_id: string | null;
      readonly subnet_id: string | null;

      constructor({
        main = null,
        route_table_association_id = null,
        route_table_id = null,
        subnet_id = null
      }: {
        main?: boolean | null,
        route_table_association_id?: string | null,
        route_table_id?: string | null,
        subnet_id?: string | null
      }) {
        this.main = main;
        this.route_table_association_id = route_table_association_id;
        this.route_table_id = route_table_id;
        this.subnet_id = subnet_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.main !== null)
          ih['main'] = this.main;
        if(this.route_table_association_id !== null)
          ih['route_table_association_id'] = this.route_table_association_id;
        if(this.route_table_id !== null)
          ih['route_table_id'] = this.route_table_id;
        if(this.subnet_id !== null)
          ih['subnet_id'] = this.subnet_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::RouteTableAssociation';
      }
    }

    export class SecurityGroup implements PcoreValue {
      readonly ip_permissions: Array<IpPermission | null>;
      readonly ip_permissions_egress: Array<IpPermission | null>;
      readonly tags: Array<Tag | null>;
      readonly description: string | null;
      readonly group_id: string | null;
      readonly group_name: string | null;
      readonly owner_id: string | null;
      readonly vpc_id: string | null;

      constructor({
        ip_permissions,
        ip_permissions_egress,
        tags,
        description = null,
        group_id = null,
        group_name = null,
        owner_id = null,
        vpc_id = null
      }: {
        ip_permissions: Array<IpPermission | null>,
        ip_permissions_egress: Array<IpPermission | null>,
        tags: Array<Tag | null>,
        description?: string | null,
        group_id?: string | null,
        group_name?: string | null,
        owner_id?: string | null,
        vpc_id?: string | null
      }) {
        this.ip_permissions = ip_permissions;
        this.ip_permissions_egress = ip_permissions_egress;
        this.tags = tags;
        this.description = description;
        this.group_id = group_id;
        this.group_name = group_name;
        this.owner_id = owner_id;
        this.vpc_id = vpc_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['ip_permissions'] = this.ip_permissions;
        ih['ip_permissions_egress'] = this.ip_permissions_egress;
        ih['tags'] = this.tags;
        if(this.description !== null)
          ih['description'] = this.description;
        if(this.group_id !== null)
          ih['group_id'] = this.group_id;
        if(this.group_name !== null)
          ih['group_name'] = this.group_name;
        if(this.owner_id !== null)
          ih['owner_id'] = this.owner_id;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::SecurityGroup';
      }
    }

    export class StateReason implements PcoreValue {
      readonly code: string | null;
      readonly message: string | null;

      constructor({
        code = null,
        message = null
      }: {
        code?: string | null,
        message?: string | null
      }) {
        this.code = code;
        this.message = message;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.code !== null)
          ih['code'] = this.code;
        if(this.message !== null)
          ih['message'] = this.message;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::StateReason';
      }
    }

    export class Subnet implements PcoreValue {
      readonly ipv6_cidr_block_association_set: Array<SubnetIpv6CidrBlockAssociation | null>;
      readonly tags: Array<Tag | null>;
      readonly assign_ipv6_address_on_creation: boolean | null;
      readonly availability_zone: string | null;
      readonly availability_zone_id: string | null;
      readonly available_ip_address_count: number | null;
      readonly cidr_block: string | null;
      readonly default_for_az: boolean | null;
      readonly map_public_ip_on_launch: boolean | null;
      readonly owner_id: string | null;
      readonly state: string | null;
      readonly subnet_arn: string | null;
      readonly subnet_id: string | null;
      readonly vpc_id: string | null;

      constructor({
        ipv6_cidr_block_association_set,
        tags,
        assign_ipv6_address_on_creation = null,
        availability_zone = null,
        availability_zone_id = null,
        available_ip_address_count = null,
        cidr_block = null,
        default_for_az = null,
        map_public_ip_on_launch = null,
        owner_id = null,
        state = null,
        subnet_arn = null,
        subnet_id = null,
        vpc_id = null
      }: {
        ipv6_cidr_block_association_set: Array<SubnetIpv6CidrBlockAssociation | null>,
        tags: Array<Tag | null>,
        assign_ipv6_address_on_creation?: boolean | null,
        availability_zone?: string | null,
        availability_zone_id?: string | null,
        available_ip_address_count?: number | null,
        cidr_block?: string | null,
        default_for_az?: boolean | null,
        map_public_ip_on_launch?: boolean | null,
        owner_id?: string | null,
        state?: string | null,
        subnet_arn?: string | null,
        subnet_id?: string | null,
        vpc_id?: string | null
      }) {
        this.ipv6_cidr_block_association_set = ipv6_cidr_block_association_set;
        this.tags = tags;
        this.assign_ipv6_address_on_creation = assign_ipv6_address_on_creation;
        this.availability_zone = availability_zone;
        this.availability_zone_id = availability_zone_id;
        this.available_ip_address_count = available_ip_address_count;
        this.cidr_block = cidr_block;
        this.default_for_az = default_for_az;
        this.map_public_ip_on_launch = map_public_ip_on_launch;
        this.owner_id = owner_id;
        this.state = state;
        this.subnet_arn = subnet_arn;
        this.subnet_id = subnet_id;
        this.vpc_id = vpc_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['ipv6_cidr_block_association_set'] = this.ipv6_cidr_block_association_set;
        ih['tags'] = this.tags;
        if(this.assign_ipv6_address_on_creation !== null)
          ih['assign_ipv6_address_on_creation'] = this.assign_ipv6_address_on_creation;
        if(this.availability_zone !== null)
          ih['availability_zone'] = this.availability_zone;
        if(this.availability_zone_id !== null)
          ih['availability_zone_id'] = this.availability_zone_id;
        if(this.available_ip_address_count !== null)
          ih['available_ip_address_count'] = this.available_ip_address_count;
        if(this.cidr_block !== null)
          ih['cidr_block'] = this.cidr_block;
        if(this.default_for_az !== null)
          ih['default_for_az'] = this.default_for_az;
        if(this.map_public_ip_on_launch !== null)
          ih['map_public_ip_on_launch'] = this.map_public_ip_on_launch;
        if(this.owner_id !== null)
          ih['owner_id'] = this.owner_id;
        if(this.state !== null)
          ih['state'] = this.state;
        if(this.subnet_arn !== null)
          ih['subnet_arn'] = this.subnet_arn;
        if(this.subnet_id !== null)
          ih['subnet_id'] = this.subnet_id;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Subnet';
      }
    }

    export class SubnetCidrBlockState implements PcoreValue {
      readonly state: string | null;
      readonly status_message: string | null;

      constructor({
        state = null,
        status_message = null
      }: {
        state?: string | null,
        status_message?: string | null
      }) {
        this.state = state;
        this.status_message = status_message;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.state !== null)
          ih['state'] = this.state;
        if(this.status_message !== null)
          ih['status_message'] = this.status_message;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::SubnetCidrBlockState';
      }
    }

    export class SubnetIpv6CidrBlockAssociation implements PcoreValue {
      readonly association_id: string | null;
      readonly ipv6_cidr_block: string | null;
      readonly ipv6_cidr_block_state: SubnetCidrBlockState | null;

      constructor({
        association_id = null,
        ipv6_cidr_block = null,
        ipv6_cidr_block_state = null
      }: {
        association_id?: string | null,
        ipv6_cidr_block?: string | null,
        ipv6_cidr_block_state?: SubnetCidrBlockState | null
      }) {
        this.association_id = association_id;
        this.ipv6_cidr_block = ipv6_cidr_block;
        this.ipv6_cidr_block_state = ipv6_cidr_block_state;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.association_id !== null)
          ih['association_id'] = this.association_id;
        if(this.ipv6_cidr_block !== null)
          ih['ipv6_cidr_block'] = this.ipv6_cidr_block;
        if(this.ipv6_cidr_block_state !== null)
          ih['ipv6_cidr_block_state'] = this.ipv6_cidr_block_state;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::SubnetIpv6CidrBlockAssociation';
      }
    }

    export class Tag implements PcoreValue {
      readonly key: string | null;
      readonly value: string | null;

      constructor({
        key = null,
        value = null
      }: {
        key?: string | null,
        value?: string | null
      }) {
        this.key = key;
        this.value = value;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.key !== null)
          ih['key'] = this.key;
        if(this.value !== null)
          ih['value'] = this.value;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Tag';
      }
    }

    export class UserIdGroupPair implements PcoreValue {
      readonly description: string | null;
      readonly group_id: string | null;
      readonly group_name: string | null;
      readonly peering_status: string | null;
      readonly user_id: string | null;
      readonly vpc_id: string | null;
      readonly vpc_peering_connection_id: string | null;

      constructor({
        description = null,
        group_id = null,
        group_name = null,
        peering_status = null,
        user_id = null,
        vpc_id = null,
        vpc_peering_connection_id = null
      }: {
        description?: string | null,
        group_id?: string | null,
        group_name?: string | null,
        peering_status?: string | null,
        user_id?: string | null,
        vpc_id?: string | null,
        vpc_peering_connection_id?: string | null
      }) {
        this.description = description;
        this.group_id = group_id;
        this.group_name = group_name;
        this.peering_status = peering_status;
        this.user_id = user_id;
        this.vpc_id = vpc_id;
        this.vpc_peering_connection_id = vpc_peering_connection_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.description !== null)
          ih['description'] = this.description;
        if(this.group_id !== null)
          ih['group_id'] = this.group_id;
        if(this.group_name !== null)
          ih['group_name'] = this.group_name;
        if(this.peering_status !== null)
          ih['peering_status'] = this.peering_status;
        if(this.user_id !== null)
          ih['user_id'] = this.user_id;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        if(this.vpc_peering_connection_id !== null)
          ih['vpc_peering_connection_id'] = this.vpc_peering_connection_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::UserIdGroupPair';
      }
    }

    export class Vpc implements PcoreValue {
      readonly cidr_block_association_set: Array<VpcCidrBlockAssociation | null>;
      readonly ipv6_cidr_block_association_set: Array<VpcIpv6CidrBlockAssociation | null>;
      readonly tags: Array<Tag | null>;
      readonly cidr_block: string | null;
      readonly dhcp_options_id: string | null;
      readonly instance_tenancy: string | null;
      readonly is_default: boolean | null;
      readonly owner_id: string | null;
      readonly state: string | null;
      readonly vpc_id: string | null;

      constructor({
        cidr_block_association_set,
        ipv6_cidr_block_association_set,
        tags,
        cidr_block = null,
        dhcp_options_id = null,
        instance_tenancy = null,
        is_default = null,
        owner_id = null,
        state = null,
        vpc_id = null
      }: {
        cidr_block_association_set: Array<VpcCidrBlockAssociation | null>,
        ipv6_cidr_block_association_set: Array<VpcIpv6CidrBlockAssociation | null>,
        tags: Array<Tag | null>,
        cidr_block?: string | null,
        dhcp_options_id?: string | null,
        instance_tenancy?: string | null,
        is_default?: boolean | null,
        owner_id?: string | null,
        state?: string | null,
        vpc_id?: string | null
      }) {
        this.cidr_block_association_set = cidr_block_association_set;
        this.ipv6_cidr_block_association_set = ipv6_cidr_block_association_set;
        this.tags = tags;
        this.cidr_block = cidr_block;
        this.dhcp_options_id = dhcp_options_id;
        this.instance_tenancy = instance_tenancy;
        this.is_default = is_default;
        this.owner_id = owner_id;
        this.state = state;
        this.vpc_id = vpc_id;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        ih['cidr_block_association_set'] = this.cidr_block_association_set;
        ih['ipv6_cidr_block_association_set'] = this.ipv6_cidr_block_association_set;
        ih['tags'] = this.tags;
        if(this.cidr_block !== null)
          ih['cidr_block'] = this.cidr_block;
        if(this.dhcp_options_id !== null)
          ih['dhcp_options_id'] = this.dhcp_options_id;
        if(this.instance_tenancy !== null)
          ih['instance_tenancy'] = this.instance_tenancy;
        if(this.is_default !== null)
          ih['is_default'] = this.is_default;
        if(this.owner_id !== null)
          ih['owner_id'] = this.owner_id;
        if(this.state !== null)
          ih['state'] = this.state;
        if(this.vpc_id !== null)
          ih['vpc_id'] = this.vpc_id;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::Vpc';
      }
    }

    export class VpcCidrBlockAssociation implements PcoreValue {
      readonly association_id: string | null;
      readonly cidr_block: string | null;
      readonly cidr_block_state: VpcCidrBlockState | null;

      constructor({
        association_id = null,
        cidr_block = null,
        cidr_block_state = null
      }: {
        association_id?: string | null,
        cidr_block?: string | null,
        cidr_block_state?: VpcCidrBlockState | null
      }) {
        this.association_id = association_id;
        this.cidr_block = cidr_block;
        this.cidr_block_state = cidr_block_state;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.association_id !== null)
          ih['association_id'] = this.association_id;
        if(this.cidr_block !== null)
          ih['cidr_block'] = this.cidr_block;
        if(this.cidr_block_state !== null)
          ih['cidr_block_state'] = this.cidr_block_state;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::VpcCidrBlockAssociation';
      }
    }

    export class VpcCidrBlockState implements PcoreValue {
      readonly state: string | null;
      readonly status_message: string | null;

      constructor({
        state = null,
        status_message = null
      }: {
        state?: string | null,
        status_message?: string | null
      }) {
        this.state = state;
        this.status_message = status_message;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.state !== null)
          ih['state'] = this.state;
        if(this.status_message !== null)
          ih['status_message'] = this.status_message;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::VpcCidrBlockState';
      }
    }

    export class VpcIpv6CidrBlockAssociation implements PcoreValue {
      readonly association_id: string | null;
      readonly ipv6_cidr_block: string | null;
      readonly ipv6_cidr_block_state: VpcCidrBlockState | null;

      constructor({
        association_id = null,
        ipv6_cidr_block = null,
        ipv6_cidr_block_state = null
      }: {
        association_id?: string | null,
        ipv6_cidr_block?: string | null,
        ipv6_cidr_block_state?: VpcCidrBlockState | null
      }) {
        this.association_id = association_id;
        this.ipv6_cidr_block = ipv6_cidr_block;
        this.ipv6_cidr_block_state = ipv6_cidr_block_state;
      }

      __pvalue() : {[s: string]: any} {
        let ih: {[s: string]: any} = {};
        if(this.association_id !== null)
          ih['association_id'] = this.association_id;
        if(this.ipv6_cidr_block !== null)
          ih['ipv6_cidr_block'] = this.ipv6_cidr_block;
        if(this.ipv6_cidr_block_state !== null)
          ih['ipv6_cidr_block_state'] = this.ipv6_cidr_block_state;
        return ih;
      }

      __ptype() : string {
        return 'Aws::Native::VpcIpv6CidrBlockAssociation';
      }
    }
  }


  export class NativeInstanceHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::NativeInstanceHandler';
    }
  }

  export class NativeInternetGatewayHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::NativeInternetGatewayHandler';
    }
  }

  export class NativeRouteTableHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::NativeRouteTableHandler';
    }
  }

  export class NativeSecurityGroupHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::NativeSecurityGroupHandler';
    }
  }

  export class NativeSubnetHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::NativeSubnetHandler';
    }
  }

  export class NativeVpcHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::NativeVpcHandler';
    }
  }

  export class Placement implements PcoreValue {
    readonly affinity: string;
    readonly availability_zone: string;
    readonly group_name: string;
    readonly host_id: string;
    readonly spread_domain: string;
    readonly tenancy: string;

    constructor({
      affinity = '',
      availability_zone = '',
      group_name = '',
      host_id = '',
      spread_domain = '',
      tenancy = ''
    }: {
      affinity?: string,
      availability_zone?: string,
      group_name?: string,
      host_id?: string,
      spread_domain?: string,
      tenancy?: string
    }) {
      this.affinity = affinity;
      this.availability_zone = availability_zone;
      this.group_name = group_name;
      this.host_id = host_id;
      this.spread_domain = spread_domain;
      this.tenancy = tenancy;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.affinity !== '')
        ih['affinity'] = this.affinity;
      if(this.availability_zone !== '')
        ih['availability_zone'] = this.availability_zone;
      if(this.group_name !== '')
        ih['group_name'] = this.group_name;
      if(this.host_id !== '')
        ih['host_id'] = this.host_id;
      if(this.spread_domain !== '')
        ih['spread_domain'] = this.spread_domain;
      if(this.tenancy !== '')
        ih['tenancy'] = this.tenancy;
      return ih;
    }

    __ptype() : string {
      return 'Aws::Placement';
    }
  }

  export class PrefixListId implements PcoreValue {
    readonly description: string;
    readonly prefix_list_id: string;

    constructor({
      description = '',
      prefix_list_id = ''
    }: {
      description?: string,
      prefix_list_id?: string
    }) {
      this.description = description;
      this.prefix_list_id = prefix_list_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.description !== '')
        ih['description'] = this.description;
      if(this.prefix_list_id !== '')
        ih['prefix_list_id'] = this.prefix_list_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::PrefixListId';
    }
  }

  export class ProductCode implements PcoreValue {
    readonly product_code_id: string;
    readonly product_code_type: string;

    constructor({
      product_code_id = '',
      product_code_type = ''
    }: {
      product_code_id?: string,
      product_code_type?: string
    }) {
      this.product_code_id = product_code_id;
      this.product_code_type = product_code_type;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.product_code_id !== '')
        ih['product_code_id'] = this.product_code_id;
      if(this.product_code_type !== '')
        ih['product_code_type'] = this.product_code_type;
      return ih;
    }

    __ptype() : string {
      return 'Aws::ProductCode';
    }
  }

  export class PropagatingVgw implements PcoreValue {
    readonly gateway_id: string;

    constructor({
      gateway_id
    }: {
      gateway_id: string
    }) {
      this.gateway_id = gateway_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['gateway_id'] = this.gateway_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::PropagatingVgw';
    }
  }

  export class RoleHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::RoleHandler';
    }
  }

  export class Route implements PcoreValue {
    readonly tags: {[s: string]: string};
    readonly destination_cidr_block: string;
    readonly destination_ipv6_cidr_block: string;
    readonly destination_prefix_list_id: string;
    readonly egress_only_internet_gateway_id: string;
    readonly gateway_id: string;
    readonly instance_id: string;
    readonly instance_owner_id: string;
    readonly nat_gateway_id: string;
    readonly network_interface_id: string;
    readonly origin: string;
    readonly state: string;
    readonly vpc_peering_connection_id: string;

    constructor({
      tags,
      destination_cidr_block = '',
      destination_ipv6_cidr_block = '',
      destination_prefix_list_id = '',
      egress_only_internet_gateway_id = '',
      gateway_id = '',
      instance_id = '',
      instance_owner_id = '',
      nat_gateway_id = '',
      network_interface_id = '',
      origin = '',
      state = '',
      vpc_peering_connection_id = ''
    }: {
      tags: {[s: string]: string},
      destination_cidr_block?: string,
      destination_ipv6_cidr_block?: string,
      destination_prefix_list_id?: string,
      egress_only_internet_gateway_id?: string,
      gateway_id?: string,
      instance_id?: string,
      instance_owner_id?: string,
      nat_gateway_id?: string,
      network_interface_id?: string,
      origin?: string,
      state?: string,
      vpc_peering_connection_id?: string
    }) {
      this.tags = tags;
      this.destination_cidr_block = destination_cidr_block;
      this.destination_ipv6_cidr_block = destination_ipv6_cidr_block;
      this.destination_prefix_list_id = destination_prefix_list_id;
      this.egress_only_internet_gateway_id = egress_only_internet_gateway_id;
      this.gateway_id = gateway_id;
      this.instance_id = instance_id;
      this.instance_owner_id = instance_owner_id;
      this.nat_gateway_id = nat_gateway_id;
      this.network_interface_id = network_interface_id;
      this.origin = origin;
      this.state = state;
      this.vpc_peering_connection_id = vpc_peering_connection_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['tags'] = this.tags;
      if(this.destination_cidr_block !== '')
        ih['destination_cidr_block'] = this.destination_cidr_block;
      if(this.destination_ipv6_cidr_block !== '')
        ih['destination_ipv6_cidr_block'] = this.destination_ipv6_cidr_block;
      if(this.destination_prefix_list_id !== '')
        ih['destination_prefix_list_id'] = this.destination_prefix_list_id;
      if(this.egress_only_internet_gateway_id !== '')
        ih['egress_only_internet_gateway_id'] = this.egress_only_internet_gateway_id;
      if(this.gateway_id !== '')
        ih['gateway_id'] = this.gateway_id;
      if(this.instance_id !== '')
        ih['instance_id'] = this.instance_id;
      if(this.instance_owner_id !== '')
        ih['instance_owner_id'] = this.instance_owner_id;
      if(this.nat_gateway_id !== '')
        ih['nat_gateway_id'] = this.nat_gateway_id;
      if(this.network_interface_id !== '')
        ih['network_interface_id'] = this.network_interface_id;
      if(this.origin !== '')
        ih['origin'] = this.origin;
      if(this.state !== '')
        ih['state'] = this.state;
      if(this.vpc_peering_connection_id !== '')
        ih['vpc_peering_connection_id'] = this.vpc_peering_connection_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::Route';
    }
  }

  export class RouteTable implements PcoreValue {
    readonly vpc_id: string;
    readonly tags: {[s: string]: string};
    readonly route_table_id: string | null;
    readonly subnet_id: string | null;
    readonly routes: Array<Route>;
    readonly associations: Array<RouteTableAssociation>;
    readonly propagating_vgws: Array<PropagatingVgw>;

    constructor({
      vpc_id,
      tags,
      route_table_id = null,
      subnet_id = null,
      routes = [],
      associations = [],
      propagating_vgws = []
    }: {
      vpc_id: string,
      tags: {[s: string]: string},
      route_table_id?: string | null,
      subnet_id?: string | null,
      routes?: Array<Route>,
      associations?: Array<RouteTableAssociation>,
      propagating_vgws?: Array<PropagatingVgw>
    }) {
      this.vpc_id = vpc_id;
      this.tags = tags;
      this.route_table_id = route_table_id;
      this.subnet_id = subnet_id;
      this.routes = routes;
      this.associations = associations;
      this.propagating_vgws = propagating_vgws;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['vpc_id'] = this.vpc_id;
      ih['tags'] = this.tags;
      if(this.route_table_id !== null)
        ih['route_table_id'] = this.route_table_id;
      if(this.subnet_id !== null)
        ih['subnet_id'] = this.subnet_id;
      if(this.routes !== [])
        ih['routes'] = this.routes;
      if(this.associations !== [])
        ih['associations'] = this.associations;
      if(this.propagating_vgws !== [])
        ih['propagating_vgws'] = this.propagating_vgws;
      return ih;
    }

    __ptype() : string {
      return 'Aws::RouteTable';
    }
  }

  export class RouteTableAssociation implements PcoreValue {
    readonly main: boolean;
    readonly route_table_id: string;
    readonly subnet_id: string;
    readonly route_table_association_id: string | null;

    constructor({
      main,
      route_table_id,
      subnet_id,
      route_table_association_id = null
    }: {
      main: boolean,
      route_table_id: string,
      subnet_id: string,
      route_table_association_id?: string | null
    }) {
      this.main = main;
      this.route_table_id = route_table_id;
      this.subnet_id = subnet_id;
      this.route_table_association_id = route_table_association_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['main'] = this.main;
      ih['route_table_id'] = this.route_table_id;
      ih['subnet_id'] = this.subnet_id;
      if(this.route_table_association_id !== null)
        ih['route_table_association_id'] = this.route_table_association_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::RouteTableAssociation';
    }
  }

  export class RouteTableHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::RouteTableHandler';
    }
  }

  export class SecurityGroup implements PcoreValue {
    readonly description: string;
    readonly group_name: string;
    readonly vpc_id: string;
    readonly group_id: string;
    readonly ip_permissions: Array<IpPermission>;
    readonly ip_permissions_egress: Array<IpPermission>;
    readonly owner_id: string;
    readonly tags: {[s: string]: string} | null;

    constructor({
      description,
      group_name,
      vpc_id = '',
      group_id = '',
      ip_permissions = [],
      ip_permissions_egress = [],
      owner_id = '',
      tags
    }: {
      description: string,
      group_name: string,
      vpc_id?: string,
      group_id?: string,
      ip_permissions?: Array<IpPermission>,
      ip_permissions_egress?: Array<IpPermission>,
      owner_id?: string,
      tags: {[s: string]: string} | null
    }) {
      this.description = description;
      this.group_name = group_name;
      this.vpc_id = vpc_id;
      this.group_id = group_id;
      this.ip_permissions = ip_permissions;
      this.ip_permissions_egress = ip_permissions_egress;
      this.owner_id = owner_id;
      this.tags = tags;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['description'] = this.description;
      ih['group_name'] = this.group_name;
      if(this.vpc_id !== '')
        ih['vpc_id'] = this.vpc_id;
      if(this.group_id !== '')
        ih['group_id'] = this.group_id;
      if(this.ip_permissions !== [])
        ih['ip_permissions'] = this.ip_permissions;
      if(this.ip_permissions_egress !== [])
        ih['ip_permissions_egress'] = this.ip_permissions_egress;
      if(this.owner_id !== '')
        ih['owner_id'] = this.owner_id;
      ih['tags'] = this.tags;
      return ih;
    }

    __ptype() : string {
      return 'Aws::SecurityGroup';
    }
  }

  export class SecurityGroupHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::SecurityGroupHandler';
    }
  }

  export class StateReason implements PcoreValue {
    readonly code: string;
    readonly message: string;

    constructor({
      code = '',
      message = ''
    }: {
      code?: string,
      message?: string
    }) {
      this.code = code;
      this.message = message;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.code !== '')
        ih['code'] = this.code;
      if(this.message !== '')
        ih['message'] = this.message;
      return ih;
    }

    __ptype() : string {
      return 'Aws::StateReason';
    }
  }

  export class Subnet implements PcoreValue {
    readonly vpc_id: string;
    readonly cidr_block: string;
    readonly ipv6_cidr_block: string;
    readonly tags: {[s: string]: string};
    readonly assign_ipv6_address_on_creation: boolean;
    readonly map_public_ip_on_launch: boolean;
    readonly default_for_az: boolean;
    readonly state: string;
    readonly availability_zone: string | null;
    readonly available_ip_address_count: number | null;
    readonly subnet_id: string | null;

    constructor({
      vpc_id,
      cidr_block,
      ipv6_cidr_block,
      tags,
      assign_ipv6_address_on_creation,
      map_public_ip_on_launch,
      default_for_az,
      state,
      availability_zone = null,
      available_ip_address_count = null,
      subnet_id = null
    }: {
      vpc_id: string,
      cidr_block: string,
      ipv6_cidr_block: string,
      tags: {[s: string]: string},
      assign_ipv6_address_on_creation: boolean,
      map_public_ip_on_launch: boolean,
      default_for_az: boolean,
      state: string,
      availability_zone?: string | null,
      available_ip_address_count?: number | null,
      subnet_id?: string | null
    }) {
      this.vpc_id = vpc_id;
      this.cidr_block = cidr_block;
      this.ipv6_cidr_block = ipv6_cidr_block;
      this.tags = tags;
      this.assign_ipv6_address_on_creation = assign_ipv6_address_on_creation;
      this.map_public_ip_on_launch = map_public_ip_on_launch;
      this.default_for_az = default_for_az;
      this.state = state;
      this.availability_zone = availability_zone;
      this.available_ip_address_count = available_ip_address_count;
      this.subnet_id = subnet_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['vpc_id'] = this.vpc_id;
      ih['cidr_block'] = this.cidr_block;
      ih['ipv6_cidr_block'] = this.ipv6_cidr_block;
      ih['tags'] = this.tags;
      ih['assign_ipv6_address_on_creation'] = this.assign_ipv6_address_on_creation;
      ih['map_public_ip_on_launch'] = this.map_public_ip_on_launch;
      ih['default_for_az'] = this.default_for_az;
      ih['state'] = this.state;
      if(this.availability_zone !== null)
        ih['availability_zone'] = this.availability_zone;
      if(this.available_ip_address_count !== null)
        ih['available_ip_address_count'] = this.available_ip_address_count;
      if(this.subnet_id !== null)
        ih['subnet_id'] = this.subnet_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::Subnet';
    }
  }

  export class SubnetHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::SubnetHandler';
    }
  }

  export class UserIdGroupPair implements PcoreValue {
    readonly description: string;
    readonly group_id: string;
    readonly group_name: string;
    readonly peering_status: string;
    readonly user_id: string;
    readonly vpc_id: string;
    readonly vpc_peering_connection_id: string;

    constructor({
      description = '',
      group_id = '',
      group_name = '',
      peering_status = '',
      user_id = '',
      vpc_id = '',
      vpc_peering_connection_id = ''
    }: {
      description?: string,
      group_id?: string,
      group_name?: string,
      peering_status?: string,
      user_id?: string,
      vpc_id?: string,
      vpc_peering_connection_id?: string
    }) {
      this.description = description;
      this.group_id = group_id;
      this.group_name = group_name;
      this.peering_status = peering_status;
      this.user_id = user_id;
      this.vpc_id = vpc_id;
      this.vpc_peering_connection_id = vpc_peering_connection_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      if(this.description !== '')
        ih['description'] = this.description;
      if(this.group_id !== '')
        ih['group_id'] = this.group_id;
      if(this.group_name !== '')
        ih['group_name'] = this.group_name;
      if(this.peering_status !== '')
        ih['peering_status'] = this.peering_status;
      if(this.user_id !== '')
        ih['user_id'] = this.user_id;
      if(this.vpc_id !== '')
        ih['vpc_id'] = this.vpc_id;
      if(this.vpc_peering_connection_id !== '')
        ih['vpc_peering_connection_id'] = this.vpc_peering_connection_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::UserIdGroupPair';
    }
  }

  export class VPCHandler implements PcoreValue {

    __pvalue() : {[s: string]: any} {
      return {};
    }

    __ptype() : string {
      return 'Aws::VPCHandler';
    }
  }

  export class Vpc implements PcoreValue {
    readonly amazon_provided_ipv6_cidr_block: boolean;
    readonly cidr_block: string;
    readonly enable_dns_hostnames: boolean;
    readonly enable_dns_support: boolean;
    readonly tags: {[s: string]: string};
    readonly is_default: boolean;
    readonly state: string;
    readonly instance_tenancy: string | null;
    readonly vpc_id: string | null;
    readonly dhcp_options_id: string | null;

    constructor({
      amazon_provided_ipv6_cidr_block,
      cidr_block,
      enable_dns_hostnames,
      enable_dns_support,
      tags,
      is_default,
      state,
      instance_tenancy = 'default',
      vpc_id = null,
      dhcp_options_id = null
    }: {
      amazon_provided_ipv6_cidr_block: boolean,
      cidr_block: string,
      enable_dns_hostnames: boolean,
      enable_dns_support: boolean,
      tags: {[s: string]: string},
      is_default: boolean,
      state: string,
      instance_tenancy?: string | null,
      vpc_id?: string | null,
      dhcp_options_id?: string | null
    }) {
      this.amazon_provided_ipv6_cidr_block = amazon_provided_ipv6_cidr_block;
      this.cidr_block = cidr_block;
      this.enable_dns_hostnames = enable_dns_hostnames;
      this.enable_dns_support = enable_dns_support;
      this.tags = tags;
      this.is_default = is_default;
      this.state = state;
      this.instance_tenancy = instance_tenancy;
      this.vpc_id = vpc_id;
      this.dhcp_options_id = dhcp_options_id;
    }

    __pvalue() : {[s: string]: any} {
      let ih: {[s: string]: any} = {};
      ih['amazon_provided_ipv6_cidr_block'] = this.amazon_provided_ipv6_cidr_block;
      ih['cidr_block'] = this.cidr_block;
      ih['enable_dns_hostnames'] = this.enable_dns_hostnames;
      ih['enable_dns_support'] = this.enable_dns_support;
      ih['tags'] = this.tags;
      ih['is_default'] = this.is_default;
      ih['state'] = this.state;
      if(this.instance_tenancy !== 'default')
        ih['instance_tenancy'] = this.instance_tenancy;
      if(this.vpc_id !== null)
        ih['vpc_id'] = this.vpc_id;
      if(this.dhcp_options_id !== null)
        ih['dhcp_options_id'] = this.dhcp_options_id;
      return ih;
    }

    __ptype() : string {
      return 'Aws::Vpc';
    }
  }
}
