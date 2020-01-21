import { camelCase } from "change-case";
import { mkdirSync, writeFileSync } from "fs";
import { compile } from "json-schema-to-typescript";
const SCHEMAS = require("./schema");

async function main() {
  let content = "";
  for (const [key, item] of Object.entries(SCHEMAS.SCHEMAS)) {
    const def = item as any;
    content += await compile(def.request, key + "Request");
    content += await compile(def.response, key + "Response");

    content += `export const api${key} = process.browser ? 
        async function(request: ${key}Request): Promise<${key}Response> {
            const response = await fetch("/api/${key}/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: ${key}Request): Promise<${key}Response> {
            const module = await import("./service/${camelCase(key)}");
            return module.default(request)
        }
        `;
    mkdirSync("./pages/api/" + key, { recursive: true });
    writeFileSync(
      "./pages/api/" + key + "/[request].ts",
      `
    // GENERATED FILE DO NOT EDIT

import { NextApiRequest, NextApiResponse } from "next";
import SCHEMAS from "../../../schema"
import Ajv from "ajv"
import serve from "../../../service/${camelCase(key)}"

const validator = new Ajv();
const validate = validator.compile(SCHEMAS.${key}.request)


export default async (req: NextApiRequest, response: NextApiResponse) => {
    try {
        const request = JSON.parse(req.query.request as string)
        if (!validate(request)) {
            response.status(400).send('')
        } else {
            const data = await serve(request);
            response.status(200).json(data)
        }
    } catch (error) {
        console.error(error)
        response.status(500)
    }
}
    `
    );
  }
  writeFileSync("api.ts", content);
}

main();
