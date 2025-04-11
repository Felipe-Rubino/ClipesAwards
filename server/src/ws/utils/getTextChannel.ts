import { Client } from "discord.js";

export function getTextChannel(client: Client, channelId: string) {
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    throw new Error(`Channel with id ${channelId} not found`);
  }
  if (!channel.isTextBased()) {
    throw new Error(`Channel with id ${channelId} is not a text channel`);
  }

  return channel;
}
