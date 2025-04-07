import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";
const port = parseInt(process.env.PORT || "3100", 10);
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

export const startServer = async () => {
  const app = fastify();
  app.register(routes, { prefix: "/api" });
  app.register(cors, {
    origin: "*",
  });

  try {
    app.listen({ port: port, host: host }).then(() => {
      console.log(`🚀 HTTP server running on http://${host}:${port}/api`);
    });
  } catch (err) {
    console.error("Erro ao iniciar o servidor Fastify", err);
    process.exit(1);
  }
};
