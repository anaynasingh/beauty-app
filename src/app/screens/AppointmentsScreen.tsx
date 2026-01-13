import { Calendar, Clock, MapPin, Star } from "lucide-react";

interface Appointment {
  id: number;
  salon: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
}

interface AppointmentsScreenProps {
  appointments?: Appointment[];
  onReschedule?: (appointmentId: number) => void;
}

export function AppointmentsScreen({ appointments = [], onReschedule }: AppointmentsScreenProps) {
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
      <div className="bg-[#6C4AB6] px-6 pt-8 pb-6 rounded-b-3xl">
        <h2 className="text-white text-xl">My Appointments</h2>
        <p className="text-[#F3EEFF] text-sm">Manage your bookings</p>
      </div>

      <div className="px-6 py-6">
        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[#1F1F1F] mb-4">Upcoming</h3>
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
                      <span className="text-xs text-[#1F1F1F]">Upcoming</span>
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
                    <button
                      onClick={() => onReschedule?.(appointment.id)}
                      className="flex-1 py-2 bg-[#F3EEFF] text-[#6C4AB6] rounded-lg text-sm hover:bg-[#E8DEFF] transition-colors"
                    >
                      Reschedule
                    </button>
                    <button className="flex-1 py-2 bg-[#6C4AB6] text-white rounded-lg text-sm hover:bg-[#5B3CA0] transition-colors">
                      View Details
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
            <h3 className="text-[#1F1F1F] mb-4">Past</h3>
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
                      <span className="text-xs text-[#8A8A8A]">Completed</span>
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
                    Rate & Review
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
            <h3 className="text-[#1F1F1F] mb-2">No Appointments</h3>
            <p className="text-sm text-[#8A8A8A]">
              Book your first beauty service today!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
