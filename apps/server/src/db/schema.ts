import {
  bigint,
  pgTable,
  text,
  date,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  color: text("color").notNull(),
});

export const subscriptionsTable = pgTable("subscriptions", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),

  title: text("title").notNull(),

  categoryId: bigint("category_id", { mode: "number" })
    .notNull()
    .references(() => categoriesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  nextRenewal: date("next_renewal").notNull(),

  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  isRenews: boolean("is_renews").notNull(),
});
