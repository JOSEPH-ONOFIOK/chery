import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // your project root
  plugins: [react()],
  base: "/chery/", // optional, if you need it for CDN or relative paths
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // make sure this points to the correct src
    },
  },
  build: {
    outDir: "../dist", // output folder relative to root
    emptyOutDir: true, // clear output folder before building
  },
});