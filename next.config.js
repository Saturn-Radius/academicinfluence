// next.config.js
require("./load-config");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = withFonts(
  withCSS({
    webpack(config, options) {
      config.plugins.push(new CompressionPlugin());
      return config;
    },
    env: {
      GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY
    },
    exportTrailingSlash: true
  })
);
