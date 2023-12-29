import fastify from "fastify"
import http from "http"
import { registerRoutes } from "./routes"
import fastifyJwt from "@fastify/jwt"
import { Type } from "@sinclair/typebox"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import fastifyPlugin from "fastify-plugin"

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
}).withTypeProvider<TypeBoxTypeProvider>()

app.register(fastifyJwt, {
  secret: "supersecret"
})

app.post(
  "/signup",
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

/* app.addHook("onRequest", async (req, reply) => { */
/*   try { */
/*     await req.jwtVerify() */
/*   } catch (error) { */
/*     reply.send(error) */
/*   } */
/* }) */
fastifyPlugin(async (fp) => {
  fp.decorate("authenticate", () => {
    return app.jwt.options.verify
  })
})
app.register(registerRoutes)

export default app
