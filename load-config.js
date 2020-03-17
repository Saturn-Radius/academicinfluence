const { config } = require("dotenv");
const { readFileSync, writeFileSync } = require("fs");
const Blowfish = require("egoroof-blowfish");

// First of all, load the .env file
// This probably contains the secret key
config();

// Load and decrypt the secrets.enc file
const bf = new Blowfish(process.env.AI_SECRET_PASSWORD);
const encoded = bf.decode(readFileSync("secrets.enc"));

// Overwrite the secrets.plain file
writeFileSync("secrets.plain", encoded);

// Load the secrets.plain file which will contain
// the secrets now
config({ path: "secrets.plain" });
