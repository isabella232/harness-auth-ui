// https://vitejs.dev/config/

import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import htmlPlugin from "vite-plugin-html-config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildVersion = JSON.stringify(require("./package.json").version);
const DEV = process.env.NODE_ENV === "development";
const ON_PREM = `${process.env.ON_PREM}` === "true";
const headScripts = [];
const scripts = [`window.bugSnagReleaseVersion=${buildVersion};`] as any;
if (!DEV && !ON_PREM)
  headScripts.push({
    src: "//d2wy8f7a9ursnm.cloudfront.net/v7/bugsnag.min.js"
  });
const htmlPluginOpt = {
  headScripts,
  scripts
};

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3457",
        changeOrigin: true
      },
      "/gateway/api": {
        target: "http://localhost:3457",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gateway/, "")
      }
    }
  },
  plugins: [
    nodeResolve({
      moduleDirectories: ["node_modules", "src"],
      extensions: [".js", ".ts", ".tsx"]
    }),
    htmlPlugin(htmlPluginOpt)
  ],
  base: ""
});
