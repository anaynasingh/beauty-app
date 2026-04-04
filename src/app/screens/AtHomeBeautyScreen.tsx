interface AtHomeBeautyService {
  id: number;
  title: string;
  image: string;
}

interface AtHomeBeautyScreenProps {
  onBack: () => void;
  onProviderClick?: (providerId: number) => void;
}

import { useState } from "react";

export function AtHomeBeautyScreen({ onBack, onProviderClick }: AtHomeBeautyScreenProps) {
  const [gender, setGender] = useState<"men" | "women">("women");
  
  const services: AtHomeBeautyService[] = [
    {
      id: 1,
      title: "Bridal Makeup",
      image: "https://health-routes.co.uk/wp-content/uploads/2023/05/4.jpg",
    },
    {
      id: 2,
      title: "Facial Care",
      image: "https://tse1.explicit.bing.net/th/id/OIP.TMOW8Fm5WEd9A6S66BE4bgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      title: "Hair Styling",
      image: "https://www.glamoureyebrowmason.com/wp-content/uploads/2021/02/Hands.jpg",
    },
    {
      id: 4,
      title: "Waxing",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Threading",
      image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500&h=500&fit=crop",
    },
    {
      id: 6,
      title: "Manicure & Pedicure",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=500&fit=crop",
    },
    {
      id: 7,
      title: "Party Makeup",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&fit=crop",
    },
    {
      id: 8,
      title: "Spa & Massage",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=500&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-2 text-lg">←</button>
        <h1 className="text-xl font-semibold">At Home Beauty Services</h1>
      </div>

      {/* Men/Women Toggle */}
      <div className="px-4 py-4 flex gap-3 border-b bg-[#F8F7FF]">
        <button
          onClick={() => setGender("women")}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            gender === "women"
              ? "bg-[#FF6B9D] text-white shadow-md"
              : "bg-white text-[#FF6B9D] border border-[#FFD9E8]"
          }`}
        >
          Women
        </button>
        <button
          onClick={() => setGender("men")}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            gender === "men"
              ? "bg-[#6C4AB6] text-white shadow-md"
              : "bg-white text-[#6C4AB6] border border-[#E0D9F0]"
          }`}
        >
          Men
        </button>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onProviderClick?.(service.id)}
            className="bg-gray-50 rounded-xl shadow-sm flex flex-col items-center p-3 hover:shadow-md transition text-left"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <div className="text-center text-sm font-medium mt-1">{service.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
