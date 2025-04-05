"use client";
import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>Hello world!</h1>
      <Button
        onClick={() => {
          alert("Fui clicado");
        }}
      >
        Clique aqui!
      </Button>
    </div>
  );
}
