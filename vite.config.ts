// vite.config.ts
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa", // Frontend build output
  },
  plugins: [
    react(),
    // Add Express server only in dev
    mode === "development" ? expressDevServerPlugin() : null,
  ].filter(Boolean), // Remove null plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),        // Changed from ./client
      "@shared": path.resolve(__dirname, "shared"),  // Removed leading ./
    },
  },
}));

// Inline plugin — sirf dev server modify karega
function expressDevServerPlugin(): Plugin {
  return {
    name: "express-dev-server-plugin",
    apply: "serve", // Only in `vite dev`
    configureServer(server) {
      // Dynamic import — taki build time par load na ho
      import("./server")
        .then(({ createServer }) => {
          const app = createServer();
          server.middlewares.use(app);
          console.log("✅ Express server mounted in Vite dev mode");
        })
        .catch((err) => {
          console.error("❌ Failed to load Express server in dev:", err);
        });
    },
  };
}
