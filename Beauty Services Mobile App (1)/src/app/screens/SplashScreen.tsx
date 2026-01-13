import { Sparkles } from "lucide-react";
import { useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#6C4AB6] to-[#3D2C8D]">
      <div className="flex flex-col items-center gap-6">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-[#6C4AB6]" />
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl mb-2">BeautyHub</h1>
          <p className="text-[#F3EEFF] text-sm">Your Beauty, Our Priority</p>
        </div>
      </div>
    </div>
  );
}
