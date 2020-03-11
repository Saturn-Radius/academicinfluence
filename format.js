// This file exists because the [ and ] in our filenames cause confusion
// between lint-staged and prettier
// see: https://github.com/okonet/lint-staged/issues/676
// So we call into the prettier api ourselves
const { readFileSync, writeFileSync } = require("fs");
const { format } = require("prettier");

for (const filename of process.argv.slice(2)) {
  const source = readFileSync(filename, "utf-8");
  writeFileSync(
    filename,
    format(source, {
      parser: "typescript"
    })
  );
}
