import { ArrowLeft, Clock, Zap } from "lucide-react";
import { todaysDeals } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";

interface TodaysDealScreenProps {
  onBack: () => void;
  onDealClick: (salonId: number) => void;
}

export function TodaysDealScreen({ onBack, onDealClick }: TodaysDealScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header */}
      <div className="px-6 pt-6 pb-6 bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
          <span>{t("back")}</span>
        </button>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6" />
          <h1 className="text-2xl font-semibold">Today's Special Deals</h1>
        </div>
        <p className="text-sm text-white/80">Limited time offers available today</p>
      </div>

      {/* Deals List */}
      <div className="px-6 py-6 space-y-4">
        {todaysDeals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => onDealClick(deal.salonId)}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          >
            {/* Deal Card */}
            <div className="flex gap-4 p-4">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={deal.image}
                  alt={deal.treatment}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              </div>

              {/* Deal Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-[#8A8A8A] mb-1">{deal.salonName}</p>
                    <h3 className="text-sm font-medium text-[#1F1F1F] truncate">
                      {deal.treatment}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 bg-red-100 px-2 py-1 rounded-lg">
                    <p className="text-sm font-bold text-red-600">{deal.discount}% OFF</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-[#6C4AB6]">
                    ₹{deal.dealPrice}
                  </span>
                  <span className="text-sm text-[#8A8A8A] line-through">
                    ₹{deal.originalPrice}
                  </span>
                </div>

                {/* Valid Till */}
                <div className="flex items-center gap-1 text-xs text-[#8A8A8A]">
                  <Clock className="w-3 h-3" />
                  <span>Valid till {deal.validTill}</span>
                </div>
              </div>
            </div>

            {/* Divider and CTA */}
            <div className="border-t border-[#F0F0F0]">
              <button className="w-full py-3 text-center text-sm font-medium text-[#6C4AB6] hover:bg-[#F3EEFF] transition-colors">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if needed) */}
      {todaysDeals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-[#6C4AB6]" />
          </div>
          <h3 className="text-[#1F1F1F] mb-2">No Deals Today</h3>
          <p className="text-sm text-[#8A8A8A] text-center">
            Check back later for special offers
          </p>
        </div>
      )}
    </div>
  );
}
