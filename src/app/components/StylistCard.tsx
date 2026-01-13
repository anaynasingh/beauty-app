import React from "react";
import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StylistCardProps {
  name: string;
  photo?: string;
  specialty?: string;
  rating?: number;
  onClick?: () => void;
}

export function StylistCard({ name, photo, specialty, rating, onClick }: StylistCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-40 bg-white rounded-2xl overflow-hidden p-3 active:scale-95 transition-all shadow-lg"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <ImageWithFallback
            src={photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-sm text-[#1F1F1F] font-medium text-center">{name}</div>
        {specialty && <div className="text-xs text-[#8A8A8A]">{specialty}</div>}
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3.5 h-3.5 fill-[#E6C97A] text-[#E6C97A]" />
          <span className="text-xs text-[#1F1F1F]">{rating ?? "--"}</span>
        </div>
        <div className="mt-2 w-full">
          <button className="w-full bg-[#6C4AB6] text-white text-xs py-1 rounded-lg">Book with Artist</button>
        </div>
      </div>
    </button>
  );
}
