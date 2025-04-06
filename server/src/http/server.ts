import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";

export const startServer = async () => {
  const app = fastify();
  app.register(routes, { prefix: "/api" });
  app.register(cors, {
    origin: "*",
  });

  try {
    app.listen({ port: 3100 }).then(() => {
      console.log("🚀 HTTP server running on http://localhost:3100/api");
    });
  } catch (err) {
    console.error("Erro ao iniciar o servidor Fastify", err);
    process.exit(1);
  }
};
