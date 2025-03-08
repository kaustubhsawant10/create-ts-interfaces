#!/usr/bin/env node

import mini from "minimist";
import {
  ValidateOutputFile,
  SanitizeFilepath,
  WriteFileSync,
} from "./utils/file.utils.js";
import { FetchSchema } from "./utils/http.utils.js";
import { GenerateInterfaces, ValidateUrl } from "./utils/helper.utils.js";

//extract the CLI args
const _argv = mini(process.argv.slice(2));

//extract swagger.json endpoint from CLI args
const SWAGGER_JSON_URL = _argv.url;
const OUTPUT_FILE = _argv["output-file"];

async function main() {
  try {
    //validate URL of swagger.json, exit if failed to validate URL
    if (!ValidateUrl(SWAGGER_JSON_URL)) return;

    //sanitize the input file path
    let sanitizedPath = SanitizeFilepath(OUTPUT_FILE);

    //exit if file path sanitization fails
    if (!sanitizedPath) return;

    //validate file path for access and availability, else return
    if (!ValidateOutputFile(sanitizedPath)) return;

    //fetch swagger.json file
    const _data = await FetchSchema(SWAGGER_JSON_URL);

    // Extract definitions
    const definitions = _data?.components?.schemas ?? undefined;

    let tsInterfaces = GenerateInterfaces(definitions);

    if (!tsInterfaces) return;

    WriteFileSync(sanitizedPath, tsInterfaces);
  } catch (error) {
    console.error(error);
  }
}

main();
