"use client";
import React, { useState } from "react";

interface UserAvatarProps {
  name?: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const UserAvatar = ({
  name = "Guest",
  imageUrl,
  size = "md",
}: UserAvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-2xl",
    xl: "w-24 h-24 text-4xl",
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const getBackgroundColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const shouldShowImage = imageUrl && !imageError;
  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name || "");

  return (
    <div
      className={`${
        sizeClasses[size]
      } rounded-full overflow-hidden flex items-center justify-center ${
        shouldShowImage ? "" : `${bgColor} text-white font-semibold`
      }`}
    >
      {shouldShowImage ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default UserAvatar;
