import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

import { config as dotenvConfig } from "dotenv";
dotenvConfig();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ disable: process.env.NODE_ENV === "development" })],
});
