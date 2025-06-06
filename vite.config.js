import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.m4v"],
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
