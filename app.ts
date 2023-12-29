import fastify from "fastify"
import http from "http"
import { registerRoutes } from "./routes"
import fastifyJwt from "@fastify/jwt"
import { Type } from "@sinclair/typebox"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import dotenv from "dotenv"
dotenv.config()

const app = fastify<http.Server, http.IncomingMessage>({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string
})

app.post(
  "/auth",
  {
    schema: {
      body: Type.Object({
        username: Type.String(),
        password: Type.String()
      })
    }
  },
  async (req, reply) => {
    const { username, password } = req.body
    const token = app.jwt.sign({ username, password })
    req.log.info({ token })
    reply.send({ token })
  }
)

app.register(registerRoutes)

export default app
