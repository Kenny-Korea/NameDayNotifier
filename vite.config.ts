import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {},
  base: "/NameDayNotifier/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // 자동 업데이트 설정
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
      },
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"], // 포함할 파일들
      manifest: {
        name: "Name Day Notifier",
        short_name: "영명축일",
        description: "A name day notifier for SGG Catholic Youth executive members",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "./agape-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./agape-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./agape-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      // 서비스 워커 설정
      strategies: "injectManifest",
      srcDir: "src/sw",
      filename: "sw.ts",
      injectRegister: false,
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
