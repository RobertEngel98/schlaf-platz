import type { FastifyInstance } from "fastify";
import { eq, and, desc } from "drizzle-orm";
import { db, schema } from "../db/index.js";
import { nanoid } from "nanoid";

export default async function activityRoutes(app: FastifyInstance) {
  // LIST activities for a specific entity
  app.get("/api/activities", async (req) => {
    const { entityType, entityId, limit = "50" } = req.query as Record<string, string>;

    if (!entityType || !entityId) {
      throw { statusCode: 400, message: "entityType und entityId sind erforderlich" };
    }

    const activities = await db
      .select()
      .from(schema.activities)
      .where(
        and(
          eq(schema.activities.entityType, entityType),
          eq(schema.activities.entityId, entityId)
        )
      )
      .orderBy(desc(schema.activities.createdAt))
      .limit(parseInt(limit));

    return activities;
  });

  // CREATE activity (primarily for comments)
  app.post("/api/activities", async (req) => {
    const body = req.body as {
      entityType: string;
      entityId: string;
      activityType: string;
      title: string;
      description?: string;
      oldValue?: string;
      newValue?: string;
      fieldName?: string;
    };

    if (!body.entityType || !body.entityId || !body.activityType || !body.title) {
      throw { statusCode: 400, message: "entityType, entityId, activityType und title sind erforderlich" };
    }

    // Look up user name from users table
    let userName = "System";
    if (req.userId) {
      const user = await db
        .select({ name: schema.users.name })
        .from(schema.users)
        .where(eq(schema.users.id, req.userId))
        .get();
      if (user) {
        userName = user.name;
      }
    }

    const activity = {
      id: nanoid(),
      entityType: body.entityType,
      entityId: body.entityId,
      activityType: body.activityType,
      title: body.title,
      description: body.description ?? null,
      oldValue: body.oldValue ?? null,
      newValue: body.newValue ?? null,
      fieldName: body.fieldName ?? null,
      userId: req.userId || null,
      userName,
      createdAt: new Date().toISOString(),
    };

    await db.insert(schema.activities).values(activity);
    return activity;
  });

  // DELETE activity (own activities or admin)
  app.delete("/api/activities/:id", async (req) => {
    const { id } = req.params as { id: string };

    const activity = await db
      .select()
      .from(schema.activities)
      .where(eq(schema.activities.id, id))
      .get();

    if (!activity) {
      throw { statusCode: 404, message: "Aktivität nicht gefunden" };
    }

    // Only allow deleting own activities or if admin
    if (activity.userId !== req.userId && req.userRole !== "admin") {
      throw { statusCode: 403, message: "Keine Berechtigung zum Löschen dieser Aktivität" };
    }

    await db.delete(schema.activities).where(eq(schema.activities.id, id));
    return { success: true };
  });
}
