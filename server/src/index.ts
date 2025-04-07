import { startServer } from "./http/server";
import { startBot } from "./ws/bot";

async function inicializarApp() {
  try {
    await Promise.all([startBot(), startServer()]);
  } catch (err) {
    console.error("Erro ao iniciar aplicação", err);
  }
}

inicializarApp();
