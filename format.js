const { readFileSync, writeFileSync } = require("fs");
const { format } = require("prettier");

for (const filename of process.argv.slice(2)) {
  const source = readFileSync(filename, "utf-8");
  writeFileSync(
    filename,
    format(source, {
      parser: "babel"
    })
  );
}
