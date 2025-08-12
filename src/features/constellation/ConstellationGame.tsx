import { useEffect, useMemo, useRef, useState } from 'react'

interface ConstellationGameProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface Point {
  id: number
  x: number // 0..100 percent within container
  y: number // 0..100 percent within container
}

// A tiny drag-n-drop constellation mini-game. Drag stars onto targets to form a heart-shaped constellation.
export function ConstellationGame({ isOpen, onClose, onComplete }: ConstellationGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [placedIds, setPlacedIds] = useState<Set<number>>(new Set())
  const [dragPositions, setDragPositions] = useState<Record<number, { x: number; y: number }>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const targets: Point[] = useMemo(
    () => [
      { id: 1, x: 30, y: 35 },
      { id: 2, x: 40, y: 25 },
      { id: 3, x: 50, y: 22 },
      { id: 4, x: 60, y: 25 },
      { id: 5, x: 70, y: 35 },
      { id: 6, x: 60, y: 45 },
      { id: 7, x: 50, y: 55 },
      { id: 8, x: 40, y: 45 },
    ],
    []
  )

  // Initial draggable star positions around the bottom
  const stars: Point[] = useMemo(
    () => [
      { id: 1, x: 15, y: 80 },
      { id: 2, x: 30, y: 85 },
      { id: 3, x: 45, y: 82 },
      { id: 4, x: 60, y: 85 },
      { id: 5, x: 75, y: 80 },
      { id: 6, x: 25, y: 90 },
      { id: 7, x: 50, y: 92 },
      { id: 8, x: 70, y: 90 },
    ],
    []
  )

  useEffect(() => {
    // reset when reopened
    if (isOpen) {
      setPlacedIds(new Set())
      const init: Record<number, { x: number; y: number }> = {}
      for (const s of stars) init[s.id] = { x: s.x, y: s.y }
      setDragPositions(init)
      setIsCompleted(false)
    }
  }, [isOpen, stars])

  useEffect(() => {
    if (placedIds.size === targets.length && !isCompleted) {
      setIsCompleted(true)
      const timer = setTimeout(() => onComplete(), 600)
      return () => clearTimeout(timer)
    }
  }, [placedIds, targets.length, isCompleted, onComplete])

  if (!isOpen) return null

  const handlePointerDown = (id: number, e: React.PointerEvent<HTMLDivElement>) => {
    if (placedIds.has(id)) return
    const target = e.currentTarget
    const container = containerRef.current
    if (!container) return
    target.setPointerCapture(e.pointerId)
    const rect = container.getBoundingClientRect()

    const move = (ev: PointerEvent) => {
      const relX = ((ev.clientX - rect.left) / rect.width) * 100
      const relY = ((ev.clientY - rect.top) / rect.height) * 100
      setDragPositions((prev) => ({ ...prev, [id]: { x: relX, y: relY } }))
    }

    const up = (ev: PointerEvent) => {
      target.releasePointerCapture(e.pointerId)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)

      // Snap if near target
      const star = dragPositions[id]
      if (!star) return
      const nearest = targets.find((t) => t.id === id)
      if (!nearest) return
      const dx = (star.x - nearest.x)
      const dy = (star.y - nearest.y)
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 6) {
        setDragPositions((prev) => ({ ...prev, [id]: { x: nearest.x, y: nearest.y } }))
        setPlacedIds((prev) => new Set(prev).add(id))
      }
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const progress = Math.round((placedIds.size / targets.length) * 100)

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-2xl h-[70vh] rounded-2xl overflow-hidden border border-pink-400/30 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900 shadow-2xl">
        <div className="p-4 flex items-center justify-between">
          <h3 className="text-pink-200">Собери созвездие наших лучших моментов</h3>
          <div className="text-pink-300/80 text-sm">Прогресс: {progress}%</div>
        </div>

        <div ref={containerRef} className="relative w-full h-[calc(100%-56px)]">
          {/* Lines between targets when placed */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points={targets
                .filter((t) => placedIds.has(t.id))
                .map((t) => `${t.x},${t.y}`)
                .join(' ')}
              fill="none"
              stroke="rgba(236,72,153,0.6)"
              strokeWidth="0.6"
            />
          </svg>

          {/* Targets */}
          {targets.map((t) => (
            <div
              key={t.id}
              className={`absolute rounded-full transition-all ${placedIds.has(t.id) ? 'bg-pink-400' : 'bg-pink-400/40'} shadow-lg`}
              style={{ left: `${t.x}%`, top: `${t.y}%`, width: 10, height: 10, transform: 'translate(-50%, -50%)' }}
            />
          ))}

          {/* Draggable stars */}
          {stars.map((s) => {
            const p = dragPositions[s.id] ?? { x: s.x, y: s.y }
            return (
              <div
                key={s.id}
                className={`absolute w-4 h-4 rounded-full cursor-grab ${placedIds.has(s.id) ? 'bg-pink-300' : 'bg-gradient-to-br from-pink-300 to-pink-500'} shadow-lg`}
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                onPointerDown={(e) => handlePointerDown(s.id, e)}
              />
            )
          })}
        </div>

        {isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-pink-200 text-lg bg-black/50 px-4 py-2 rounded-lg">Созвездие собрано! ✨</div>
          </div>
        )}
      </div>
    </div>
  )
}


