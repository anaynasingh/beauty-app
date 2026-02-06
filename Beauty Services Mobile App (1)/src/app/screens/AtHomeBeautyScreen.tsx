import { ChevronLeft, MapPin, Star, Phone } from "lucide-react";

interface AtHomeBeautyProvider {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  specialties: string[];
  experience: number;
  availableToday: boolean;
}

interface AtHomeBeautyScreenProps {
  onBack: () => void;
  onProviderClick?: (providerId: number) => void;
}

export function AtHomeBeautyScreen({ onBack, onProviderClick }: AtHomeBeautyScreenProps) {
  const providers: AtHomeBeautyProvider[] = [
    {
      id: 1,
      name: "Priya's Beauty Services",
      rating: 4.8,
      reviews: 245,
      location: "Sector 12, Noida",
      distance: "2.5 km",
      phone: "+91 98765 43210",
      image: "https://health-routes.co.uk/wp-content/uploads/2023/05/4.jpg",
      specialties: ["Hair", "Makeup", "Facial", "Waxing"],
      experience: 8,
      availableToday: true,
    },
    {
      id: 2,
      name: "Glamour Home Salon",
      rating: 4.7,
      reviews: 189,
      location: "Indirapuram",
      distance: "4.2 km",
      phone: "+91 87654 32109",
      image: "https://tse1.explicit.bing.net/th/id/OIP.TMOW8Fm5WEd9A6S66BE4bgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      specialties: ["Bridal Makeup", "Hair Color", "Nails", "Threading"],
      experience: 6,
      availableToday: false,
    },
    {
      id: 3,
      name: "Radiant Beauty at Home",
      rating: 4.9,
      reviews: 312,
      location: "Dwarka",
      distance: "5.8 km",
      phone: "+91 76543 21098",
      image: "https://www.glamoureyebrowmason.com/wp-content/uploads/2021/02/Hands.jpg",
      specialties: ["Skincare", "Facial", "Massage", "Makeup"],
      experience: 10,
      availableToday: true,
    },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#FF6B9D] to-[#E64980] px-6 pt-6 pb-8 rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-6 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">At Home Beauty Services</h1>
        <p className="text-white text-sm opacity-90">Professional beauty at your doorstep</p>
      </div>

      {/* Providers List */}
      <div className="px-6 py-6 space-y-4">
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onProviderClick?.(provider.id)}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all w-full flex flex-col h-96"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
              {provider.availableToday && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Available Today
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{provider.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{provider.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({provider.reviews} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-1 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{provider.location}</span>
                <span className="text-[#FF6B9D]">{provider.distance}</span>
              </div>

              {/* Experience */}
              <div className="text-xs text-[#8A8A8A] mb-2">
                {provider.experience} years of experience
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-auto">
                {provider.specialties.slice(0, 3).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#F3EEFF] text-[#6C4AB6] px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Contact Button */}
              <button className="w-full bg-gradient-to-r from-[#FF6B9D] to-[#E64980] text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mt-auto">
                <Phone className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
