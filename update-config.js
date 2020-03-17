const { config } = require("dotenv");
const { readFileSync, writeFileSync } = require("fs");
const Blowfish = require("egoroof-blowfish");

// First of all, load .env which probably contains the secret key
config();

// Load and encrypt the secrets.plain file
const bf = new Blowfish(process.env.AI_SECRET_PASSWORD);
const encoded = bf.encode(readFileSync("secrets.plain"));
// replace the encoded version with a new version
writeFileSync("secrets.enc", encoded);
