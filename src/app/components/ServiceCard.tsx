import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ServiceCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export function ServiceCard({ name, image, onClick }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex-shrink-0 w-[140px] h-[180px] rounded-2xl overflow-hidden active:scale-95 transition-transform shadow-lg"
    >
      {/* Background Image */}
      <ImageWithFallback
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Purple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C8D]/95 via-[#6C4AB6]/50 to-transparent" />
      
      {/* Service Name */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-white drop-shadow-lg">
          {name}
        </span>
      </div>
    </button>
  );
}