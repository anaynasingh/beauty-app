import { ArrowLeft, Calendar, Clock, User, Scissors, MapPin } from "lucide-react";
import { salons } from "../data/mockData";

interface BookingSummaryScreenProps {
  salonId: number;
  serviceIds: number[];
  stylistId: number;
  date: string;
  time: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function BookingSummaryScreen({
  salonId,
  serviceIds,
  stylistId,
  date,
  time,
  onBack,
  onConfirm,
}: BookingSummaryScreenProps) {
  const salon = salons.find((s) => s.id === salonId);
  const selectedServices = salon?.services.filter((s) =>
    serviceIds.includes(s.id)
  );
  const stylist = salon?.stylists.find((s) => s.id === stylistId);

  if (!salon || !selectedServices || !stylist) return null;

  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">Booking Summary</h2>
          <p className="text-[#F3EEFF] text-sm">Review your booking</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Salon Info */}
        <div
          className="bg-white rounded-xl p-4"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#6C4AB6]" />
            <h3 className="text-[#1F1F1F]">Salon</h3>
          </div>
          <p className="text-sm text-[#8A8A8A] pl-6">{salon.name}</p>
        </div>

        {/* Services */}
        <div
          className="bg-white rounded-xl p-4"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Scissors className="w-4 h-4 text-[#6C4AB6]" />
            <h3 className="text-[#1F1F1F]">Services</h3>
          </div>
          <div className="space-y-2 pl-6">
            {selectedServices.map((service) => (
              <div key={service.id} className="flex justify-between items-center">
                <span className="text-sm text-[#1F1F1F]">{service.name}</span>
                <span className="text-sm text-[#6C4AB6]">₹{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stylist */}
        <div
          className="bg-white rounded-xl p-4"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-[#6C4AB6]" />
            <h3 className="text-[#1F1F1F]">Stylist</h3>
          </div>
          <p className="text-sm text-[#8A8A8A] pl-6">{stylist.name}</p>
        </div>

        {/* Date & Time */}
        <div
          className="bg-white rounded-xl p-4"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[#6C4AB6]" />
            <h3 className="text-[#1F1F1F]">Date & Time</h3>
          </div>
          <div className="space-y-1 pl-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#8A8A8A]">{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#8A8A8A]" />
              <span className="text-sm text-[#8A8A8A]">{time}</span>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div
          className="bg-[#F3EEFF] rounded-xl p-4"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <h3 className="text-[#1F1F1F] mb-3">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#8A8A8A]">Subtotal</span>
              <span className="text-[#1F1F1F]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8A8A8A]">Tax (18%)</span>
              <span className="text-[#1F1F1F]">₹{tax}</span>
            </div>
            <div className="h-px bg-[#6C4AB6]/20 my-2" />
            <div className="flex justify-between">
              <span className="text-[#1F1F1F]">Total</span>
              <span className="text-xl text-[#6C4AB6]">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-16 left-0 right-0 px-6 py-4 bg-white border-t border-[rgba(108,74,182,0.1)]">
        <button
          onClick={onConfirm}
          className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 active:scale-[0.98] transition-all"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
