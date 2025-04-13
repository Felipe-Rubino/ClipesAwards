import { Message } from "discord.js";

export type MessageFilter = (message: Message) => boolean;

export const filterHasAttachments: MessageFilter = (msg) =>
  msg.attachments.size > 0;

export const filterByAttachmentType =
  (extension: string): MessageFilter =>
  (msg) =>
    msg.attachments.some((att) => att.contentType!.startsWith(extension));
