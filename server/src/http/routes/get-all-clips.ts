import { Attachment, Message } from "discord.js";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getMessagesFromClipsChannel } from "src/ws/get-all-clips";

type GetAllClipsRequest = FastifyRequest<{
  Querystring: { cursor?: string };
}>;

export async function getAllClips(app: FastifyInstance) {
  app.get("/clips", async (req: GetAllClipsRequest, res: FastifyReply) => {
    console.group("[getAllClips]");
    console.log(`[INFO] Requisição recebida`);
    try {
      const { cursor } = req.query;
      console.log(cursor);

      const messages = await getMessagesFromClipsChannel(9, cursor);
      const clips = messages.map((message) => mapMessageToClips(message));

      if (cursor && clips.length > 0 && clips[0].message_id === cursor) {
        clips.shift();
      }

      let nextCursor = null;
      if (clips.length > 0) {
        nextCursor = clips[clips.length - 1].message_id;
      }

      const responseBody = {
        nextCursor,
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

type MessageWithAttachment = Message & {
  attachment: Attachment;
};
function mapMessageToClips(message: MessageWithAttachment) {
  const { createdTimestamp, author, attachment, id } = message;

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
