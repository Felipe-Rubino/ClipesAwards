"use client";
import {
  ClipesList,
  ClipesListSkeleton,
} from "@/components/clipes-list/clipes-list";
import { Header } from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import { useFetchAllClipes } from "@/hooks/useFetchAllClipes";
import Link from "next/link";

export default function Home() {
  const LINK_SERVER =
    "https://discord.com/channels/818529146635681793/1145570523330379917";
  const clipesData = useFetchAllClipes();

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

          {clipesData ? (
            <ClipesList data={clipesData} />
          ) : (
            <ClipesListSkeleton />
          )}
        </section>
      </main>
    </div>
  );
}
