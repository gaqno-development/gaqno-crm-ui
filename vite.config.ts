import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(async () => {
  const tailwindcss = (await import("@tailwindcss/vite")).default;

  return {
    base: "/",
    resolve: { dedupe: ["motion"] },
    server: {
      port: 3003,
      origin: "http://localhost:3003",
      fs: {
        allow: [".", "../shared"],
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "crm",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^18.0.0",
            eager: true,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: "^18.0.0",
            eager: true,
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: "^6.0.0",
          },
          "@tanstack/react-query": {
            singleton: true,
            requiredVersion: "^5.0.0",
          },
          zustand: {
            singleton: true,
            requiredVersion: "^4.0.0",
          },
          "use-sync-external-store": {
            singleton: true,
            requiredVersion: "*",
          },
        } as any,
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
        requireReturnsDefault: "preferred",
      },
      rollupOptions: {
        output: { format: "es" },
      },
    },
    optimizeDeps: { include: ["motion", "use-sync-external-store"] },
  };
});
