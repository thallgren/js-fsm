import {Definition, isActivityMap, ServiceBuilder} from "./builder";
import {transpileManifest} from "../pcore/TypeTransformer";
import {readFileSync} from "fs";
import * as fs from "fs";
import * as url from "url";
import * as sr from "source-map-resolve";
import * as requireFromString from "require-from-string";
import {basename} from "path";
import {ManifestService} from "./ManifestService";
import {Service} from "./Service";

export class ManifestLoader {
  private readonly service : Service;

  constructor(service : Service) {
    this.service = service;
  }

  loadManifest(fileName : string) : Definition {
    let src = readFileSync(fileName, { encoding : 'UTF-8'});
    if(src === null)
      throw new Error("unable to read file '${fileName}'");

    // Load the module and ensure that it exports an ActivityMap
    let ex = requireFromString(src, fileName);
    if(!isActivityMap(ex))
      throw new Error("file '${fileName}' does not export an ActivityMap");

    let sm = sr.resolveSourceMapSync(src, fileName, fs.readFileSync);
    console.log(url.resolve(sm.sourcesRelativeTo, sm.map.sources[0]));
    let tr = transpileManifest([url.resolve(sm.sourcesRelativeTo, sm.map.sources[0])]);

    let mf = ManifestLoader.munge(fileName);
    let sb = new ServiceBuilder(mf);
    sb.fromMap(basename(fileName, '.js'), ex, tr.inferredTypes);
    this.service.callables[mf] = new ManifestService(sb);
    return sb.definitions[0];
  }

  private static munge(path : string) : string {
    let b = '';
    let pu = true;
    let ps = true;
    let top = path.length;
    for(let idx = 0; idx < top; ++idx) {
      let c = path.charAt(idx);
      if(c == '/') {
        if(!ps) {
          b += "::";
          ps = true;
        }
      } else if(c == '_' || c >= '0' && c <= '9' || c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z') {
        if(ps || pu) {
          c = c.toUpperCase();
        }
        b += c;
        ps = false;
        pu = false;
      } else {
        pu = true;
      }
    }
    if(ps)
      b = b.substring(0, b.length - 2);
    return b;
  }
}
