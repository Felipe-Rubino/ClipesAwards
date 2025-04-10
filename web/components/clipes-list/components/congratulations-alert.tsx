"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-blast";
export default function CongratulationsAlert() {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setModalOpen}>
      <AlertDialogContent className="flex flex-col items-center justify-center gap-12 px-12">
        <ConfettiExplosion zIndex={9999} />
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center justify-center gap-4">
            <span className="text-6xl ">🎉</span>
            <span className="text-2xl font-semibold">
              Parabéns, você viu todos os clipes!
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-center justify-center text-center">
            Foi uma longa jornada até aqui. Aproveite o momento e descanse um
            pouco.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Valeu!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
