import fastify from "fastify"
import http from "http"
import { registerRoutes } from "./routes"

declare module "fastify" {
  interface FastifyInstance {
    config: {
      DATABASE_URL: string
      POSTGRES_USER: string
      POSTGRES_HOST: string
      POSTGRES_PASSWORD: string
      POSTGRES_DB: string
      POSTGRES_PORT: number
    }
  }
}

const app = fastify<http.Server, http.IncomingMessage>({
  logger: true
})

app.register(registerRoutes)

export default app
