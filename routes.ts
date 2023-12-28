import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { Date, Type } from "@sinclair/typebox"
import { createPerson } from "./repository"
import { NewPerson } from "./db/types"

export async function pluginWithTypebox(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const provider = fastify.withTypeProvider<TypeBoxTypeProvider>()
  provider.get("/", (req, reply) => {
    reply.send({ Hello: "World" })
  })

  provider.post(
    "/persons",
    {
      schema: {
        body: Type.Object({
          FirstName: Type.String(),
          LastName: Type.String(),
          Age: Type.Number(),
          Email: Type.String(),
          Gender: Type.String()
        })
      }
    },
    async (req, reply) => {
      const { FirstName, LastName, Age, Email, Gender } = req.body
      const data: NewPerson = {
        first_name: FirstName,
        last_name: LastName,
        age: Age,
        email: Email,
        gender: Gender
      }
      const person = await createPerson(data)
      reply.send({ id: person.id }).code(201)
    }
  )
}
