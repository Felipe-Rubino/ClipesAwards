"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function ClipeItem() {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2.5 mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/arawns1.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-sm flex flex-col items-start flex-nowrap">
          <span className="font-semibold leading-4">Arawns</span>
          <span className="text-gray-500">há 10 minutos</span>
        </div>
      </div>

      <video controls width="100%" className="rounded-md">
        <source
          src="https://cdn.discordapp.com/attachments/1145570523330379917/1358101550265794880/clipe.mp4?ex=67f29e21&is=67f14ca1&hm=6d8c26205295c7fcd04aca932fbd008fec5ee08ea89627bebd43e7ee73627fb1&"
          type="video/*"
        />
      </video>
      <div className="flex items-center  mt-2">
        <ToggleGroup size={"sm"} type="single">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <ArrowUp className="h-4 w-4" />
          </ToggleGroupItem>
          <span className="mx-2 text font-bold">0</span>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <ArrowDown className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
