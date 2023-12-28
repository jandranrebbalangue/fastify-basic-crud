import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import { Database } from "./types"

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB ?? "postgres",
    host: process.env.POSTGRES_HOST ?? "localhost",
    user: process.env.POSTGRES_USER ?? "postgres",
    port: parseInt(process.env.POSTGRES_PORT as string, 10) ?? 5432,
    max: 10,
    password: process.env.POSTGRES_PASSWORD ?? "root"
  })
})

export const db = new Kysely<Database>({
  dialect
})
