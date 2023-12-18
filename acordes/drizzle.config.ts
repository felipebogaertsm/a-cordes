import { defineConfig } from "drizzle-kit/utils";

export default defineConfig({
  schema: "./schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
});
