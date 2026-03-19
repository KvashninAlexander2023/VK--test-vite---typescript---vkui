import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^@vkontakte\/vkui$/, replacement: "@vkontakte/vkui/dist/cssm" }],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.poiskkino.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1.5'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('[Proxy] ->', req.method, req.url, '-> https://api.poiskkino.dev' + proxyReq.path)
          })
        },
      },
    },
  },

});

