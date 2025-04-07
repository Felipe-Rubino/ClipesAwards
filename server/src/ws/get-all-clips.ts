import { ID_CANAL_CLIPES } from "src/constants";
import { client } from "./bot";
import { Attachment } from "discord.js";

export async function getMessagesFromClipsChannel(fetchSize: number = 9) {
  const channel = client.channels.cache.get(ID_CANAL_CLIPES);
  if (!channel || !channel.isTextBased()) {
    throw new Error(`Text-based channel with id ${ID_CANAL_CLIPES} not found`);
  }
  const startDate = new Date(new Date().getFullYear(), 0, 1);
  const endDate: Date = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);

  const collectedMessages: any[] = [];
  let message = await channel.messages
    .fetch({ limit: 1 })
    .then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));

  if (!message) {
    throw new Error(`No messages found in channel with id ${ID_CANAL_CLIPES}`);
  }

  const hasVideo = message.attachments.some((att: Attachment) =>
    att.contentType?.startsWith("video/"),
  );

  if (hasVideo) {
    message.attachments.forEach((attachment) => {
      const msgWithAttachment = {
        ...message,
        attachment,
      };
      collectedMessages.push(msgWithAttachment);
    });
  }

  while (collectedMessages.length < fetchSize) {
    await channel.messages
      .fetch({ limit: 100, before: message.id })
      .then((messagePage) => {
        messagePage.forEach((msg) => {
          if (collectedMessages.length >= fetchSize) return;

          const createdAt = new Date(msg.createdTimestamp);
          const isInPeriod = createdAt >= startDate && createdAt <= endDate;
          if (!isInPeriod || msg.attachments.size === 0) return;

          const hasVideo = msg.attachments.some((att: Attachment) =>
            att.contentType?.startsWith("video/"),
          );

          if (hasVideo) {
            msg.attachments.forEach((attachment) => {
              const msgWithAttachment = {
                ...msg,
                attachment,
              };
              collectedMessages.push(msgWithAttachment);
            });
          }
        });

        message =
          messagePage.size > 0 ? messagePage.at(messagePage.size - 1) : null;
      });
  }

  return collectedMessages;
}
