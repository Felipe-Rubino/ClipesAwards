import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.register(routes, { prefix: "/api" });

app.listen({ port: 3100 }).then(() => {
  console.log("🚀 HTTP server running on http://localhost:3100/api");
});
