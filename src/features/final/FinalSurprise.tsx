import { X } from '../../components/Icons'

interface FinalSurpriseProps {
  isOpen: boolean
  onClose: () => void
}

export function FinalSurprise({ isOpen, onClose }: FinalSurpriseProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-pink-400/30 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900 shadow-2xl animate-[fadeIn_0.6s_ease]">
        <button className="absolute top-3 right-3 text-pink-300 hover:text-pink-200" onClick={onClose} aria-label="Закрыть">
          <X size={22} />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-72 md:h-full">
            <img src="https://downloader.disk.yandex.ru/preview/99d3029d55bf6a1d641198eb8775250c6d71cbf74a8687d9b48b57be8f520450/689b98b2/uqdg4TTbzsdPyD-mcF5s0If5F7bHobYE5tf6EU2SEsUVTSEUUKmE9XwiIsvxd1k8sSF3Pa1S3BrD_cW9BUJx_Q%3D%3D?uid=0&filename=photo_2025-08-12_17-40-21.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=2048x2048" alt="Мы вдвоем" className="w-full h-full object-cover" />
          </div>
          <div className="p-6 md:p-8 text-pink-100 space-y-4">
            <h3 className="text-2xl text-pink-200">Мое главное послание</h3>
            <p>
              Дашенька, ты — не просто центр моей вселенной, ты её сердцебиение, её свет и её бесконечная глубина. С тобой каждое утро превращается в волшебный восход, полный надежды и тепла, где первые лучи солнца касаются души так нежно, как твои объятия. Каждая ночь — это небо, усыпанное нашими общими звёздами, где мы вместе рисуем созвездия из воспоминаний, мечт и тихих разговоров до рассвета. Спасибо тебе, моя любимая, за то, что ты рядом со мной, доверяешь мне свои секреты, смеёшься со мной над маленькими глупостями жизни и всегда поддерживаешь меня. Твоя вера даёт мне силы, твоя улыбка — вдохновение, а твоя близость — ощущение, что всё в мире на своих местах!!
            </p>
            <p>
              Ты дороже мне, чем все созвездия вместе взятые, глубже, чем океанские глубины, и нежнее, чем лепестки самого хрупкого цветка. Ты — моя муза, мой якорь в бурях и мой свет в темноте. Я хочу создавать с тобой нашу собственную вселенную каждый день — строить мосты из доверия и украшать её звёздами наших общих радостей и счастья
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  )
}


