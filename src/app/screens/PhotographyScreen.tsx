import { ChevronLeft, MapPin, Phone, Star, Zap } from "lucide-react";
import { useState } from "react";
import marriage from "../../images/marriage.png";
import babyshower from "../../images/babyshower.png";
import newborn from "../../images/newborn.png";
import prebirthday from "../../images/prebirthday.png";
import birthday from "../../images/birthday.png";
import sweet16 from "../../images/sweet16.png";
import portfolio from "../../images/portfolio.png";
import corporateparties from "../../images/corporateparties.png";
import ecommerce from "../../images/ecommerce.png";
import specialevents from "../../images/specialevents.png";

interface PhotographyVendor {
  id: number;
  name: string;
  image: string;
  filterGroup: "Wedding" | "Birthdays" | "Events" | "Portfolio";
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  serviceTypes: string[];
  deliveryTime: string;
  priceRange: string;
}

const photographyVendors: PhotographyVendor[] = [
  {
    id: 1,
    name: "LensCraft Weddings",
    image: marriage,
    filterGroup: "Wedding",
    rating: 4.9,
    reviews: 312,
    location: "South Delhi",
    distance: "4.2 km",
    serviceTypes: ["Marriage", "Cinematic Reels", "Drone Shots"],
    deliveryTime: "48-hour album preview",
    priceRange: "₹35,000 - ₹2,50,000",
  },
  {
    id: 2,
    name: "Moments by Aarya",
    image: babyshower,
    filterGroup: "Events",
    rating: 4.8,
    reviews: 184,
    location: "Noida Sector 76",
    distance: "6.5 km",
    serviceTypes: ["Baby Shower", "Event Reels", "Family Portraits"],
    deliveryTime: "Same-day highlight reel",
    priceRange: "₹12,000 - ₹75,000",
  },
  {
    id: 3,
    name: "Tiny Toes Studio",
    image: newborn,
    filterGroup: "Portfolio",
    rating: 4.9,
    reviews: 221,
    location: "Gurugram",
    distance: "8.1 km",
    serviceTypes: ["New Born", "At-home Setup", "Family Frames"],
    deliveryTime: "Studio + at-home setup",
    priceRange: "₹8,000 - ₹45,000",
  },
  {
    id: 4,
    name: "Happy Frame Co.",
    image: prebirthday,
    filterGroup: "Birthdays",
    rating: 4.7,
    reviews: 143,
    location: "West Delhi",
    distance: "5.8 km",
    serviceTypes: ["Pre Birthday", "Theme Props", "Kids Portraits"],
    deliveryTime: "Theme props included",
    priceRange: "₹10,000 - ₹60,000",
  },
  {
    id: 5,
    name: "Party Pixel Studio",
    image: birthday,
    filterGroup: "Birthdays",
    rating: 4.8,
    reviews: 205,
    location: "Saket",
    distance: "3.9 km",
    serviceTypes: ["Birthday", "On-site Edits", "Instant Prints"],
    deliveryTime: "On-site live edits",
    priceRange: "₹9,000 - ₹55,000",
  },
  {
    id: 6,
    name: "Frame 16 Studio",
    image: sweet16,
    filterGroup: "Birthdays",
    rating: 4.7,
    reviews: 118,
    location: "Dwarka",
    distance: "9.4 km",
    serviceTypes: ["Sweet 16", "Reels Package", "Event Highlights"],
    deliveryTime: "Reels package add-on",
    priceRange: "₹15,000 - ₹80,000",
  },
  {
    id: 7,
    name: "Studio Persona",
    image: portfolio,
    filterGroup: "Portfolio",
    rating: 4.9,
    reviews: 260,
    location: "Hauz Khas",
    distance: "4.7 km",
    serviceTypes: ["Portfolio", "Creative Direction", "Styling Support"],
    deliveryTime: "Creative direction included",
    priceRange: "₹18,000 - ₹1,20,000",
  },
  {
    id: 8,
    name: "Corporate Clicks",
    image: corporateparties,
    filterGroup: "Events",
    rating: 4.8,
    reviews: 166,
    location: "Connaught Place",
    distance: "7.2 km",
    serviceTypes: ["Corporate Parties", "Multi-cam", "Brand Recaps"],
    deliveryTime: "Multi-camera coverage",
    priceRange: "₹25,000 - ₹1,75,000",
  },
  {
    id: 9,
    name: "Catalog Pro Shots",
    image: ecommerce,
    filterGroup: "Portfolio",
    rating: 4.6,
    reviews: 132,
    location: "Okhla",
    distance: "10.3 km",
    serviceTypes: ["eCommerce", "Product Styling", "White BG Shots"],
    deliveryTime: "Product styling support",
    priceRange: "₹7,000 - ₹65,000",
  },
  {
    id: 10,
    name: "Occasion Lens",
    image: specialevents,
    filterGroup: "Events",
    rating: 4.8,
    reviews: 198,
    location: "Greater Noida",
    distance: "12.6 km",
    serviceTypes: ["Special Events", "Drone Shots", "Premium Album"],
    deliveryTime: "Drone shots available",
    priceRange: "₹20,000 - ₹1,50,000",
  },
];

export function PhotographyScreen({ onBack }: { onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filterCategories = ["Wedding", "Birthdays", "Events", "Portfolio", "All"];
  const filteredVendors =
    selectedCategory === "All"
      ? photographyVendors
      : photographyVendors.filter((vendor) => vendor.filterGroup === selectedCategory);

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-b from-[#F8F7FF] to-[#EFE9FF] px-6 pt-6 pb-8 rounded-b-3xl border-b border-[#E7DFFA]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6C4AB6] mb-5 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-[#2A1D52] mb-2">Photography</h1>
        <p className="text-[#5F4A96] text-sm">Book verified photographers for every occasion</p>
      </div>

      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {filterCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedCategory(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === filter
                  ? "bg-[#6C4AB6] text-white"
                  : "bg-[#F3EEFF] text-[#6C4AB6] border border-[#E0D9F0]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-2xl overflow-hidden transition-all"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.16)" }}
          >
            <div className="h-40 bg-gray-100">
              <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{vendor.name}</h3>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#6C4AB6] text-[#6C4AB6]" />
                  <span className="font-semibold text-[#1F1F1F]">{vendor.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({vendor.reviews} shoots)</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{vendor.location}</span>
                <span className="text-[#6C4AB6]">{vendor.distance}</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm text-[#1F1F1F]">
                <Zap className="w-4 h-4 text-[#6C4AB6]" />
                <span className="font-semibold">{vendor.deliveryTime}</span>
              </div>

              <div className="text-sm font-semibold text-[#1F1F1F] mb-3">{vendor.priceRange}</div>

              <div className="flex flex-wrap gap-2 mb-4">
                {vendor.serviceTypes.slice(0, 3).map((type) => (
                  <span
                    key={type}
                    className="text-xs bg-[#F3EEFF] text-[#6C4AB6] px-2 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-[#6C4AB6] to-[#8E6CD5] text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity">
                <Phone className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>
        ))}

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8A8A8A]">No packages found for this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
