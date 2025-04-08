import { FastifyInstance } from "fastify";
import { helloWorld } from "./hello-world";
import { getAllClips } from "./get-all-clips";

export default async function routes(app: FastifyInstance) {
  app.register(helloWorld);
  app.register(getAllClips);
}
