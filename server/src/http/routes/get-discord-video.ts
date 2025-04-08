import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

type GetDiscordVideoRequest = FastifyRequest<{
  Querystring: { url: string };
}>;

export async function getDiscordVideo(app: FastifyInstance) {
  app.get("/proxy", async (req: GetDiscordVideoRequest, res: FastifyReply) => {
    const { url: rawUrl } = req.query;
    if (!rawUrl) {
      return res.code(400).send({ error: "Missing URL parameter" });
    }

    try {
      const url = decodeURIComponent(rawUrl);
      const range = req.headers.range;
      const headers: Record<string, string> = {
        ...(range ? { Range: range } : {}),
      };

      const response = await fetch(url, { headers });

      if (!response.ok || !response.body) {
        return res.code(500).send({ error: "Failed to fetch target URL" });
      }

      const contentType =
        response.headers.get("content-type") || "application/octet-stream";
      const contentLength = response.headers.get("content-length");
      const acceptRanges = response.headers.get("accept-ranges");
      const contentRange = response.headers.get("content-range");

      res.code(response.status).headers({
        "Content-Type": contentType,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        ...(acceptRanges ? { "Accept-Ranges": acceptRanges } : {}),
        ...(contentRange ? { "Content-Range": contentRange } : {}),
        "Content-Disposition": "inline",
      });
      return res.send(response.body);
    } catch (err) {
      return res
        .code(500)
        .send({ error: "Erro interno. Tente novamente mais tarde" });
    }
  });
}
