import { Star, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SalonCardProps {
  name: string;
  rating: number;
  reviewCount?: number;
  priceRange: string;
  distance: string;
  offer?: string;
  image: string;
  onClick: () => void;
  horizontal?: boolean;
}

  const imageMap: Record<string, string> = {
  "salon-interior": "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NjExMDkwOXww&ixlib=rb-4.1.0&q=80&w=1080",
  "beauty-salon": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjYxMjE1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "barber-shop": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBzaG9wfGVufDF8fHx8MTc2NjA4NjkxMnww&ixlib=rb-4.1.0&q=80&w=1080",
};

  // allow passing either a key (mapped above) or a direct image URL
  const resolveImage = (img: string) => {
    if (!img) return imageMap["salon-interior"];
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    return imageMap[img] || imageMap["salon-interior"];
  };

export function SalonCard({
  name,
  rating,
  reviewCount,
  priceRange,
  distance,
  offer,
  image,
  onClick,
  horizontal = false,
}: SalonCardProps) {
  if (horizontal) {
    return (
      <button
        onClick={onClick}
        className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden active:scale-95 transition-all"
        style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
      >
        <div className="relative h-32">
          <ImageWithFallback
            src={resolveImage(image)}
            alt={name}
            className="w-full h-full object-cover"
          />
          {offer && (
            <div className="absolute top-2 left-2 bg-[#E6C97A] text-[#1F1F1F] px-2 py-1 rounded-md text-xs max-w-[10rem] truncate">
              {offer}
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-sm text-[#1F1F1F]">{name}</h4>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#E6C97A] text-[#E6C97A]" />
              <span className="text-xs text-[#1F1F1F]">{rating}</span>
              {reviewCount && (
                <span className="text-xs text-[#8A8A8A]">({reviewCount})</span>
              )}
            </div>
            <span className="text-xs text-[#8A8A8A]">{priceRange}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#8A8A8A]" />
            <span className="text-xs text-[#8A8A8A]">{distance}</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl overflow-hidden active:scale-[0.98] transition-all"
      style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
    >
      <div className="relative h-40">
        <ImageWithFallback
          src={resolveImage(image)}
          alt={name}
          className="w-full h-full object-cover"
        />
        {offer && (
          <div className="absolute top-3 left-3 bg-[#E6C97A] text-[#1F1F1F] px-3 py-1.5 rounded-lg text-xs">
            Offer
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-[#1F1F1F]">{name}</h4>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#E6C97A] text-[#E6C97A]" />
            <span className="text-sm text-[#1F1F1F]">{rating}</span>
            {reviewCount && (
              <span className="text-sm text-[#8A8A8A]">({reviewCount})</span>
            )}
          </div>
          <span className="text-sm text-[#8A8A8A]">{priceRange}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-[#8A8A8A]" />
          <span className="text-sm text-[#8A8A8A]">{distance}</span>
        </div>
        {offer && (
          <div className="mt-3 text-xs text-[#6C4AB6] bg-[#F3EEFF] rounded-lg px-3 py-2">
            {offer}
          </div>
        )}
      </div>
    </button>
  );
}
