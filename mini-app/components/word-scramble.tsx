"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WORDS = [
  "react",
  "typescript",
  "nextjs",
  "shadcn",
  "tailwind",
  "component",
  "state",
  "props",
  "hooks",
  "context",
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function WordScramble() {
  const [word, setWord] = useState<string>("");
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const w = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(w);
    setScrambled(shuffleArray(w.split("")));
  }, []);

  const handleLetterClick = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      const newScrambled = [...scrambled];
      [newScrambled[selectedIndex], newScrambled[index]] = [
        newScrambled[index],
        newScrambled[selectedIndex],
      ];
      setScrambled(newScrambled);
      setSelectedIndex(null);
    }
  };

  const checkAnswer = () => {
    const current = scrambled.join("");
    if (current === word) {
      setMessage("✅ Correct! 🎉");
    } else {
      setMessage("❌ Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {scrambled.map((letter, idx) => (
          <Button
            key={idx}
            variant={selectedIndex === idx ? "outline" : "ghost"}
            size="lg"
            onClick={() => handleLetterClick(idx)}
            className={cn(
              "w-12 h-12 text-2xl font-semibold",
              selectedIndex === idx && "border-2 border-primary"
            )}
          >
            {letter}
          </Button>
        ))}
      </div>
      <Button onClick={checkAnswer} className="w-32">
        Check
      </Button>
      {message && <p className="text-lg">{message}</p>}
    </div>
  );
}
