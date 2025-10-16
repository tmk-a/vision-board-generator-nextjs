"use client";

import { GeneratedItemsData } from "@/types/index";
import { Calendar } from "lucide-react";

interface DetailCardProps {
  item: GeneratedItemsData;
  imageUrl: string | undefined;
  editDate: string;
}

export default function DetailCard({
  item,
  imageUrl,
  editDate,
}: DetailCardProps) {
  let words: string[] = [];
  if (item.generated_text) words = item.generated_text.split(",");

  return (
    <div className="flex flex-col gap-4 p-4">
      <img
        src={imageUrl}
        alt={item.theme_word || "vision board image"}
        className="w-full h-full object-cover"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/800x450/6b7280/ffffff?text=Image+Not+Found`;
        }}
      />
      <div className="flex content-between">
        <p className="text-sm text-gray-500 flex items-center mb-3">
          <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
          {editDate}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-baseline">
          <p className="text-md text-gray-500 flex items-center mb-3">Theme:</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">
            {item.theme_word}
          </h2>
        </div>
        <div>
          <p className="text-md text-gray-500 flex items-center mb-3">Words:</p>
          <ul className="pl-8">
            {words.length > 0
              ? words.map((word, index) => (
                  <li key={`${editDate}-${index}`}>
                    <p className="text-md text-gray-900 flex items-center mb-3">
                      {word}
                    </p>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
