import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/sendMail.php": "http://localhost:3002",
      "/sheduleMail.php": "http://localhost:3002",
      "/api": "http://localhost:3002",
    },
  },
});
