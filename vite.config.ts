// https://vitejs.dev/config/

import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import emitEJS from "rollup-plugin-emit-ejs";
import htmlPlugin from "vite-plugin-html-config";
import { version } from "./package.json";
import replace from "@rollup/plugin-replace";

const DEV = process.env.NODE_ENV === "development";
const ON_PREM = `${process.env.ON_PREM}` === "true";
const headScripts = [];
if (!DEV && !ON_PREM)
  headScripts.push({
    src: "//d2wy8f7a9ursnm.cloudfront.net/v7/bugsnag.min.js"
  });

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
      },
      "/ng/api": {
        target: "http://localhost:7457",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ng\/api/, "")
      },
      "/gateway/ng/api": {
        target: "http://localhost:7457",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gateway\/ng\/api/, "")
      }
    }
  },
  plugins: [
    nodeResolve({
      moduleDirectories: ["node_modules", "src"],
      extensions: [".js", ".ts", ".tsx"]
    }),
    htmlPlugin({
      headScripts
    }),
    replace({
      __DEV__: DEV,
      __ON_PREM__: ON_PREM,
      __BUGSNAG_RELEASE_VERSION__: JSON.stringify(version)
    }),
    emitEJS({
      src: ".",
      data: {
        version,
        gitCommit: process.env.GIT_COMMIT,
        gitBranch: process.env.GIT_BRANCH
      }
    })
  ],
  base: ""
});
