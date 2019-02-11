/// <reference types="jest" />

import {ManifestLoader} from "../src/servicesdk/ManifestLoader";

describe('ManifestLoader', () => {
  it('loads manifest', () => {
    let l = new ManifestLoader('My::Service');
    let d = l.loadManifest('dist/examples/vpc_with_subnet.js');
    console.log(d.toString());
  });
});