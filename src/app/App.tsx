import { useState } from "react";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ServiceListingScreen } from "./screens/ServiceListingScreen";
import { SalonDetailScreen } from "./screens/SalonDetailScreen";
import { BookingServiceScreen } from "./screens/BookingServiceScreen";
import { BookingStylistScreen } from "./screens/BookingStylistScreen";
import { BookingDateTimeScreen } from "./screens/BookingDateTimeScreen";
import { BookingSummaryScreen } from "./screens/BookingSummaryScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { AppointmentsScreen } from "./screens/AppointmentsScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { MyBookingsScreen } from "./screens/MyBookingsScreen";
import { FavoriteSalonsScreen } from "./screens/FavoriteSalonsScreen";
import { TodaysDealScreen } from "./screens/TodaysDealScreen";
import { RescheduleAppointmentScreen } from "./screens/RescheduleAppointmentScreen";
import { BottomNav } from "./components/BottomNav";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { salons } from "./data/mockData";

interface Appointment {
  id: number;
  salon: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
}

type Screen =
  | { type: "splash" }
  | { type: "login" }
  | { type: "sign-up" }
  | { type: "home" }
  | { type: "service-listing"; serviceName: string }
  | { type: "salon-detail"; salonId: number }
  | { type: "booking-service"; salonId: number }
  | { type: "booking-stylist"; salonId: number; serviceIds: number[] }
  | { type: "booking-datetime"; salonId: number; serviceIds: number[]; stylistId: number }
  | {
      type: "booking-summary";
      salonId: number;
      serviceIds: number[];
      stylistId: number;
      date: string;
      time: string;
    }
  | { type: "search"; query?: string }
  | { type: "appointments" }
  | { type: "account" }
  | { type: "my-bookings" }
  | { type: "favorite-salons" }
  | { type: "todays-deals" }
  | { type: "reschedule-appointment"; appointmentId: number };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: "splash" });
  const [activeTab, setActiveTab] = useState("home");
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      setScreen({ type: "home" });
    } else if (tab === "search") {
      setScreen({ type: "search", query: "" });
    } else if (tab === "appointments") {
      setScreen({ type: "appointments" });
    } else if (tab === "account") {
      setScreen({ type: "account" });
    }
  };

  const showBottomNav =
    screen.type !== "splash" && screen.type !== "login";

  const showBottomNavForScreen =
    showBottomNav &&
    (screen.type === "home" ||
      screen.type === "search" ||
      screen.type === "appointments" ||
      screen.type === "account");

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-[#F8F7FF] to-white relative">
      {/* Screens */}
      {screen.type === "splash" && (
        <SplashScreen onComplete={() => setScreen({ type: "login" })} />
      )}

      {screen.type === "login" && (
        <LoginScreen
          onLogin={() => {
            setScreen({ type: "home" });
            setActiveTab("home");
          }}
          onSignUp={() => setScreen({ type: "sign-up" })}
        />
      )}

      {screen.type === "sign-up" && (
        <SignUpScreen
          onSignUp={() => {
            setScreen({ type: "home" });
            setActiveTab("home");
          }}
          onBack={() => setScreen({ type: "login" })}
        />
      )}

      {screen.type === "home" && (
        <HomeScreen
          onServiceClick={(serviceName) =>
            setScreen({ type: "service-listing", serviceName })
          }
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
          onSpecialOffersClick={() =>
            setScreen({ type: "todays-deals" })
          }
          onSearch={(query) =>
            setScreen({ type: "search", query })
          }
        />
      )}

      {screen.type === "service-listing" && (
        <ServiceListingScreen
          serviceName={screen.serviceName}
          onBack={() => setScreen({ type: "home" })}
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "salon-detail" && (
        <SalonDetailScreen
          salonId={screen.salonId}
          onBack={() => setScreen({ type: "home" })}
          onBookNow={(salonId) =>
            setScreen({ type: "booking-service", salonId })
          }
        />
      )}

      {screen.type === "booking-service" && (
        <BookingServiceScreen
          salonId={screen.salonId}
          onBack={() => setScreen({ type: "salon-detail", salonId: screen.salonId })}
          onContinue={(serviceIds) =>
            setScreen({
              type: "booking-stylist",
              salonId: screen.salonId,
              serviceIds,
            })
          }
        />
      )}

      {screen.type === "booking-stylist" && (
        <BookingStylistScreen
          salonId={screen.salonId}
          onBack={() =>
            setScreen({ type: "booking-service", salonId: screen.salonId })
          }
          onContinue={(stylistId) =>
            setScreen({
              type: "booking-datetime",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
              stylistId,
            })
          }
        />
      )}

      {screen.type === "booking-datetime" && (
        <BookingDateTimeScreen
          onBack={() =>
            setScreen({
              type: "booking-stylist",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
            })
          }
          onContinue={(date, time) =>
            setScreen({
              type: "booking-summary",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
              stylistId: screen.stylistId,
              date,
              time,
            })
          }
        />
      )}

      {screen.type === "booking-summary" && (
        <BookingSummaryScreen
          salonId={screen.salonId}
          serviceIds={screen.serviceIds}
          stylistId={screen.stylistId}
          date={screen.date}
          time={screen.time}
          onBack={() =>
            setScreen({
              type: "booking-datetime",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
              stylistId: screen.stylistId,
            })
          }
          onConfirm={() => {
            const salon = salons.find((s) => s.id === screen.salonId);
            const selectedServices = salon?.services.filter((s) =>
              screen.serviceIds.includes(s.id)
            );
            const stylist = salon?.stylists.find((s) => s.id === screen.stylistId);

            if (salon && selectedServices && stylist) {
              const serviceNames = selectedServices.map((s) => s.name).join(", ");
              const newAppointment: Appointment = {
                id: Date.now(),
                salon: salon.name,
                service: serviceNames,
                stylist: stylist.name,
                date: screen.date,
                time: screen.time,
                status: "upcoming",
              };
              setBookedAppointments([...bookedAppointments, newAppointment]);
            }

            toast.success("Booking confirmed! 🎉", {
              description: "You'll receive a confirmation shortly.",
            });
            setScreen({ type: "appointments" });
            setActiveTab("appointments");
          }}
        />
      )}

      {screen.type === "search" && (
        <SearchScreen
          initialQuery={screen.query || ""}
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "appointments" && (
        <AppointmentsScreen
          appointments={bookedAppointments}
          onReschedule={(appointmentId) =>
            setScreen({ type: "reschedule-appointment", appointmentId })
          }
        />
      )}

      {screen.type === "account" && <AccountScreen onMyBookingsClick={() => setScreen({ type: "my-bookings" })} onFavoriteSalonsClick={() => setScreen({ type: "favorite-salons" })} />}

      {screen.type === "my-bookings" && (
        <MyBookingsScreen
          appointments={bookedAppointments}
          onBack={() => setScreen({ type: "account" })}
        />
      )}

      {screen.type === "favorite-salons" && (
        <FavoriteSalonsScreen
          salons={salons}
          onBack={() => setScreen({ type: "account" })}
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "todays-deals" && (
        <TodaysDealScreen
          onBack={() => setScreen({ type: "home" })}
          onDealClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "reschedule-appointment" && (
        <RescheduleAppointmentScreen
          appointment={
            bookedAppointments.find((apt) => apt.id === screen.appointmentId) ||
            bookedAppointments[0]
          }
          onBack={() => setScreen({ type: "appointments" })}
          onConfirm={(appointmentId, newDate, newTime) => {
            setBookedAppointments((prevAppointments) =>
              prevAppointments.map((apt) =>
                apt.id === appointmentId
                  ? { ...apt, date: newDate, time: newTime }
                  : apt
              )
            );
          }}
        />
      )}

      {/* Bottom Navigation */}
      {showBottomNavForScreen && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      <Toaster />
    </div>
  );
}