import { ArrowLeft, Calendar, Clock, Star, MapPin } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface Appointment {
  id: number;
  salon: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
}

interface MyBookingsScreenProps {
  appointments: Appointment[];
  onBack: () => void;
}

export function MyBookingsScreen({ appointments, onBack }: MyBookingsScreenProps) {
  const { t } = useLanguage();

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );
  const pastAppointments = appointments.filter((apt) => apt.status === "past");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 py-6 flex items-center gap-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-xl">{t("myBookings")}</h2>
          <p className="text-[#F3EEFF] text-sm">{t("manageYourBookings")}</p>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[#1F1F1F] mb-4">{t("upcoming")}</h3>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl p-4"
                  style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-[#1F1F1F] mb-1">
                        {appointment.salon}
                      </h4>
                      <p className="text-sm text-[#8A8A8A]">
                        {appointment.service}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-[#E6C97A] rounded-full">
                      <span className="text-xs text-[#1F1F1F]">{t("upcomingLabel")}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#6C4AB6]" />
                      <span className="text-[#8A8A8A]">
                        {formatDate(appointment.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-[#6C4AB6]" />
                      <span className="text-[#8A8A8A]">{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-[#6C4AB6]" />
                      <span className="text-[#8A8A8A]">
                        {appointment.stylist}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-[#F3EEFF] text-[#6C4AB6] rounded-lg text-sm">
                      {t("reschedule")}
                    </button>
                    <button className="flex-1 py-2 bg-[#6C4AB6] text-white rounded-lg text-sm">
                      {t("viewDetails")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h3 className="text-[#1F1F1F] mb-4">{t("past")}</h3>
            <div className="space-y-3">
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl p-4"
                  style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-[#1F1F1F] mb-1">
                        {appointment.salon}
                      </h4>
                      <p className="text-sm text-[#8A8A8A]">
                        {appointment.service}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-[#F3EEFF] rounded-full">
                      <span className="text-xs text-[#8A8A8A]">{t("completed")}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#8A8A8A]" />
                      <span className="text-[#8A8A8A]">
                        {formatDate(appointment.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-[#8A8A8A]" />
                      <span className="text-[#8A8A8A]">
                        {appointment.stylist}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-[#6C4AB6] text-white rounded-lg text-sm mt-4">
                    {t("rateAndReview")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {upcomingAppointments.length === 0 && pastAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-[#8A8A8A] mx-auto mb-4" />
            <h3 className="text-[#1F1F1F] mb-2">{t("noAppointments")}</h3>
            <p className="text-sm text-[#8A8A8A]">
              {t("bookFirstBeautyService")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
