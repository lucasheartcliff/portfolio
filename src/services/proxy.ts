import { WAKATIME_LANGUAGES } from "../utils/url";

const proxy = require("http-proxy-middleware");



module.exports = function (app: any) {
  app.use(
    proxy(WAKATIME_LANGUAGES, {
      target: "https://wakatime.com",
      changeOrigin: true,
      secure: false,
    })
  );
};