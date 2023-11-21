import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  real,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image").notNull(),
  clerkId: text("clerkId").notNull().unique(),
  stripeCustomer: text("stripeCustomer").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  price: real("price"),
  title: text("title").notNull(),
  color: text("color").notNull(),
  subtitle: text("subtitle").notNull(),
});

export const productImages = pgTable("productImages", {
  id: serial("id").primaryKey(),
  url: text("image").notNull(),
  size: real("size"),
  name: text("name"),
  productID: integer("productID")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productID],
    references: [products.id],
  }),
}));

export const productRelations = relations(products, ({ many }) => ({
  productImages: many(productImages),
}));

export type Products = InferSelectModel<typeof products>;
export type User = InferSelectModel<typeof users>;
export type ProductImages = InferSelectModel<typeof productImages>;
