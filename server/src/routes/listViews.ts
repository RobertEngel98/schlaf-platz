import type { FastifyInstance } from "fastify";
import { eq, and } from "drizzle-orm";
import { db, schema } from "../db/index.js";
import crypto from "crypto";

export default async function listViewRoutes(app: FastifyInstance) {
  // GET /api/list-views?entity=accounts
  app.get("/api/list-views", async (request) => {
    const { entity } = request.query as { entity?: string };
    const userId = request.userId;

    const conditions = [eq(schema.listViews.userId, userId)];
    if (entity) conditions.push(eq(schema.listViews.entity, entity));

    const views = await db
      .select()
      .from(schema.listViews)
      .where(and(...conditions))
      .orderBy(schema.listViews.name);

    return views.map((v) => ({
      ...v,
      filters: v.filters ? JSON.parse(v.filters) : [],
      visibleColumns: v.visibleColumns ? JSON.parse(v.visibleColumns) : [],
    }));
  });

  // POST /api/list-views
  app.post("/api/list-views", async (request) => {
    const body = request.body as any;
    const now = new Date().toISOString();
    const id = crypto.randomBytes(12).toString("base64url");

    // If setting as default, unset other defaults for same entity
    if (body.isDefault) {
      const existing = await db
        .select()
        .from(schema.listViews)
        .where(
          and(
            eq(schema.listViews.userId, request.userId),
            eq(schema.listViews.entity, body.entity),
            eq(schema.listViews.isDefault, true)
          )
        );
      for (const v of existing) {
        await db
          .update(schema.listViews)
          .set({ isDefault: false, updatedAt: now })
          .where(eq(schema.listViews.id, v.id));
      }
    }

    const newView = {
      id,
      userId: request.userId,
      entity: body.entity,
      name: body.name,
      isDefault: body.isDefault || false,
      isPinned: body.isPinned || false,
      filters: body.filters ? JSON.stringify(body.filters) : null,
      visibleColumns: body.visibleColumns ? JSON.stringify(body.visibleColumns) : null,
      sortField: body.sortField || null,
      sortOrder: body.sortOrder || "asc",
      viewMode: body.viewMode || "table",
      kanbanField: body.kanbanField || null,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(schema.listViews).values(newView);
    return { ...newView, filters: body.filters || [], visibleColumns: body.visibleColumns || [] };
  });

  // PUT /api/list-views/:id
  app.put("/api/list-views/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    const now = new Date().toISOString();

    if (body.isDefault) {
      const view = await db.query.listViews.findFirst({
        where: eq(schema.listViews.id, id),
      });
      if (view) {
        const existing = await db
          .select()
          .from(schema.listViews)
          .where(
            and(
              eq(schema.listViews.userId, request.userId),
              eq(schema.listViews.entity, view.entity),
              eq(schema.listViews.isDefault, true)
            )
          );
        for (const v of existing) {
          if (v.id !== id) {
            await db
              .update(schema.listViews)
              .set({ isDefault: false, updatedAt: now })
              .where(eq(schema.listViews.id, v.id));
          }
        }
      }
    }

    const updates: any = { updatedAt: now };
    if (body.name !== undefined) updates.name = body.name;
    if (body.isDefault !== undefined) updates.isDefault = body.isDefault;
    if (body.isPinned !== undefined) updates.isPinned = body.isPinned;
    if (body.filters !== undefined) updates.filters = JSON.stringify(body.filters);
    if (body.visibleColumns !== undefined) updates.visibleColumns = JSON.stringify(body.visibleColumns);
    if (body.sortField !== undefined) updates.sortField = body.sortField;
    if (body.sortOrder !== undefined) updates.sortOrder = body.sortOrder;
    if (body.viewMode !== undefined) updates.viewMode = body.viewMode;
    if (body.kanbanField !== undefined) updates.kanbanField = body.kanbanField;

    await db.update(schema.listViews).set(updates).where(eq(schema.listViews.id, id));

    const updated = await db.query.listViews.findFirst({ where: eq(schema.listViews.id, id) });
    return {
      ...updated,
      filters: updated?.filters ? JSON.parse(updated.filters) : [],
      visibleColumns: updated?.visibleColumns ? JSON.parse(updated.visibleColumns) : [],
    };
  });

  // DELETE /api/list-views/:id
  app.delete("/api/list-views/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.delete(schema.listViews).where(eq(schema.listViews.id, id));
    return { success: true };
  });
}
