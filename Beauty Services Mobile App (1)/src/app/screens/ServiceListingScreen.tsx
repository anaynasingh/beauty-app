import { ArrowLeft } from "lucide-react";
import { SalonCard } from "../components/SalonCard";
import { salons } from "../data/mockData";

interface ServiceListingScreenProps {
  serviceName: string;
  onBack: () => void;
  onSalonClick: (salonId: number) => void;
}

export function ServiceListingScreen({
  serviceName,
  onBack,
  onSalonClick,
}: ServiceListingScreenProps) {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">{serviceName}</h2>
          <p className="text-[#F3EEFF] text-sm">{salons.length} salons near you</p>
        </div>
      </div>

      {/* Salon List */}
      <div className="px-6 py-6 space-y-4">
        {salons.map((salon) => (
          <SalonCard
            key={salon.id}
            name={salon.name}
            rating={salon.rating}
            reviewCount={salon.reviewCount}
            priceRange={salon.priceRange}
            distance={salon.distance}
            offer={salon.offer}
            image={salon.image}
            onClick={() => onSalonClick(salon.id)}
          />
        ))}
      </div>
    </div>
  );
}
