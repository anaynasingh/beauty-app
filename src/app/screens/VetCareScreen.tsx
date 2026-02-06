import { ChevronLeft, MapPin, Star, Phone, Award } from "lucide-react";

interface VeterinaryClinic {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  services: string[];
  hours: string;
  priceRange: string;
}

interface VetCareScreenProps {
  onBack: () => void;
  onClinicClick?: (clinicId: number) => void;
}

export function VetCareScreen({ onBack, onClinicClick }: VetCareScreenProps) {
  const clinics: VeterinaryClinic[] = [
    {
      id: 1,
      name: "PawCare Veterinary Hospital",
      rating: 4.9,
      reviews: 234,
      location: "Sector 12, Noida",
      distance: "3.5 km",
      phone: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop",
      services: ["General Checkup", "Vaccination", "Surgery", "Dental Care", "Grooming"],
      hours: "9 AM - 8 PM (Open 24/7 Emergency)",
      priceRange: "₹500 - ₹25,000",
    },
    {
      id: 2,
      name: "Happy Paws Animal Clinic",
      rating: 4.8,
      reviews: 189,
      location: "Greater Kailash",
      distance: "6.2 km",
      phone: "+91 87654 32109",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=500&fit=crop",
      services: ["Preventive Care", "Lab Tests", "Ultrasound", "Pet Hotel", "Training"],
      hours: "9 AM - 7 PM (Emergency 24/7)",
      priceRange: "₹400 - ₹20,000",
    },
    {
      id: 3,
      name: "Vet Plus Advanced Care",
      rating: 4.7,
      reviews: 156,
      location: "Connaught Place",
      distance: "9.8 km",
      phone: "+91 76543 21098",
      image: "https://content.jdmagicbox.com/comp/delhi/64/011p101064/catalogue/dr-a-k-rajput-mayur-vihar-phase-1-delhi-veterinary-doctors-m0wfk1g3mc.jpg",
      services: ["Emergency Surgery", "Cardiology", "Oncology", "Dermatology", "Pet Spa"],
      hours: "8 AM - 9 PM (Emergency 24/7)",
      priceRange: "₹1,000 - ₹50,000",
    },
    {
      id: 4,
      name: "Furry Friends Veterinary Centre",
      rating: 4.6,
      reviews: 142,
      location: "Dwarka",
      distance: "12.5 km",
      phone: "+91 65432 10987",
      image: "https://tse2.mm.bing.net/th/id/OIP.EIrSGT6iCNyMP6CxGbT7hgHaEc?rs=1&pid=ImgDetMain&o=7&rm=3",
      services: ["Checkups", "Vaccination", "Deworming", "Microchipping", "Consultation"],
      hours: "10 AM - 6 PM (Emergency available)",
      priceRange: "₹300 - ₹15,000",
    },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#FF9F6A] to-[#FF7A4D] px-6 pt-6 pb-8 rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-6 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Vet Care</h1>
        <p className="text-white text-sm opacity-90">Professional veterinary care for your pets</p>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        {["All", "24/7 Emergency", "Specialized", "Near Me"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              filter === "All"
                ? "bg-[#FF9F6A] text-white"
                : "bg-[#FFE6D5] text-[#FF7A4D]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Clinics List */}
      <div className="px-6 pb-6 space-y-4">
        {clinics.map((clinic) => (
          <button
            key={clinic.id}
            onClick={() => onClinicClick?.(clinic.id)}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all"
            style={{ boxShadow: "0 2px 12px rgba(255, 159, 106, 0.15)" }}
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-200">
              <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">{clinic.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FF9F6A] text-[#FF9F6A]" />
                  <span className="font-semibold text-[#1F1F1F]">{clinic.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({clinic.reviews} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-3 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span>{clinic.location}</span>
                <span className="text-[#FF7A4D]">{clinic.distance}</span>
              </div>

              {/* Hours */}
              <div className="text-sm text-[#1F1F1F] font-semibold mb-3">
                {clinic.hours}
              </div>

              {/* Price Range */}
              <div className="text-sm text-[#8A8A8A] mb-3">
                Consultation: {clinic.priceRange}
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-3">
                {clinic.services.slice(0, 3).map((service, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#FFE6D5] text-[#FF7A4D] px-2 py-1 rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {clinic.services.length > 3 && (
                  <span className="text-xs bg-[#FFE6D5] text-[#FF7A4D] px-2 py-1 rounded-full">
                    +{clinic.services.length - 3} more
                  </span>
                )}
              </div>

              {/* Contact Button */}
              <button className="w-full bg-gradient-to-r from-[#FF9F6A] to-[#FF7A4D] text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity">
                <Phone className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
