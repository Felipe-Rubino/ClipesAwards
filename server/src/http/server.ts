import fastify from "fastify";
import routes from "./routes";

const app = fastify();

app.register(routes, { prefix: "/api" });

app.listen({ port: 3000 }).then(() => {
  console.log("🚀 HTTP server running!");
});
