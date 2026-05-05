import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  server: {
    port: 5173,
  },
  build: {
    target: "esnext",
    minify: true,
    sourcemap: true,
  },
});
