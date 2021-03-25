// https://vitejs.dev/config/

import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3457",
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
  plugins: [
    nodeResolve({
      moduleDirectories: ["node_modules", "src"],
      extensions: [".js", ".ts", ".tsx"]
    })
  ]
});
