import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import dotenv from "dotenv"
import { Database } from "./types"

dotenv.config()

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB ?? "",
    host: process.env.POSTGRES_HOST ?? "",
    user: process.env.POSTGRES_USER ?? "",
    port: parseInt(process.env.POSTGRES_PORT as string, 10) ?? 5432,
    max: 10,
    password: process.env.POSTGRES_PASSWORD ?? ""
  })
})

export const db = new Kysely<Database>({
  dialect
})
