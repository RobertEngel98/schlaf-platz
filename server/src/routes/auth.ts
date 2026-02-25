import type { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import { db, schema } from "../db/index.js";

export default async function authRoutes(app: FastifyInstance) {
  // ==========================================================================
  // POST /api/auth/login
  // ==========================================================================
  app.post("/api/auth/login", async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    if (!email || !password) {
      return reply.code(400).send({ error: "E-Mail und Passwort erforderlich" });
    }

    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!user) {
      return reply.code(401).send({ error: "Ungültige Anmeldedaten" });
    }

    if (!user.isActive) {
      return reply.code(403).send({ error: "Benutzer ist deaktiviert" });
    }

    // Simple password check (in production, use bcrypt)
    if (user.password !== password) {
      return reply.code(401).send({ error: "Ungültige Anmeldedaten" });
    }

    // Create simple token (base64 encoded JSON)
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64");

    reply.setCookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  });

  // ==========================================================================
  // POST /api/auth/logout
  // ==========================================================================
  app.post("/api/auth/logout", async (_request, reply) => {
    reply.clearCookie("token", { path: "/" });
    return { success: true };
  });

  // ==========================================================================
  // GET /api/auth/me
  // ==========================================================================
  app.get("/api/auth/me", async (request, reply) => {
    const token = request.cookies.token;
    if (!token) {
      return reply.code(401).send({ error: "Nicht authentifiziert" });
    }

    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8")) as {
        userId: string;
        exp: number;
      };

      if (decoded.exp && decoded.exp < Date.now()) {
        reply.clearCookie("token", { path: "/" });
        return reply.code(401).send({ error: "Token abgelaufen" });
      }

      const user = await db.query.users.findFirst({
        where: eq(schema.users.id, decoded.userId),
      });

      if (!user || !user.isActive) {
        reply.clearCookie("token", { path: "/" });
        return reply.code(401).send({ error: "Benutzer nicht gefunden" });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    } catch {
      reply.clearCookie("token", { path: "/" });
      return reply.code(401).send({ error: "Ungültiger Token" });
    }
  });
}
