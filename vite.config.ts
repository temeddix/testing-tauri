import process from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
// Vite options tailored for Tauri development
// and only applied in `tauri dev` or `tauri build`
export default defineConfig({
  plugins: [deno(), react()],
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore Rust crates
      ignored: ["**/src-tauri/**", "**/native/**"],
    },
  },
});
