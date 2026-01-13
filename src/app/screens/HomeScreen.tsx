import { Search, Tag, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { SalonCard } from "../components/SalonCard";
import { StylistCard } from "../components/StylistCard";
import { services, salons, appointments } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";

interface HomeScreenProps {
  onServiceClick: (serviceName: string) => void;
  onSalonClick: (salonId: number) => void;
  onSpecialOffersClick: () => void;
  onSearch?: (query: string) => void;
}

export function HomeScreen({ onServiceClick, onSalonClick, onSpecialOffersClick, onSearch }: HomeScreenProps) {
  const { t } = useLanguage();
  const [selectedGender, setSelectedGender] = useState<"men" | "women">("women");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter services based on selected gender
  const filteredServices = services.filter(
    (service) => service.category === selectedGender || service.category === "both"
  );

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header with Search */}
      <div className="px-6 pt-8 pb-6">
        {/* Search Bar */}
        <div className="relative mb-5 cursor-pointer" onClick={() => onSearch?.(searchQuery)}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSearch?.(searchQuery);
              }
            }}
            onFocus={() => onSearch?.(searchQuery)}
            className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 text-sm border border-[rgba(108,74,182,0.1)] focus:outline-none focus:border-[#6C4AB6] transition-colors"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          />
        </div>

        {/* Men/Women Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setSelectedGender("men")}
            className={`flex-1 py-3 rounded-xl text-sm transition-all ${
              selectedGender === "men"
                ? "bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white shadow-lg"
                : "bg-white text-[#8A8A8A] border border-[rgba(108,74,182,0.1)]"
            }`}
            style={
              selectedGender === "men"
                ? { boxShadow: "0 4px 16px rgba(108, 74, 182, 0.3)" }
                : {}
            }
          >
            {t("men")}
          </button>
          <button
            onClick={() => setSelectedGender("women")}
            className={`flex-1 py-3 rounded-xl text-sm transition-all ${
              selectedGender === "women"
                ? "bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white shadow-lg"
                : "bg-white text-[#8A8A8A] border border-[rgba(108,74,182,0.1)]"
            }`}
            style={
              selectedGender === "women"
                ? { boxShadow: "0 4px 16px rgba(108, 74, 182, 0.3)" }
                : {}
            }
          >
            {t("women")}
          </button>
        </div>
      </div>

      {/* Top Categories - Horizontal Scroll */}
      <div className="mb-6">
        <h3 className="text-[#1F1F1F] px-6 mb-4">{t("topCategories")}</h3>
        <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              image={service.image}
              onClick={() => onServiceClick(service.name)}
            />
          ))}
        </div>
      </div>

      {/* Offers Banner */}
      <div className="px-6 mb-6">
        <button
          onClick={onSpecialOffersClick}
          className="w-full bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow"
          style={{ boxShadow: "0 4px 20px rgba(108, 74, 182, 0.25)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Today's Special Deals</p>
              <p className="text-sm text-white/80">
                Limited time offers available
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white flex-shrink-0" />
        </button>
      </div>

      {/* Deals & Offers Slider */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("dealsOffers")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("seeAll")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
          {salons.filter((s) => s.offer).map((salon) => (
            <div key={salon.id} className="snap-start">
              <SalonCard
                name={salon.name}
                rating={salon.rating}
                reviewCount={salon.reviewCount}
                priceRange={salon.priceRange}
                distance={salon.distance}
                offer={salon.offer}
                image={salon.image}
                onClick={() => onSalonClick(salon.id)}
                horizontal
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Salons */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("salonsNearYou")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("viewAll")}</button>
        </div>
        <div className="flex gap-0 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {salons.filter((s) => !s.offer).map((salon) => (
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
              horizontal
            />
          ))}
        </div>
      </div>

      {/* Helper image map for salon image keys */}
      {/* (kept local to avoid changing SalonCard) */}
      
      {/* Personalized For You */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("personalizedForYou")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("seeMore")}</button>
        </div>
        <p className="text-sm text-[#8A8A8A] mb-3 px-1">{t("basedOnPastBookings")}</p>
        <div className="flex gap-0 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {salons.filter((s) => appointments.some((a) => a.salon === s.name)).map((salon) => (
            <SalonCard
              key={`personal-${salon.id}`}
              name={salon.name}
              rating={salon.rating}
              reviewCount={salon.reviewCount}
              priceRange={salon.priceRange}
              distance={salon.distance}
              offer={salon.offer}
              image={salon.image}
              onClick={() => onSalonClick(salon.id)}
              horizontal
            />
          ))}
        </div>
      </div>

      {/* Top Rated Salons */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("topRatedSalons")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("explore")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {salons.filter((s) => s.rating >= 4.7).map((salon) => (
            <div key={`top-${salon.id}`} className="relative">
              <div className="absolute top-2 left-2 bg-[#FFF4E5] text-[#B36E00] px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span className="text-sm">⭐</span>
                <span>{t("topRated")}</span>
              </div>
              <SalonCard
                name={salon.name}
                rating={salon.rating}
                reviewCount={salon.reviewCount}
                priceRange={salon.priceRange}
                distance={salon.distance}
                offer={salon.offer}
                image={salon.image}
                onClick={() => onSalonClick(salon.id)}
                horizontal
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trending Services */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("trendingServices")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("seeAll")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {services.filter((svc: any) => svc.trending).map((svc: any) => (
            <div key={`trend-${svc.id}`} className="relative">
              <div className="absolute top-2 right-2 bg-[#FFF2F0] text-[#D9534F] px-2 py-0.5 rounded-md text-xs">🔥 Trending</div>
              <ServiceCard name={svc.name} image={svc.image} onClick={() => onServiceClick(svc.name)} />
            </div>
          ))}
        </div>
      </div>

      {/* Newly Opened Salons */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("newlySalons")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("discover")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {salons.filter((s) => s.isNew).map((salon) => (
            <div key={`new-${salon.id}`} className="relative">
              <div className="absolute top-2 left-2 bg-[#FDE8FF] text-[#7B3DA8] px-2 py-1 rounded-md text-xs">{t("new")}</div>
              <SalonCard
                name={salon.name}
                rating={salon.rating}
                reviewCount={salon.reviewCount}
                priceRange={salon.priceRange}
                distance={salon.distance}
                offer={salon.offer}
                image={salon.image}
                onClick={() => onSalonClick(salon.id)}
                horizontal
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Artists section removed per request */}

      {/* Seasonal / Occasion Based */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("seasonalOccasion")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("explore")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {[
            { id: "bridal", title: "Bridal Specials", image: services[1].image },
            { id: "festive", title: "Festive Glam", image: services[2].image },
            { id: "winter", title: "Winter Skincare", image: services[0].image },
          ].map((s) => (
            <div key={`season-${s.id}`} className="relative">
              <ServiceCard name={s.title} image={s.image} onClick={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}