import { FastifyInstance } from "fastify";
import { helloWorld } from "./hello-world";
import { getDiscordVideo } from "./get-discord-video";
import { getAllClips } from "./get-all-clips";

export default async function routes(app: FastifyInstance) {
  app.register(helloWorld);
  app.register(getDiscordVideo);
  app.register(getAllClips);
}
