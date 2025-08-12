import { useMemo } from 'react'
import { Heart } from '../../components/Icons'

interface HiddenHeartsProps {
  count?: number
  foundIds: Set<number>
  onFound: (id: number) => void
}

// Simple seeded random to keep positions stable between renders
function seededRandom(seed: number) {
  let t = seed + 0x6D2B79F5
  return () => {
    t += 0x6D2B79F5
    let x = Math.imul(t ^ (t >>> 15), 1 | t)
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

export function HiddenHearts({ count = 7, foundIds, onFound }: HiddenHeartsProps) {
  const rng = useMemo(() => seededRandom(20240214), [])
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      x: 5 + rng() * 90,
      y: 10 + rng() * 80,
      size: 16 + rng() * 12,
    }))
  }, [count, rng])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts.map((h) => (
        <button
          key={h.id}
          className={`absolute transition-transform ${foundIds.has(h.id) ? 'scale-0' : 'hover:scale-125'}`}
          style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
          onClick={() => onFound(h.id)}
          aria-label="Секретное сердечко"
        >
          <span className="pointer-events-auto text-pink-400/70">
            <Heart size={Math.round(h.size)} />
          </span>
        </button>
      ))}
    </div>
  )
}


