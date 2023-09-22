import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image").notNull(),
  clerkId: text("clerkId").notNull().unique(),
  stripeCustomer: text("stripeCustomer").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
