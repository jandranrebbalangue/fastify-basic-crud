import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { Type } from "@sinclair/typebox"
import {
  createPerson,
  deletePerson,
  findPersonById,
  updatePerson
} from "./repository"
import { NewPerson } from "./db/types"

export async function pluginWithTypebox(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const provider = fastify.withTypeProvider<TypeBoxTypeProvider>()
  provider.get("/", (_req, reply) => {
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
          Gender: Type.Enum({
            male: "male",
            woman: "woman",
            other: "other"
          })
        })
      }
    },
    async (req, reply) => {
      const { FirstName, LastName, Age, Email, Gender } = req.body
      const created_at = new Date().toISOString()
      const data: NewPerson = {
        first_name: FirstName,
        last_name: LastName,
        age: Age,
        email: Email,
        gender: Gender,
        created_at
      }

      const person = await createPerson(data)
      reply.code(201).send(person)
    }
  )
  provider.get(
    "/persons/:personId",
    {
      schema: {
        params: Type.Object({
          personId: Type.Number()
        })
      }
    },
    async (req, res) => {
      const { personId } = req.params
      const person = await findPersonById(personId)
      res.code(200).send({ data: person })
    }
  )
  provider.put(
    "/persons/:personId",
    {
      schema: {
        params: Type.Object({
          personId: Type.Number()
        }),
        body: Type.Object({
          FirstName: Type.String(),
          LastName: Type.String(),
          Age: Type.Number(),
          Email: Type.String(),
          Gender: Type.Enum({
            male: "male",
            woman: "woman",
            other: "other"
          }),
          updatedAt: Type.String()
        })
      }
    },
    async (req, res) => {
      const { personId } = req.params
      const { FirstName, LastName, Age, Email, Gender, updatedAt } = req.body
      await updatePerson(personId, {
        first_name: FirstName,
        last_name: LastName,
        age: Age,
        email: Email,
        gender: Gender,
        updated_at: updatedAt
      })
      res.code(204).send()
    }
  )

  provider.delete(
    "/persons/:personId",
    {
      schema: {
        params: Type.Object({
          personId: Type.Number()
        })
      }
    },
    async (req, res) => {
      const { personId } = req.params
      await deletePerson(personId)
      res.code(204).send()
    }
  )
}
