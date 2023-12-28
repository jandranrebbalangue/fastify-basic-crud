import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

export async function pluginWithTypebox(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    "/",
    {
      schema: {},
    },
    (req, reply) => {
      reply.send({ Hello: "World" });
    },
  );
}
