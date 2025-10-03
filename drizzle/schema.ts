import {
  pgTable,
  timestamp,
  text,
  varchar,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

export const emails = pgTable("emails", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  email: text("email").notNull().unique(),
  ipAddress: varchar("ip_address", { length: 255 }),
  userAgent: text("user_agent"),
  isActive: boolean("is_active").default(true),
});
