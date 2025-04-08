import { flag } from "flags/next";

export const votesComponentFlag = flag<boolean>({
  key: "votes-component-flag",
  description: "Mostrar os votos (VoteComponent) nos cards dos clipes",
  decide() {
    return false;
  },
});
