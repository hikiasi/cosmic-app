import { Heart, X } from './Icons';
import { ImageWithFallback } from './ui/ImageWithFallback';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'memory' | 'quality';
  title: string;
  date?: string;
  description: string;
  example?: string;
  imageUrl?: string;
}

export function MemoryModal({ isOpen, onClose, type, title, date, description, example, imageUrl }: MemoryModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl border border-pink-400/30 animate-modal-appear">
          <div className="relative p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-pink-300 hover:text-pink-200 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <Heart className="text-pink-400" size={20} />
              <h3 className="text-xl text-pink-200">{title}</h3>
            </div>
            
            {date && (
              <p className="text-pink-300/80 text-sm">{date}</p>
            )}
          </div>
          
          <div className="p-6 space-y-4 overflow-y-auto">
            {imageUrl && (
              <div className="w-full h-48 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <p className="text-pink-100 leading-relaxed">
              {description}
            </p>
            
            {example && type === 'quality' && (
              <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-400/20">
                <p className="text-pink-200 text-sm italic">
                  "{example}"
                </p>
              </div>
            )}
          </div>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-modal-appear {
          animation: modal-appear 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </>
  );
}


