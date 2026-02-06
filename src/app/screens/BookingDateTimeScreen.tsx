import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { timeSlots } from "../data/mockData";

interface BookingDateTimeScreenProps {
  onBack: () => void;
  onContinue: (date: string, time: string) => void;
}

export function BookingDateTimeScreen({
  onBack,
  onContinue,
}: BookingDateTimeScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">Date & Time</h2>
          <p className="text-[#F3EEFF] text-sm">Choose your slot</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentMonth(newDate);
              }}
            >
              <ChevronLeft className="w-5 h-5 text-[#6C4AB6]" />
            </button>
            <h3 className="text-[#1F1F1F]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentMonth(newDate);
              }}
            >
              <ChevronRight className="w-5 h-5 text-[#6C4AB6]" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
              <div key={idx} className="text-center text-sm text-[#8A8A8A] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => day && setSelectedDate(day)}
                disabled={!day}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all ${
                  !day
                    ? "invisible"
                    : isSameDay(day, selectedDate)
                    ? "bg-[#6C4AB6] text-white"
                    : isToday(day)
                    ? "bg-[#F3EEFF] text-[#6C4AB6]"
                    : "text-[#1F1F1F] hover:bg-[#F3EEFF]"
                }`}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="px-6 pb-6">
        <h3 className="text-[#1F1F1F] mb-4">Available Time Slots</h3>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-3 rounded-lg text-sm transition-all ${
                selectedTime === time
                  ? "bg-[#6C4AB6] text-white"
                  : "bg-[#F3EEFF] text-[#1F1F1F]"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-16 left-0 right-0 px-6 py-4 bg-white border-t border-[rgba(108,74,182,0.1)]">
        <button
          onClick={() =>
            selectedTime &&
            onContinue(selectedDate.toISOString().split("T")[0], selectedTime)
          }
          disabled={!selectedTime}
          className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Booking
        </button>
      </div>
    </div>
  );
}
