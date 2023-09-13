import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({
  path: ".env.local",
})

export default {
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
} satisfies Config
