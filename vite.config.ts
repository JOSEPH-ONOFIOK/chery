import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // your project root
  plugins: [react()],
  base: "https://joseph-onofiok.github.io/chery", // base path for GitHub Pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // make sure this points to src
    },
  },
  build: {
    outDir: "../dist", // output folder relative to project root
    emptyOutDir: true, // clear folder before build
  },
});