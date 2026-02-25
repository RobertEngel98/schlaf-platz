import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.js";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";

const dataDir = resolve(import.meta.dirname, "../../data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const dbPath = resolve(dataDir, "crm.db");

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(client, { schema });
export { schema };
export { client };
