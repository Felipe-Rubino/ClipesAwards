import { FastifyInstance } from "fastify";

export async function helloWorld(app: FastifyInstance) {
  app.get("/hello-world", (request, response) => {
    return response.status(200).send({ message: "Hello, world!" });
  });
}
