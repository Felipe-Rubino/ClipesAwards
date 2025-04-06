import { FastifyInstance } from "fastify";
import { helloWorld } from "./hello-world";

export default async function routes(app: FastifyInstance) {
  app.register(helloWorld);
}
