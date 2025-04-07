import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

type GetDiscordVideoRequest = FastifyRequest<{
  Querystring: { url: string };
}>;

export async function getDiscordVideo(app: FastifyInstance) {
  app.get("/proxy", async (req: GetDiscordVideoRequest, res: FastifyReply) => {
    console.group("[getDiscordVideo]");
    console.log(`[INFO] Requisição recebida`);

    const { url: rawUrl } = req.query;
    console.info(`[INFO] URL parâmetro: ${rawUrl}`);

    if (!rawUrl) {
      console.error("[ERROR] Query parameter 'URL' não foi enviado");
      return res.code(400).send({ error: "Missing URL parameter" });
    }

    try {
      const url = decodeURIComponent(rawUrl);
      console.info("[INFO] Realizando requisição com a URL: ", url);

      const response = await fetch(url);

      if (!response.ok || !response.body) {
        console.error(
          `[ERROR] Erro ao realizar requisição: `,
          response.statusText,
        );
        return res.code(500).send({ error: "Failed to fetch target URL" });
      }

      const contentType =
        response.headers.get("content-type") || "application/octet-stream";

      console.info(`[INFO] Requisição concluída com sucesso!`);
      return res
        .code(200)
        .headers({
          "Content-Type": contentType,
          "Content-Disposition": "inline",
        })
        .send(response.body);
    } catch (err) {
      console.error("[ERROR] Erro interno: ", err);
      return res
        .code(500)
        .send({ error: "Erro interno. Tente novamente mais tarde" });
    } finally {
      console.info(`[INFO] Requisição finalizada`);
      console.groupEnd();
    }
  });
}
