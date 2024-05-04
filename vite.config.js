import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      _APP_ENV_: process.env.VITE_VERCEL_ENV,
    },
  };
});
