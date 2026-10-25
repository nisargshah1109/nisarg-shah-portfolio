import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  vite: {
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/server",
        "react-dom/server.node",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "use-sync-external-store",
        "use-sync-external-store/shim",
        "use-sync-external-store/shim/with-selector",
      ],
    },
    ssr: {
      optimizeDeps: {
        include: [
          "react",
          "react-dom",
          "react-dom/server",
          "react-dom/server.node",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
          "use-sync-external-store",
          "use-sync-external-store/shim",
          "use-sync-external-store/shim/with-selector",
        ],
      },
    },
  },
});
