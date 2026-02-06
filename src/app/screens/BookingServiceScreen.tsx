import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { salons } from "../data/mockData";

interface BookingServiceScreenProps {
  salonId: number;
  onBack: () => void;
  onContinue: (selectedServices: number[]) => void;
}

export function BookingServiceScreen({
  salonId,
  onBack,
  onContinue,
}: BookingServiceScreenProps) {
  const salon = salons.find((s) => s.id === salonId);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  if (!salon) return null;

  const toggleService = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalPrice = salon.services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">Select Service</h2>
          <p className="text-[#F3EEFF] text-sm">{salon.name}</p>
        </div>
      </div>

      {/* Services */}
      <div className="px-6 py-6 space-y-3">
        {salon.services.map((service) => (
          <button
            key={service.id}
            onClick={() => toggleService(service.id)}
            className={`w-full rounded-xl p-4 flex items-center gap-4 transition-all ${
              selectedServices.includes(service.id)
                ? "bg-[#F3EEFF] border-2 border-[#6C4AB6]"
                : "bg-white border-2 border-transparent"
            }`}
            style={{ boxShadow: "0 2px 8px rgba(108, 74, 182, 0.04)" }}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                selectedServices.includes(service.id)
                  ? "bg-[#6C4AB6] border-[#6C4AB6]"
                  : "border-[#8A8A8A]"
              }`}
            >
              {selectedServices.includes(service.id) && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1 text-left">
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
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-16 left-0 right-0 px-6 py-4 bg-white border-t border-[rgba(108,74,182,0.1)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#8A8A8A]">Total:</span>
          <span className="text-xl text-[#6C4AB6]">₹{totalPrice}</span>
        </div>
        <button
          onClick={() => onContinue(selectedServices)}
          disabled={selectedServices.length === 0}
          className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
