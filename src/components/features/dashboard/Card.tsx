"use client";

import { GeneratedItemsData } from "@/types/index";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface CardProps {
  data: GeneratedItemsData;
  imageUrl: string | undefined;
  editDate: string;
}
export default function Card({ data, imageUrl, editDate }: CardProps) {
  return (
    <Link
      href={`/vision/${data.id}`}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={data.theme_word || "vision board image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/800x450/6b7280/ffffff?text=Image+Not+Found`;
          }}
        />
      </div>

      <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">
            {data.theme_word}
          </h2>
          <p className="text-sm text-gray-500 flex items-center mb-3">
            <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
            {editDate}
          </p>
        </div>

        <div className="text-indigo-600 font-semibold mt-4 flex items-center justify-end">
          Detail &rarr;
        </div>
      </div>
    </Link>
  );
}
