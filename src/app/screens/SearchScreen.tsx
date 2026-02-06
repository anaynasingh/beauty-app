import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { useState } from "react";
import { SalonCard } from "../components/SalonCard";
import { Input } from "../components/ui/input";
import { salons } from "../data/mockData";

interface SearchScreenProps {
  onSalonClick: (salonId: number) => void;
  initialQuery?: string;
}

export function SearchScreen({ onSalonClick, initialQuery = "" }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = ["Near Me", "Male", "Female", "Unisex", "Budget", "Premium", "Luxury"];

  // Filter logic
  const getFilteredSalons = () => {
    let filtered = salons;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((salon) =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // If no selected filters, show all
    if (selectedFilters.length === 0) {
      return filtered;
    }

    // Apply gender filters (Male, Female, Unisex)
    const genderFilters = selectedFilters.filter((f) =>
      ["Male", "Female", "Unisex"].includes(f)
    );

    if (genderFilters.length > 0) {
      filtered = filtered.filter((salon) => {
        // Salons are categorized as men's, women's, or both
        if (genderFilters.includes("Male")) {
          // Include barber shops and men's salons
          const isMaleSalon =
            salon.name.toLowerCase().includes("cut") ||
            salon.name.toLowerCase().includes("barber") ||
            salon.name.toLowerCase().includes("trim") ||
            salon.id === 3 ||
            salon.id === 4;
          if (isMaleSalon) return true;
        }

        if (genderFilters.includes("Female")) {
          // Include women's salons
          const isFemaleSalon =
            salon.name.toLowerCase().includes("beauty") ||
            salon.name.toLowerCase().includes("lounge") ||
            salon.name.toLowerCase().includes("luxe") ||
            salon.name.toLowerCase().includes("shine") ||
            salon.id === 1 ||
            salon.id === 2 ||
            salon.id === 5 ||
            salon.id === 6 ||
            salon.id === 7;
          if (isFemaleSalon) return true;
        }

        if (genderFilters.includes("Unisex")) {
          // Include unisex salons (offering both services)
          const isUnisex =
            salon.name.toLowerCase().includes("studio") ||
            salon.id === 8; // Zen Spa House
          if (isUnisex) return true;
        }

        return false;
      });
    }

    // Apply budget filters (Budget, Premium, Luxury)
    const priceFilters = selectedFilters.filter((f) =>
      ["Budget", "Premium", "Luxury"].includes(f)
    );

    if (priceFilters.length > 0) {
      filtered = filtered.filter((salon) => {
        if (priceFilters.includes("Budget") && salon.priceRange === "₹")
          return true;
        if (priceFilters.includes("Premium") && salon.priceRange === "₹₹")
          return true;
        if (priceFilters.includes("Luxury") && salon.priceRange === "₹₹₹")
          return true;
        return false;
      });
    }

    // Apply "Near Me" filter (sort by distance)
    if (selectedFilters.includes("Near Me")) {
      filtered = filtered.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });
    }

    return filtered;
  };

  const filteredSalons = getFilteredSalons();

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 pt-8 pb-6">
        <h2 className="text-white text-xl mb-4">Search Salons</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
          <Input
            type="text"
            placeholder="Search for salons, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-none rounded-xl pl-12 pr-4 py-3"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 mt-3 text-white"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      {/* Filter Chips */}
      {showFilters && (
        <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                selectedFilters.includes(filter)
                  ? "bg-[#6C4AB6] text-white"
                  : "bg-[#F3EEFF] text-[#6C4AB6]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Map Section */}
      <div className="px-6 py-4">
        <div
          className="h-48 bg-[#F3EEFF] rounded-xl flex items-center justify-center"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <div className="text-center">
            <MapPin className="w-12 h-12 text-[#6C4AB6] mx-auto mb-2" />
            <p className="text-sm text-[#8A8A8A]">Map View</p>
            <p className="text-xs text-[#8A8A8A]">{salons.length} salons nearby</p>
          </div>
        </div>
      </div>

      {/* Salon List */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">
            {filteredSalons.length === 0 ? "No Salons" : `${filteredSalons.length} Salons`}
          </h3>
          <button className="text-sm text-[#6C4AB6]">Sort</button>
        </div>
        <div className="space-y-4">
          {filteredSalons.length > 0 ? (
            filteredSalons.map((salon) => (
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
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[#8A8A8A]">No salons found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
