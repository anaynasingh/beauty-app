import { ArrowLeft, Star, MapPin, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { salons } from "../data/mockData";

interface SalonDetailScreenProps {
  salonId: number;
  onBack: () => void;
  onBookNow: (salonId: number) => void;
}

const imageMap: Record<string, string> = {
  "salon-interior": "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NjExMDkwOXww&ixlib=rb-4.1.0&q=80&w=1080",
  "beauty-salon": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjYxMjE1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "barber-shop": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBzaG9wfGVufDF8fHx8MTc2NjA4NjkxMnww&ixlib=rb-4.1.0&q=80&w=1080",
};

export function SalonDetailScreen({
  salonId,
  onBack,
  onBookNow,
}: SalonDetailScreenProps) {
  const salon = salons.find((s) => s.id === salonId);
  const [activeTab, setActiveTab] = useState<"services" | "reviews" | "offers" | "about">("services");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("favoriteSalons");
      const favs: number[] = raw ? JSON.parse(raw) : [];
      setIsFavorite(favs.includes(salonId));
    } catch (e) {
      setIsFavorite(false);
    }
  }, [salonId]);

  function toggleFavorite() {
    try {
      const raw = localStorage.getItem("favoriteSalons");
      const favs: number[] = raw ? JSON.parse(raw) : [];
      let next: number[];
      if (favs.includes(salonId)) {
        next = favs.filter((id) => id !== salonId);
        setIsFavorite(false);
      } else {
        next = [...favs, salonId];
        setIsFavorite(true);
      }
      localStorage.setItem("favoriteSalons", JSON.stringify(next));
    } catch (e) {
      // ignore localStorage failures
    }
  }

  if (!salon) return null;

  const images = [salon.image, salon.image, salon.image]; // Mock multiple images

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
        </button>

        {/* Image Gallery */}
        <div className="relative h-64">
          <ImageWithFallback
            src={imageMap[images[currentImageIndex]] || imageMap["salon-interior"]}
            alt={salon.name}
            className="w-full h-full object-cover"
          />
          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "text-[#FF4D6D] fill-[#FF4D6D]" : "text-[#1F1F1F]"}`} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 text-[#1F1F1F]" />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 text-[#1F1F1F]" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full ${
                      idx === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Salon Info */}
      <div className="px-6 py-4">
        <h2 className="text-[#1F1F1F] text-xl mb-2">{salon.name}</h2>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#E6C97A] text-[#E6C97A]" />
            <span className="text-sm text-[#1F1F1F]">{salon.rating}</span>
            <span className="text-sm text-[#8A8A8A]">({salon.reviewCount} reviews)</span>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm text-[#8A8A8A]">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{salon.address}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[rgba(108,74,182,0.1)]">
        <div className="flex px-6">
          {(["services", "reviews", "offers", "about"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 capitalize relative ${
                activeTab === tab ? "text-[#6C4AB6]" : "text-[#8A8A8A]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C4AB6]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-6">
        {activeTab === "services" && (
          <div className="space-y-3">
            {salon.services.map((service) => (
              <div
                key={service.id}
                className="bg-[#F3EEFF] rounded-xl p-4"
                style={{ boxShadow: "0 2px 8px rgba(108, 74, 182, 0.04)" }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-[#1F1F1F] mb-1">{service.name}</h4>
                    <p className="text-sm text-[#8A8A8A]">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#6C4AB6]">₹{service.price}</p>
                    {service.mrp && (
                      <p className="text-xs text-[#8A8A8A] line-through">
                        ₹{service.mrp}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-3">
            {salon.reviews && salon.reviews.length > 0 ? (
              salon.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#F3EEFF] rounded-xl p-4"
                  style={{ boxShadow: "0 2px 8px rgba(108, 74, 182, 0.04)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[#1F1F1F] mb-1">{review.author}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < review.rating ? "text-[#E6C97A]" : "text-[#D0D0D0]"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#8A8A8A] leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#8A8A8A]">
                <p>No reviews yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "offers" && salon.offer && (
          <div className="bg-[#F3EEFF] rounded-xl p-4">
            <p className="text-[#6C4AB6]">{salon.offer}</p>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-[#1F1F1F] mb-2 font-medium">About</h3>
              <p className="text-sm text-[#8A8A8A] leading-relaxed">
                {salon.about}
              </p>
            </div>
            <div className="border-t pt-4">
              <h3 className="text-[#1F1F1F] mb-2 font-medium">Location</h3>
              <p className="text-sm text-[#8A8A8A]">{salon.address}</p>
            </div>
            <div className="border-t pt-4">
              <h3 className="text-[#1F1F1F] mb-2 font-medium">Hours</h3>
              <p className="text-sm text-[#8A8A8A]">
                Mon - Fri: 10:00 AM - 8:00 PM<br />
                Sat - Sun: 10:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Book Now Button */}
      <div className="fixed bottom-16 left-0 right-0 px-6 py-4 bg-white border-t border-[rgba(108,74,182,0.1)]">
        <button
          onClick={() => onBookNow(salon.id)}
          className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 active:scale-[0.98] transition-all"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
