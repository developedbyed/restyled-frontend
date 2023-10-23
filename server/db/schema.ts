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
  price: real("price").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
});

export const productImages = pgTable("productImages", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  productID: integer("productID")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const productVariant = pgTable("productVariant", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  color: text("color").notNull(),
  variantName: text("variantName").notNull(),
  productID: integer("productID")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const productVariantRelations = relations(productVariant, ({ one }) => ({
  product: one(products, {
    fields: [productVariant.productID],
    references: [products.id],
  }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productID],
    references: [products.id],
  }),
}));

export const productRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariant),
  productImages: many(productImages),
}));

export type Products = InferSelectModel<typeof products>;
export type ProductVariants = InferSelectModel<typeof productVariant>;
export type User = InferSelectModel<typeof users>;
export type ProductImages = InferSelectModel<typeof productImages>;
