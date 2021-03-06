#!/usr/bin/env bash
# generate js codes via grpc-tools

PUPPET_PATH=${GOPATH}/src/github.com/puppetlabs
HASHICORP_PATH=${GOPATH}/src/github.com/hashicorp
PROTO_PATH=fsmpb/fsm.proto

`npm bin`/grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:generated \
--grpc_out=generated \
--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
-I ${PUPPET_PATH}/data-protobuf:${PUPPET_PATH}/go-fsm \
datapb/data.proto fsmpb/fsm.proto

# generate d.ts codes
protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
--ts_out=generated \
-I ${PUPPET_PATH}/data-protobuf:${PUPPET_PATH}/go-fsm \
datapb/data.proto fsmpb/fsm.proto
