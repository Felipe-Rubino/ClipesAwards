"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
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
