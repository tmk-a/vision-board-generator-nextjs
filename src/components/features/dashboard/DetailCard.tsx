"use client";

import { GeneratedItemsData } from "@/types/index";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, convertDateToLocal } from "@/services/date";
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

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nowDate = formatDate(convertDateToLocal(new Date()));
      a.href = url;
      a.download = `${item.theme_word}_${nowDate}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

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
      <div className="flex content-center">
        <p className="text-sm text-gray-500 flex items-center">
          <Calendar className="w-4 h-4 text-indigo-500" />
          {editDate}
        </p>
        {imageUrl && (
          <Button
            variant={"link"}
            className="cursor-pointer"
            onClick={() => handleDownload(imageUrl)}
          >
            <Download />
          </Button>
        )}
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
