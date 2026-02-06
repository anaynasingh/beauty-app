import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { timeSlots } from "../data/mockData";
import { toast } from "sonner";

interface Appointment {
  id: number;
  salon: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
}

interface RescheduleAppointmentScreenProps {
  appointment: Appointment;
  onBack: () => void;
  onConfirm: (appointmentId: number, newDate: string, newTime: string) => void;
}

export function RescheduleAppointmentScreen({
  appointment,
  onBack,
  onConfirm,
}: RescheduleAppointmentScreenProps) {
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

  const handleConfirm = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    onConfirm(appointment.id, dateStr, selectedTime);
    toast.success("Reschedule request sent");
    onBack();
  };

  return (
    <div className="pb-24 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white hover:opacity-80">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">Reschedule Appointment</h2>
          <p className="text-[#F3EEFF] text-sm">Select new date & time</p>
        </div>
      </div>

      {/* Appointment Info */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}>
          <h3 className="text-[#1F1F1F] mb-2">{appointment.salon}</h3>
          <p className="text-sm text-[#8A8A8A] mb-3">{appointment.service}</p>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1 text-[#8A8A8A]">
              <Calendar className="w-3 h-3" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center gap-1 text-[#8A8A8A]">
              <Clock className="w-3 h-3" />
              <span>{appointment.time}</span>
            </div>
          </div>
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
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs text-[#8A8A8A] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(day)}
                disabled={!day}
                className={`py-2 rounded-lg text-xs transition-all ${
                  !day
                    ? ""
                    : isSameDay(day, selectedDate)
                    ? "bg-[#6C4AB6] text-white"
                    : isToday(day)
                    ? "bg-[#F3EEFF] text-[#6C4AB6]"
                    : "hover:bg-[#F3EEFF] text-[#1F1F1F]"
                }`}
              >
                {day ? day.getDate() : ""}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="px-6 py-6">
        <h3 className="text-[#1F1F1F] mb-4">Select Time</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={`py-3 rounded-lg text-xs transition-all ${
                selectedTime === slot
                  ? "bg-[#6C4AB6] text-white"
                  : "bg-white text-[#1F1F1F] border border-[#F0F0F0]"
              }`}
              style={
                selectedTime === slot
                  ? { boxShadow: "0 4px 12px rgba(108, 74, 182, 0.2)" }
                  : {}
              }
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="px-6 pb-6 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <button
          onClick={handleConfirm}
          disabled={!selectedTime}
          className={`w-full py-3 rounded-xl text-white transition-all ${
            selectedTime
              ? "bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D]"
              : "bg-[#D0D0D0] cursor-not-allowed"
          }`}
          style={
            selectedTime
              ? { boxShadow: "0 4px 16px rgba(108, 74, 182, 0.3)" }
              : {}
          }
        >
          Confirm Reschedule
        </button>
      </div>
    </div>
  );
}
