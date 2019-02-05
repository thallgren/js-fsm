#!/usr/bin/env bash

mkdir -p dist/src/datapb
mkdir -p dist/src/servicepb

cp -a generated/datapb/*.js dist/src/datapb/
cp -a generated/servicepb/*.js dist/src/servicepb/
