// next.config.js
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
module.exports = withFonts(
  withCSS({
    webpack(config, options) {
      return config;
    },
    env: {
      GOOGLE_MAP_KEY: "AIzaSyAxvSN_Omt9E7dIHC0-arAWIonzhuHrDl8"
    },
    exportTrailingSlash: true
  })
);
