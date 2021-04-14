// https://vitejs.dev/config/

import { defineConfig } from "vite";
import { resolve } from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        saml: resolve(__dirname, "saml.html")
      }
    },
    emptyOutDir: false
  },
  plugins: [
    nodeResolve({
      moduleDirectories: ["node_modules", "src"],
      extensions: [".js", ".ts", ".tsx"]
    })
  ],
  base: ""
});
