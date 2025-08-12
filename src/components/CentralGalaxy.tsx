import { Heart, Sparkles } from './Icons';

interface CentralGalaxyProps {
  onClick: () => void;
}

export function CentralGalaxy({ onClick }: CentralGalaxyProps) {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 blur-3xl animate-central-glow"
        style={{ width: '200px', height: '200px', marginLeft: '-100px', marginTop: '-100px' }}
      />
      
      <div className="relative w-32 h-32 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 rounded-full shadow-2xl border-2 border-pink-300/50 animate-galaxy-glow">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-lg text-center font-serif tracking-wider animate-text-glow">
            Дашенька
          </h1>
        </div>
        
        <div
          className="absolute inset-0 rounded-full border border-pink-300/40 animate-orbit"
          style={{ transform: 'scale(1.4)' }}
        >
          <Heart className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-pink-300" size={16} />
        </div>
        
        <div
          className="absolute inset-0 rounded-full border border-purple-300/30 animate-orbit-reverse"
          style={{ transform: 'scale(1.7)' }}
        >
          <Sparkles className="absolute -top-2 right-4 text-purple-300" size={14} />
          <Sparkles className="absolute -bottom-2 left-4 text-purple-300" size={14} />
        </div>
      </div>
      
      <p className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-pink-300 text-sm text-center whitespace-nowrap animate-fade-in">
        Наша Вселенная
      </p>
      
      <style>{`
        @keyframes central-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
        
        @keyframes galaxy-glow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
          }
          50% {
            box-shadow: 0 0 50px rgba(236, 72, 153, 0.8);
          }
        }
        
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
        }
        
        @keyframes orbit {
          from {
            transform: scale(1.4) rotate(0deg);
          }
          to {
            transform: scale(1.4) rotate(360deg);
          }
        }
        
        @keyframes orbit-reverse {
          from {
            transform: scale(1.7) rotate(0deg);
          }
          to {
            transform: scale(1.7) rotate(-360deg);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-central-glow { animation: central-glow 3s ease-in-out infinite; }
        .animate-galaxy-glow { animation: galaxy-glow 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-orbit { animation: orbit 15s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 25s linear infinite; }
        .animate-fade-in { animation: fade-in 1s ease-in-out 1.5s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}


