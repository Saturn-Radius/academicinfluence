import { mkdirSync, writeFileSync } from "fs";
import { camelCase } from "lodash";
import { createGenerator } from "ts-json-schema-generator";

async function main() {
  let content = "// GENERATED.DO NOT EDIT\n";
  content += 'import Ajv from "ajv";\n';

  const schema = createGenerator({
    expose: "export",
    topRef: true,
    jsDoc: "none",
    path: "schema.ts",
    skipTypeCheck: true
  }).createSchema(undefined);

  const exports = Object.keys(schema.definitions as any);

  content += "import {" + exports.join(",") + "} from './schema'\n";

  for (const typekey of exports) {
    if (typekey.endsWith("Request")) {
      const key = typekey.slice(0, typekey.length - 7);
      console.log("API", key);
      content += `export const api${key} = process.browser ? 
        async function(request: ${key}Request): Promise<${key}Response> {
            const response = await fetch("/api/${key}/" + encodeURIComponent(JSON.stringify(request)));
            const data = await response.json()
            if (!validate("${key}Response", data)) {
              throw new Error("validation failed")
            }
            return data
        } : async function(request: ${key}Request): Promise<${key}Response> {
            const module = await import("./service/${camelCase(key)}");
            const response = await module.default(request)
            if (!validate("${key}Response", response)) {
              throw new Error("validation failed")
            }
            return response
        }
        `;

      mkdirSync("./pages/api/" + key, {
        recursive: true
      });
      writeFileSync(
        "./pages/api/" + key + "/[request].ts",
        `
    // GENERATED FILE DO NOT EDIT

import { NextApiRequest, NextApiResponse } from "next";
import {validate} from "../../../api"
import serve from "../../../service/${camelCase(key)}"

export default async (req: NextApiRequest, response: NextApiResponse) => {
    try {
        const request = JSON.parse(req.query.request as string)
        if (!validate("${typekey}", request)) {
            response.status(400).send('')
        } else {
            const data = await serve(request);
            if (data === null) {
              response.status(404)
            } else {
              response.status(200).json(data)
            }
        }
    } catch (error) {
        console.error(error)
        response.status(500)
    }
}
`
      );
    }
  }

  content += "const validator = new Ajv();\n";
  content += `validator.compile(${JSON.stringify(schema)});\n`;
  content += `
export function validate(name: string, data: any) {
  if (!validator.validate('#/definitions/' + name, data)) {
    console.error(validator.errors)
    return false;
  }
  return true;
}

`;

  writeFileSync("api.ts", content);
}

main();
