import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import http from "http";
import { fastifyPostgres } from "@fastify/postgres";
import { pluginWithTypebox } from "./routes";

interface customRequest extends http.IncomingMessage {
  mySpecialProp: string;
}
const app = fastify<http.Server, customRequest>({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyPostgres, {
  connectionString: process.env.POSTGRES_URL,
});

app.register(pluginWithTypebox);

export default app;
