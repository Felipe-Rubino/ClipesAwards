import { Attachment, Message } from "discord.js";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getCursors, getMessagesFromClipsChannel } from "src/ws/get-all-clips";

type GetAllClipsRequest = FastifyRequest<{
  Querystring: { cursor: string | null; direction: DirectionCursor };
}>;
export type MessageWithAttachment = {
  message: Message;
  attachment: Attachment;
};
export type DirectionCursor = "forward" | "backward";

export async function getAllClips(app: FastifyInstance) {
  app.get("/clips", async (req: GetAllClipsRequest, res: FastifyReply) => {
    console.group("[getAllClips]");
    console.log(`[INFO] Requisição recebida`);
    try {
      const { cursor, direction } = req.query;

      // const period = {
      //   startDate: new Date(new Date().getFullYear(), 0, 1), // 01/01/2024
      //   endDate: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59), // 31/12/2025
      // };

      const messages = await getMessagesFromClipsChannel(cursor, 15, direction);

      const [clips, cursors] = await Promise.all([
        messages.map(mapMessageToClips),
        getCursors(messages, direction),
      ]);

      const { prevCursor, nextCursor } = cursors;

      const responseBody = {
        prevCursor,
        nextCursor,
        pageSize: clips.length,
        data: clips,
      };

      return res.code(200).send(responseBody);
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

function mapMessageToClips({ message, attachment }: MessageWithAttachment) {
  const { createdTimestamp, author, id } = message;

  return {
    clip_id: attachment.id,
    posted_at: new Date(createdTimestamp).toISOString(),
    video_src: attachment.url,
    user: {
      name: author.globalName,
      avatar_url: author.avatarURL(),
    },
    message_id: id,
  };
}
