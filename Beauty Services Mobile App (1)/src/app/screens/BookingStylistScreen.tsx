import { ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { salons } from "../data/mockData";

interface BookingStylistScreenProps {
  salonId: number;
  onBack: () => void;
  onContinue: (stylistId: number) => void;
}

const stylistImages: Record<string, string> = {
  "stylist-woman": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN0eWxpc3R8ZW58MXx8fHwxNzY2MTQ2NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "stylist-man": "https://images.unsplash.com/photo-1604355240616-5e907f42b431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYmFyYmVyfGVufDF8fHx8MTc2NjE0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
};

export function BookingStylistScreen({
  salonId,
  onBack,
  onContinue,
}: BookingStylistScreenProps) {
  const salon = salons.find((s) => s.id === salonId);
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);

  if (!salon) return null;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">Pick Your Stylist</h2>
          <p className="text-[#F3EEFF] text-sm">{salon.name}</p>
        </div>
      </div>

      {/* Stylists */}
      <div className="px-6 py-6 space-y-3">
        {salon.stylists.map((stylist) => (
          <button
            key={stylist.id}
            onClick={() => setSelectedStylist(stylist.id)}
            className={`w-full rounded-xl p-4 flex items-center gap-4 transition-all ${
              selectedStylist === stylist.id
                ? "bg-[#F3EEFF] border-2 border-[#6C4AB6]"
                : "bg-white border-2 border-transparent"
            }`}
            style={{ boxShadow: "0 2px 8px rgba(108, 74, 182, 0.04)" }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={stylistImages[stylist.photo] || stylistImages["stylist-woman"]}
                alt={stylist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-[#1F1F1F] mb-1">{stylist.name}</h4>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-3.5 h-3.5 fill-[#E6C97A] text-[#E6C97A]" />
                <span className="text-sm text-[#1F1F1F]">{stylist.rating}</span>
              </div>
              <p className="text-sm text-[#8A8A8A]">{stylist.experience}</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedStylist === stylist.id
                  ? "bg-[#6C4AB6] border-[#6C4AB6]"
                  : "border-[#8A8A8A]"
              }`}
            >
              {selectedStylist === stylist.id && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-16 left-0 right-0 px-6 py-4 bg-white border-t border-[rgba(108,74,182,0.1)]">
        <button
          onClick={() => selectedStylist && onContinue(selectedStylist)}
          disabled={!selectedStylist}
          className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
