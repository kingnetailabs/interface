import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import vitePluginRequire from "vite-plugin-require";

const addCorsHeaders = (proxyRes: any) => {
  proxyRes.headers['Access-Control-Allow-Origin'] = '*';
};

const createProxyConfig = (pathPrefix: string) => ({
  target: 'https://s3.ap-east-1.amazonaws.com/mira-buckets',
  changeOrigin: true,
  rewrite: (path: string) => path.replace(new RegExp(`^/${pathPrefix}`), `/${pathPrefix}`),
  configure: (proxy: any) => {
    proxy.on('proxyRes', addCorsHeaders);
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    // @ts-ignore
    plugins: [react(), vitePluginRequire.default()],
    server: {
      host: "0.0.0.0",
      port: 8080,
      open: false,
      proxy: {
        '/phaser': createProxyConfig('phaser'),
        '/game_config': createProxyConfig('game_config')
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: env.VITE_REMOVE_CONSOLE === 'false',
        },
      },
    },
  }
});
