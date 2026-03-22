import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^@vkontakte\/vkui$/, replacement: "@vkontakte/vkui/dist/cssm" }],
  },
});

