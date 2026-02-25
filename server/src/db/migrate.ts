import Database from "better-sqlite3";
import { resolve } from "path";
import { existsSync, mkdirSync, readFileSync } from "fs";

const dataDir = resolve(import.meta.dirname, "../../data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const dbPath = resolve(dataDir, "crm.db");
const sqlite = new Database(dbPath);

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

// Auto-create tables from schema
const initSQL = readFileSync(resolve(import.meta.dirname, "../../init.sql"), "utf-8");
sqlite.exec(initSQL);

console.log("Database migrated successfully!");
sqlite.close();
