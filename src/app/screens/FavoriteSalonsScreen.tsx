import { ArrowLeft, Star, MapPin, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

interface Salon {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  distance: string;
  image: string;
}

interface FavoriteSalonsScreenProps {
  salons: Salon[];
  onBack: () => void;
  onSalonClick: (salonId: number) => void;
}

export function FavoriteSalonsScreen({
  salons,
  onBack,
  onSalonClick,
}: FavoriteSalonsScreenProps) {
  const { t } = useLanguage();
  const [favoriteSalonIds, setFavoriteSalonIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("favoriteSalons");
      const favs: number[] = raw ? JSON.parse(raw) : [];
      setFavoriteSalonIds(favs);
    } catch {
      setFavoriteSalonIds([]);
    }
  }, []);

  const favoritedSalons = salons.filter((salon) =>
    favoriteSalonIds.includes(salon.id)
  );

  const toggleFavorite = (salonId: number) => {
    try {
      const raw = localStorage.getItem("favoriteSalons");
      const favs: number[] = raw ? JSON.parse(raw) : [];
      let next: number[];
      if (favs.includes(salonId)) {
        next = favs.filter((id) => id !== salonId);
      } else {
        next = [...favs, salonId];
      }
      localStorage.setItem("favoriteSalons", JSON.stringify(next));
      setFavoriteSalonIds(next);
    } catch {
      // ignore localStorage failures
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">{t("favoriteSalons")}</h2>
          <p className="text-[#F3EEFF] text-sm">
            Your saved salons & artists
          </p>
        </div>
      </div>

      <div className="px-6 py-6">
        {favoritedSalons.length > 0 ? (
          <div className="space-y-4">
            {favoritedSalons.map((salon) => (
              <div
                key={salon.id}
                className="bg-white rounded-xl overflow-hidden"
                style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
              >
                {/* Salon Image */}
                <div className="relative h-48 bg-[#F3EEFF]">
                  <img
                    src={salon.image}
                    alt={salon.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NjExMDkwOXww&ixlib=rb-4.1.0&q=80&w=1080";
                    }}
                  />
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(salon.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart
                      className="w-5 h-5 text-[#FF4D6D] fill-[#FF4D6D]"
                    />
                  </button>
                </div>

                {/* Salon Info */}
                <div className="p-4">
                  <button
                    onClick={() => onSalonClick(salon.id)}
                    className="text-left w-full"
                  >
                    <h3 className="text-[#1F1F1F] text-lg mb-1 hover:text-[#6C4AB6] transition-colors">
                      {salon.name}
                    </h3>
                  </button>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#E6C97A] text-[#E6C97A]" />
                      <span className="text-sm text-[#1F1F1F]">
                        {salon.rating}
                      </span>
                      <span className="text-sm text-[#8A8A8A]">
                        ({salon.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-[#6C4AB6]" />
                      <span className="text-[#8A8A8A]">{salon.distance}</span>
                    </div>
                    <div className="text-sm text-[#8A8A8A]">
                      {salon.priceRange}
                    </div>
                  </div>

                  <button
                    onClick={() => onSalonClick(salon.id)}
                    className="w-full bg-[#6C4AB6] text-white rounded-lg py-2 text-sm hover:bg-[#5A3A9F] transition-colors"
                  >
                    View Salon
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-[#8A8A8A] mx-auto mb-4" />
            <h3 className="text-[#1F1F1F] mb-2">No Favorite Salons</h3>
            <p className="text-sm text-[#8A8A8A]">
              Heart your favorite salons to see them here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
