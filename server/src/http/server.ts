import fastify from "fastify";

const app = fastify();

app.get("/", (request, response) => {
  return response.status(200).send({ message: "Hello, world!" });
});

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 HTTP server running!");
});
