import { FastifyInstance } from "fastify";

export async function ping(app: FastifyInstance) {
  app.get("/ping", (request, response) => {
    console.group("[ping]");
    console.log(`[INFO] Requisição recebida`);
    try {
      return response.status(200).send("Pong!");
    } catch (err) {
      console.error("[ERROR] Erro interno: ", err);
      return response
        .code(500)
        .send({ error: "Erro interno. Tente novamente mais tarde" });
    } finally {
      console.info(`[INFO] Requisição finalizada`);
      console.groupEnd();
    }
  });
}
