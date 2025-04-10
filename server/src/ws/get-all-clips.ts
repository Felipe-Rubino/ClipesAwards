import { ID_CANAL_CLIPES } from "src/constants";
import { client } from "./bot";
import { Attachment, Message } from "discord.js";

export async function getMessagesFromClipsChannel(
  fetchSize: number = 9,
  beforeMessageId?: string,
  startDate?: Date,
  endDate?: Date,
) {
  const channel = client.channels.cache.get(ID_CANAL_CLIPES);
  if (!channel || !channel.isTextBased()) {
    throw new Error(`Text-based channel with id ${ID_CANAL_CLIPES} not found`);
  }
  const startDateFilter: Date =
    startDate || new Date(new Date().getFullYear(), 0, 1);
  const endDateFilter: Date =
    endDate || new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);

  const collectedMessages: any[] = [];
  let message: Message | null | undefined = null;

  if (beforeMessageId) {
    message = await channel.messages.fetch(beforeMessageId).catch(() => null);
  } else {
    message = await channel.messages
      .fetch({ limit: 1 })
      .then((messagePage) =>
        messagePage.size === 1 ? messagePage.at(0) : null,
      );
  }

  if (!message) {
    throw new Error(`No messages found in channel with id ${ID_CANAL_CLIPES}`);
  }

  const hasVideo = message.attachments.some((att: Attachment) =>
    att.contentType?.startsWith("video/"),
  );

  if (hasVideo) {
    message.attachments.forEach((attachment: Attachment) => {
      const msgWithAttachment = {
        ...message,
        attachment,
      };
      collectedMessages.push(msgWithAttachment);
    });
  }

  while (collectedMessages.length < fetchSize && message) {
    const messagePage: any = await channel.messages.fetch({
      limit: 100,
      before: message.id,
    });

    for (const msg of messagePage.values()) {
      if (collectedMessages.length >= fetchSize) break;

      const createdAt = new Date(msg.createdTimestamp);
      const isInPeriod =
        createdAt >= startDateFilter && createdAt <= endDateFilter;
      if (!isInPeriod || msg.attachments.size === 0) continue;

      const hasVideo = msg.attachments.some((att: Attachment) =>
        att.contentType?.startsWith("video/"),
      );

      if (hasVideo) {
        msg.attachments.forEach((attachment: Attachment) => {
          if (collectedMessages.length < fetchSize) {
            collectedMessages.push({
              ...msg,
              attachment,
            });
          }
        });
      }
    }

    message =
      messagePage.size > 0
        ? (messagePage.at(messagePage.size - 1) ?? null)
        : null;
  }

  return collectedMessages;
}
