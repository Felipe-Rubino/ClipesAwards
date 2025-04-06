"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { useState } from "react";

type VoteType = "upvote" | "downvote";

export default function VotesComponent() {
  const [votes, setVotes] = useState(0);
  const [value, setValue] = useState("");

  const increment = () => setVotes((prevCount) => prevCount + 1);
  const decrement = () => setVotes((prevCount) => prevCount - 1);

  const handleVote = (value: VoteType) => {
    if (value) setValue(value);
    if (value === "upvote") {
      increment();
    } else if (value === "downvote") {
      decrement();
    }
  };

  return (
    <div className="flex items-center  mt-2">
      <ToggleGroup
        size={"sm"}
        type="single"
        value={value}
        onValueChange={handleVote}
      >
        <ToggleGroupItem
          value="upvote"
          aria-label="Toggle upvote"
          className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
        >
          <ArrowUp className="h-4 w-4" />
        </ToggleGroupItem>
        <span className="mx-2 text font-bold">{votes}</span>
        <ToggleGroupItem
          value="downvote"
          aria-label="Toggle downvote"
          className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
        >
          <ArrowDown className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
