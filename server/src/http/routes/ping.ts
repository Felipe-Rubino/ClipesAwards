import { FastifyInstance } from "fastify";

export async function ping(app: FastifyInstance) {
  app.get("/ping", (request, response) => {
    return response.status(200).send("Pong!");
  });
}
