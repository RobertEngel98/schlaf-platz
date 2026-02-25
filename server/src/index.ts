import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";
import { resolve } from "path";
import { existsSync, mkdirSync, readFileSync } from "fs";
import { client } from "./db/index.js";

// Validation & Flow imports
import { ValidationError } from "./services/validationRules.js";

// Route imports
import authRoutes from "./routes/auth.js";
import accountsRoutes from "./routes/accounts.js";
import unterkuenfteRoutes from "./routes/unterkuenfte.js";
import buchungenRoutes from "./routes/buchungen.js";
import leadsRoutes from "./routes/leads.js";
import opportunitiesRoutes from "./routes/opportunities.js";
import dashboardRoutes from "./routes/dashboard.js";
import contactRoutes from "./routes/contacts.js";
import angeboteRoutes from "./routes/angebote.js";
import stundenerfassungRoutes from "./routes/stundenerfassung.js";
import freelancerRoutes from "./routes/freelancers.js";
import caseRoutes from "./routes/cases.js";
import taskRoutes from "./routes/tasks.js";
import vermieterRoutes from "./routes/vermieter.js";
import logRoutes from "./routes/logs.js";
import listViewRoutes from "./routes/listViews.js";

const app = Fastify({ logger: true });

// ============================================================================
// PLUGINS
// ============================================================================
await app.register(cors, { origin: true, credentials: true });
await app.register(cookie, { secret: "schlaf-platz-crm-secret-2024" });

// Static files (client build)
const clientDist = resolve(import.meta.dirname, "../../client/dist");
if (existsSync(clientDist)) {
  await app.register(fastifyStatic, {
    root: clientDist,
    prefix: "/",
    wildcard: false,
  });
}

// ============================================================================
// AUTH MIDDLEWARE
// ============================================================================
app.decorateRequest("userId", "");
app.decorateRequest("userRole", "");

app.addHook("onRequest", async (request, reply) => {
  const publicPaths = ["/api/auth/login", "/api/auth/logout"];
  const path = request.url.split("?")[0];

  if (publicPaths.includes(path) || !path.startsWith("/api/")) {
    return;
  }

  const token = request.cookies.token;
  if (!token) {
    reply.code(401).send({ error: "Nicht authentifiziert" });
    return;
  }

  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    if (decoded.exp && decoded.exp < Date.now()) {
      reply.code(401).send({ error: "Token abgelaufen" });
      return;
    }
    request.userId = decoded.userId;
    request.userRole = decoded.role || "user";
  } catch {
    reply.code(401).send({ error: "Ungültiger Token" });
    return;
  }
});

// ============================================================================
// ROUTES
// ============================================================================
await app.register(authRoutes);
await app.register(accountsRoutes);
await app.register(unterkuenfteRoutes);
await app.register(buchungenRoutes);
await app.register(leadsRoutes);
await app.register(opportunitiesRoutes);
await app.register(dashboardRoutes);
await app.register(contactRoutes);
await app.register(angeboteRoutes);
await app.register(stundenerfassungRoutes);
await app.register(freelancerRoutes);
await app.register(caseRoutes);
await app.register(taskRoutes);
await app.register(vermieterRoutes);
await app.register(logRoutes);
await app.register(listViewRoutes);

// ============================================================================
// GLOBAL ERROR HANDLER
// ============================================================================
app.setErrorHandler((error: any, request, reply) => {
  if (error.name === 'ValidationError') {
    reply.code(400).send({ error: error.message });
    return;
  }
  reply.code(error.statusCode || 500).send({ error: error.message || 'Interner Serverfehler' });
});

// SPA fallback
app.setNotFoundHandler(async (request, reply) => {
  const path = request.url.split("?")[0];
  if (path.startsWith("/api/")) {
    reply.code(404).send({ error: "Route nicht gefunden" });
    return;
  }
  if (existsSync(resolve(clientDist, "index.html"))) {
    return reply.sendFile("index.html");
  }
  reply.code(200).send("Schlaf-Platz CRM - Frontend nicht gebaut. Bitte 'npm run build:client' ausführen.");
});

// ============================================================================
// CREATE TABLES ON STARTUP
// ============================================================================
async function createTables() {
  const initSqlPath = resolve(import.meta.dirname, "../init.sql");

  if (existsSync(initSqlPath)) {
    const sqlContent = readFileSync(initSqlPath, "utf-8");
    // Remove comment-only lines, then split by semicolons
    const cleaned = sqlContent.replace(/^--.*$/gm, "");
    const statements = cleaned.split(";").map(s => s.trim()).filter(s => s.length > 0);
    for (const stmt of statements) {
      try {
        await client.execute(stmt);
      } catch (e: any) {
        if (!e.message?.includes("already exists")) {
          console.warn(`SQL Warning: ${e.message}`);
        }
      }
    }
  }

  console.log("Datenbank-Tabellen erstellt/überprüft.");
}

// ============================================================================
// START SERVER
// ============================================================================
try {
  await createTables();
  await app.listen({ port: 3003, host: "0.0.0.0" });
  console.log("Schlaf-Platz CRM Server läuft auf Port 3003");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

declare module "fastify" {
  interface FastifyRequest {
    userId: string;
    userRole: string;
  }
}
