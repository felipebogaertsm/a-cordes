import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export type User = typeof users.$inferSelect;
