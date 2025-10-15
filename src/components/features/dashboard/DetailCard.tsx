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
  return (
    <div className="flex flex-col gap-4 p-4">
      <img
        src={imageUrl}
        alt={item.theme_word || "vision board image"}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/800x450/6b7280/ffffff?text=Image+Not+Found`;
        }}
      />
      <p className="text-sm text-gray-500 flex items-center mb-3">
        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
        {editDate}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">
        {item.theme_word}
      </h2>
      <p className="text-sm text-gray-500 flex items-center mb-3">
        {item.generated_text}
      </p>
    </div>
  );
}
