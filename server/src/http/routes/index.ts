import { FastifyInstance } from "fastify";
import { getAllClips } from "./get-all-clips";
import { ping } from "./ping";

export default async function routes(app: FastifyInstance) {
  app.register(ping);
  app.register(getAllClips);
}
