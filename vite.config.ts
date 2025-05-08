import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, join } from "path";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { ENV = "mock" } = process.env;
  const cmdEnv = ENV.trim();
  const envObj = loadEnv(cmdEnv, join(process.cwd(), "/config/env"));
  const { VITE_APP_OPEN_MOCK } = envObj;
  const openMock = mode === "development" && VITE_APP_OPEN_MOCK === "1";
  return {
    plugins: [react(), openMock && mockDevServerPlugin()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@components": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
        "@hooks": resolve(__dirname, "src/hooks"),
        "@data": resolve(__dirname, "src/data"),
      },
    },
    server: {
      open: true,
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          rewrite: (rewritePath) => rewritePath.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[local]_[hash:base64:5]",
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
