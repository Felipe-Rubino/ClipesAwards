import {
  ClipesList,
  ClipesListSkeleton,
} from "@/components/clipes-list/clipes-list";
import { Header } from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Home() {
  const LINK_SERVER =
    "https://discord.com/channels/818529146635681793/1145570523330379917";
  return (
    <div className="antialiased mx-12 py-6">
      <Header />
      <main>
        <section>
          <div className="mb-12 space-y-1">
            <h2 className="scroll-m-20 text-xl font-bold">Clipes Recentes</h2>
            <p className="text-sm text-muted-foreground">
              Você também pode enviar seus próprios clipes para ser votados.
              Basta enviar no{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary"
                href={LINK_SERVER}
              >
                canal de clipes
              </Link>{" "}
              do servidor do Discord.
            </p>
            <Separator className="my-4" />
          </div>
          <Suspense fallback={<ClipesListSkeleton />}>
            <ClipesList />
          </Suspense>
        </section>
      </main>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
