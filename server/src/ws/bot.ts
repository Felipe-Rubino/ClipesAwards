import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN } from "src/constants";

export const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export const startBot = async () => {
  client.once("ready", () => {
    console.log(`✅ Bot do Discord logado como ${client.user?.tag}`);
  });

  await client.login(DISCORD_TOKEN);
};
