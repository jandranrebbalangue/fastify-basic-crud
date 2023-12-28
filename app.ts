import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import fastify from "fastify"
import http from "http"
import { fastifyEnv } from "@fastify/env"
import { registerRoutes } from "./routes"

interface customRequest extends http.IncomingMessage { }
const app = fastify<http.Server, customRequest>({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

const schema = {
  type: "object",
  required: [
    "DATABASE_URL",
    "POSTGRES_USER",
    "POSTGRES_HOST",
    "POSTGRES_PASSWORD",
    "POSTGRES_DB",
    "POSTGRES_PORT"
  ],
  properties: {
    DATABASE_URL: {
      type: "string"
    },
    POSTGRES_USER: {
      type: "string"
    },
    POSTGRES_HOST: {
      type: "string"
    },
    POSTGRES_PASSWORD: {
      type: "string"
    },
    POSTGRES_DB: {
      type: "string"
    },
    POSTGRES_PORT: {
      type: "number",
      default: 5432
    }
  }
}
const options = {
  confKey: "config",
  schema,
  dotenv: true
}
app.register(fastifyEnv, options).ready((err) => {
  if (err) console.error(err)
})

app.register(registerRoutes)

export default app
