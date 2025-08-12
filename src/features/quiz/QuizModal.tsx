import { useState } from 'react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const QUESTIONS = [
  {
    q: 'Что я думаю о твоей улыбке?',
    a: [
      'Она делает мой день ярче',
      'Это самое красивое, что я видел',
      'Она заставляет меня снова влюбляться каждый раз'
    ]
  },
  {
    q: 'Что я чувствую, когда ты смеешься?',
    a: [
      'Счастье до мурашек',
      'Улетает вся усталость',
      'Хочу слышать это всегда'
    ]
  },
  {
    q: 'Что для меня значит ты?',
    a: [
      'Вся моя вселенная',
      'Главное чудо в жизни',
      'Мой самый родной человек'
    ]
  }
]

import { X } from '../../components/Icons'

export function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [showThanks, setShowThanks] = useState(false)
  if (!isOpen) return null

  const choose = (qIdx: number, aIdx: number) => {
    setSelected((prev) => ({ ...prev, [qIdx]: aIdx }))
  }

  const done = () => {
    setShowThanks(true)
    setTimeout(() => {
      onComplete()
      onClose()
      setShowThanks(false)
      setSelected({})
    }, 700)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-pink-400/30 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900 shadow-2xl">
        <button className="absolute top-3 right-3 text-pink-300 hover:text-pink-200" onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>
        <div className="p-6 space-y-6">
          <h3 className="text-pink-200 text-xl">Угадай, что я думаю о тебе?</h3>
          <div className="space-y-6">
            {QUESTIONS.map((item, qIdx) => (
              <div key={qIdx} className="space-y-3">
                <div className="text-pink-100">{item.q}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {item.a.map((ans, aIdx) => {
                    const isSel = selected[qIdx] === aIdx
                    return (
                      <button
                        key={aIdx}
                        onClick={() => choose(qIdx, aIdx)}
                        className={`px-3 py-2 rounded-md border transition-colors ${
                          isSel
                            ? 'bg-pink-500/40 border-pink-400/60 text-white'
                            : 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-100 border-pink-400/20'
                        }`}
                      >
                        {ans}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2 text-right">
            <button onClick={done} className="px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow">
              Готово 💖
            </button>
          </div>
        </div>
        {showThanks && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 text-pink-100 px-4 py-2 rounded-lg">Спасибо за ответы ✨</div>
          </div>
        )}
      </div>
    </div>
  )
}


