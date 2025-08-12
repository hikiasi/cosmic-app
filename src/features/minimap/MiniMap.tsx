interface MiniMapProps {
  totalMemories: number
  visitedMemories: number
  totalQualities: number
  visitedQualities: number
  totalHearts: number
  foundHearts: number
}

export function MiniMap({ totalMemories, visitedMemories, totalQualities, visitedQualities, totalHearts, foundHearts }: MiniMapProps) {
  const percent = Math.round(((visitedMemories + visitedQualities) / (totalMemories + totalQualities)) * 100)

  return (
    <div className="absolute right-4 top-4 z-40">
      <div className="w-56 rounded-xl border border-pink-400/30 bg-black/40 backdrop-blur p-3 text-pink-200/90 shadow">
        <div className="text-sm mb-2">Прогресс исследования: {percent}%</div>
        <div className="h-2 rounded bg-pink-500/20 overflow-hidden mb-3">
          <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${percent}%` }} />
        </div>
        <ul className="text-xs space-y-1">
          <li>Планеты: {visitedMemories} / {totalMemories}</li>
          <li>Звезды: {visitedQualities} / {totalQualities}</li>
          <li>Сердечки: {foundHearts} / {totalHearts}</li>
        </ul>
      </div>
    </div>
  )
}


