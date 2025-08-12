import { useState } from 'react';

interface PlanetProps {
  id: number;
  x: number;
  y: number;
  title: string;
  date: string;
  description: string;
  color: string;
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
}

export function Planet({ id, x, y, title, date, description, color, size = 'medium', onClick }: PlanetProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div
      className={`absolute cursor-pointer ${sizeClasses[size]} transition-all duration-500 hover:scale-120`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        animationDelay: `${id * 0.2}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`w-full h-full rounded-full shadow-xl ${color} animate-glow`}
      />
      
      <div
        className="absolute inset-0 rounded-full border border-pink-300/30 animate-spin-slow"
        style={{ transform: 'scale(1.3)' }}
      />
      
      {isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-pink-200 px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none z-50 transition-opacity duration-200">
          <div className="text-center">
            <div className="text-pink-300">{title}</div>
            <div className="text-pink-400/80 text-xs">{date}</div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
          }
          50% {
            box-shadow: 0 0 25px rgba(236, 72, 153, 0.7);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: scale(1.3) rotate(0deg);
          }
          to {
            transform: scale(1.3) rotate(360deg);
          }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}


