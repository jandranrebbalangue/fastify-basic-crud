import { Database } from "./types"
import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGES_DB,
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
