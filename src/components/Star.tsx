import { useState } from 'react';

interface StarProps {
  id: number;
  x: number;
  y: number;
  quality: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
}

export function Star({ id, x, y, quality, description, size = 'medium', onClick }: StarProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  return (
    <div
      className={`absolute cursor-pointer ${sizeClasses[size]} transition-all duration-300 hover:scale-150`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        animationDelay: `${id * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-500 rounded-full shadow-lg animate-pulse"
        style={{
          boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)',
          animation: 'pulse 2s infinite'
        }}
      />
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-pink-200 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none transition-opacity duration-200">
          {quality}
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
          }
        }
      `}</style>
    </div>
  );
}


