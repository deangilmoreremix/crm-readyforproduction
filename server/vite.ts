import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  // Express 5 uses path-to-regexp v6; use a regex for catch-all to avoid '*' parse errors
  app.get(/.*/, async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Prefer client/index.html if present, otherwise fall back to repo root index.html
      const clientIndex = path.resolve(import.meta.dirname, "..", "client", "index.html");
      const rootIndex = path.resolve(import.meta.dirname, "..", "index.html");
      const clientTemplate = fs.existsSync(clientIndex) ? clientIndex : rootIndex;

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Support two common layouts:
  // 1) Root Vite build at ../dist (recommended)
  // 2) Legacy build copied to server/public
  const rootDist = path.resolve(import.meta.dirname, "..", "dist");
  const serverPublic = path.resolve(import.meta.dirname, "public");

  const distPath = fs.existsSync(rootDist) ? rootDist : serverPublic;

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory at ${rootDist} or ${serverPublic}. Run 'npm run build' to generate the client bundle.`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist (GET only)
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
