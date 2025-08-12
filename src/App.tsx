import { useState } from 'react';
import { StarField } from './components/StarField';
import { CentralGalaxy } from './components/CentralGalaxy';
import { Planet } from './components/Planet';
import { Star } from './components/Star';
import { MemoryModal } from './components/MemoryModal';
import { SimpleButton } from './components/SimpleButton';
import { ArrowLeft, Heart } from './components/Icons';
import { ConstellationGame } from './features/constellation/ConstellationGame';
import { HiddenHearts } from './features/hearts/HiddenHearts';
import { QuizModal } from './features/quiz/QuizModal';
import { MiniMap } from './features/minimap/MiniMap';
import { FinalSurprise } from './features/final/FinalSurprise';
import { useFinalGate } from './hooks/useFinalGate';

type ViewMode = 'intro' | 'universe';

interface MemoryData {
  type: 'memory' | 'quality';
  title: string;
  date?: string;
  description: string;
  example?: string;
  imageUrl?: string;
}

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [selectedMemory, setSelectedMemory] = useState<MemoryData | null>(null);
  const [visitedMemoryIds, setVisitedMemoryIds] = useState<Set<number>>(new Set())
  const [visitedQualityIds, setVisitedQualityIds] = useState<Set<number>>(new Set())
  const [foundHeartIds, setFoundHeartIds] = useState<Set<number>>(new Set())
  const [isConstellationOpen, setConstellationOpen] = useState(false)
  const [isQuizOpen, setQuizOpen] = useState(false)
  const [finalOpen, setFinalOpen] = useState(false)
  const [finalUnlocked, setFinalUnlocked] = useState(false)

  const memories = [
    {
      id: 1,
      x: 20,
      y: 25,
      title: "Вкусняшки под дворником",
      date: "25 января 2025",
      description: "В этот день ты сделала для меня что-то такое трогательное и неожиданное, что я до сих пор вспоминаю с теплотой в сердце. Ты оставила под дворником моей машины сладкие тянучки — такие вкусные и милые, что я улыбнулся, как ребёнок, обнаружив их. Мне никогда раньше не делали таких сюрпризов, и это было так приятно, так заботливо, что я почувствовал себя самым счастливым человеком. Ты всегда знаешь, как поднять настроение, даже маленьким жестом, и это показывает, какая ты добрая и внимательная. Спасибо тебе, Дашенька, за эту заботу, за то, что думаешь обо мне и делаешь мою жизнь слаще. Этот момент стал для меня символом твоей нежности, и я так благодарен, что ты есть в моей жизни, наполняя её такими тёплыми воспоминаниями",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      size: "large" as const,
      imageUrl: "/images/memory-1.jpg"
    },
    {
      id: 2,
      x: 75,
      y: 20,
      title: "Наша первая встреча и твой день рождения",
      date: "1 февраля 2025",
      description: "Это день, который стал началом чего-то волшебного в моей жизни, и одновременно твой день рождения, который я так хотел сделать особенным. Я пришёл, чтобы поздравить тебя, но честно, так волновался, что не знал, что подарить такого интересного и запоминающегося. В итоге выбрал милого котика и антидождь, надеясь, что это хоть немного порадует тебя. Когда я увидел тебя, моё сердце забилось чаще — ты была такой сияющей, такой настоящей, и я был так счастлив просто быть рядом, пусть и ненадолго. Этот короткий момент стал для меня вечным воспоминанием о том, как ты вошла в мою жизнь, принеся с собой свет и тепло. Спасибо тебе, Дашенька, за то, что позволила мне разделить этот день с тобой, за твою улыбку, которая осветила всё вокруг, и за то, что ты — мой самый дорогой подарок судьбы. Я так ценю эту встречу, потому что она открыла дверь в нашу историю",
      color: "bg-gradient-to-br from-pink-400 to-rose-500",
      size: "large" as const,
      imageUrl: "/images/memory-2.jpg"
    },
    {
      id: 3,
      x: 65,
      y: 70,
      title: "Милая встреча в холодный вечер",
      date: "15 февраля 2025",
      description: "В тот холодный зимний вечер, ты забрала меня, и это было так мило и трогательно, что я до сих пор ощущаю тепло от той встречи. Ты не просто приехала, но и угостила вкусностями, которые были такими уютными и вкусными, как будто ты знала, чего мне не хватает в тот момент. А брелок с котиком, который ты подарила, — я ношу его на ключах от дома до сих пор, и каждый раз, когда вижу его, вспоминаю тебя и улыбаюсь. Ты сделала тот вечер особенным своей заботой, и я так ценю, что ты всегда находишь способ сделать меня счастливым. Спасибо тебе, Дашенька, за эту нежность, за твою улыбку, которая растопила холод того вечера, и за то, что ты — мой самый тёплый лучик в жизни. Этот день стал для меня воспоминанием о том, как ты умеешь создавать уют даже в мороз",
      color: "bg-gradient-to-br from-blue-400 to-indigo-500",
      size: "medium" as const,
      imageUrl: "/images/memory-3.jpg"
    },
    {
      id: 4,
      x: 30,
      y: 75,
      title: "Наша первая дальняя поездка в Светлогорск",
      date: "22 февраля 2025",
      description: "22 февраля 2025 года стала нашей первой дальней поездкой, когда ты отвезла меня на море в Светлогорск, и этот день навсегда остался в моём сердце как один из самых счастливых. Я был так рад просто ехать с тобой, чувствовать твою близость и предвкушать новые впечатления. Мы гуляли по тропинке леса, слушали шум волн, и вместе встретили такой потрясающий закат — небо окрасилось в розовые и золотые тона! Ты показала мне это крутое место, где воздух пропитан солью и свободой, и мы болтали о всём на свете, смеялись и наслаждались друг другом. Спасибо тебе, Дашенька, за эту поездку, за твою инициативу и за то, что делишься со мной красотой мира. Я так благодарен, что могу переживать такие моменты с тобой, моим самым дорогим человеком, и этот день стал для меня символом нашей близости",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
      size: "large" as const,
      imageUrl: "/images/memory-4.jpg"
    },
    {
      id: 5,
      x: 80,
      y: 50,
      title: "Наш первый поцелуй в лесу",
      date: "02 мая 2025",
      description: "Когда мы приехали в лес, я был так счастлив просто проводить время с тобой и ехать куда-то вместе — это было как начало приключения, полного тепла и близости. Мы сидели, обнимались, и воздух вокруг был наполнен ароматом весны, а твоё тепло рядом делало всё ещё лучше. Но когда под конец ты меня поцеловала, я вообще не ожидал этого и был в таком восторге, что сердце чуть не выскочило от радости! Я так этого хотел, и этот момент стал для меня вершиной счастья. Спасибо тебе, Дашенька, за эту нежность, за твою смелость и за то, что поделилась со мной таким интимным мгновением. Ты сделала этот день незабываемым, и я так благодарен, что могу переживать такие эмоции с тобой, моим самым любимым человеком",
      color: "bg-gradient-to-br from-emerald-400 to-teal-500",
      size: "large" as const,
      imageUrl: "/images/memory-5.jpg"
    }
  ];

  const qualities = [
    { id: 1, x: 15, y: 40, quality: "Доброта", description: "Твоя доброта, Дашенька — это бесконечный океан тепла, который обволакивает всех вокруг. Ты всегда находишь время и силы, чтобы помочь другим, даже когда сама устала или занята, и это делает тебя таким светлым человеком. Твоя способность замечать чужую боль и протягивать руку помощи вдохновляет меня каждый день быть лучше, и я так благодарен за то, что могу учиться у тебя этой щедрости сердца", example: "Как ты заботишься о своих чубриках, у тебя даже в багажнике всегда корм лежит, чтоб покормить коттек если они встретятся на пути", size: "medium" as const },
    { id: 2, x: 85, y: 30, quality: "Смех", description: "Твой смех, Дашенька — это как мелодия счастья, которая разносится по воздуху и заражает всех вокруг радостью. Он такой искренний, такой звонкий, что способен развеять любую грусть или напряжение в секунду. Я так люблю слышать его, потому что он напоминает мне о том, как ты умеешь находить свет даже в повседневных мелочах, и это делает нашу жизнь такой лёгкой и полной тепла!!", example: "Твой заразительный смех во время просмотра фильмов каких-то, и я не могу удержаться, чтобы не присоединиться, чувствуя, как всё внутри наполняется лёгкостью и чувством тепла к тебе", size: "small" as const },
    { id: 3, x: 25, y: 60, quality: "Ум", description: "Твой острый ум и способность видеть суть вещей, Дашенька, поражают меня каждый день — ты как мудрый компас, который всегда указывает правильный путь в сложных ситуациях. Ты анализируешь всё с такой глубиной и логикой, но при этом с теплотой сердца, что я учусь у тебя быть не только умнее, но и добрее!", example: "Как легко ты решаешь сложные задачи на работе, которые ставят других в тупик, разбирая проблему по частям с такой ясностью и креативностью, что я смотрю на тебя с восхищением и думаю, как же мне повезло иметь рядом такого умного и вдохновляющего человечека в моей жизни", size: "medium" as const },
    { id: 4, x: 70, y: 80, quality: "Поддержка", description: "Твоя поддержка, Дашенька — это как крепкая скала в бурном море, на которую я всегда могу опереться. Ты всегда рядом в трудные моменты, находишь слова, которые лечат душу, и даришь силы продолжать. Твоя вера в меня делает меня сильнее, и я так благодарен за то, что ты не просто слушаешь, но и помогаешь найти выход, наполняя мою жизнь уверенностью и любовью!!", example: "Как ты долго не спала, успокаивая меня перед сессией, повторяя, что всё получится, и твои слова стали для меня настоящим щитом, благодаря которому я справился с волнением и почувствовал что все будет хорошо!", size: "large" as const },
    { id: 5, x: 45, y: 15, quality: "Красота", description: "Твоя красота, Дашенька, не только внешняя, но и внутренняя — ты светишься изнутри таким светом, который озаряет всё вокруг. Твоя грация, твоя нежность, твоя улыбка — это как произведение искусства, которое я хочу созерцать вечно. Спасибо тебе за то, что делишься этой красотой, делая мою жизнь такой эстетичной и вдохновлённой!!", example: "Твои глаза, которые искрятся, когда ты счастлива, и в них отражается весь мир — они такие выразительные и глубокие, что я тону в них каждый раз, чувствуя, как моя любовь к тебе становится ещё сильнее от этой внутренней сияющей красоты", size: "medium" as const },
    { id: 6, x: 90, y: 65, quality: "Нежность", description: "Твоя нежность, Дашенька — это как мягкий шёпот ветра, который обволакивает и успокаивает душу. Ты умеешь быть такой ласковой и внимательной, что в твоих объятиях я чувствую себя дома, в полной безопасности. Спасибо тебе за эту нежность, которая делает мою жизнь такой глубокой и искренней, и за то, что ты учишь меня быть мягче к миру и к себе", example: "Как ты гладишь мои волосы, когда я засыпаю, твои пальчики такие лёгкие и тёплые, что все тревоги дня растворяются, и я засыпаю с ощущением полного покоя, зная, что рядом самый нежный человек на свете!!", size: "small" as const },
    { id: 7, x: 10, y: 70, quality: "Мечтательность", description: "Твоя мечтательность, Дашенька — это как крылья, которые поднимают нас над обыденностью и позволяют летать в мир фантазий. Ты умеешь верить в чудеса и делиться этой верой, заражая оптимизмом и вдохновением. Спасибо тебе за то, что показываешь мне, как важно мечтать, и за то, что наши общие мечты становятся реальностью благодаря твоей энтузиазму и свету!!", example: "Как ты рассказываешь о наших будущих поездках, рисуя яркие картины в воздухе — твои глаза горят, голос полон энтузиазма, и я чувствую, как эти мечты становятся ближе, благодаря твоей способности видеть красоту в будущем и делиться ею со мной", size: "small" as const },
  ];

  // Always call hooks before any early return
  useFinalGate({
    totalMemories: memories.length,
    visitedMemories: visitedMemoryIds.size,
    totalQualities: qualities.length,
    visitedQualities: visitedQualityIds.size,
    requiredHearts: 5,
    foundHearts: foundHeartIds.size,
    onOpen: () => { setFinalOpen(true); setFinalUnlocked(true); },
    alreadyOpened: finalUnlocked
  })

  const openMemory = (memory: any, type: 'memory' | 'quality') => {
    setSelectedMemory({
      type,
      title: memory.title || memory.quality,
      date: memory.date,
      description: memory.description,
      example: memory.example,
      imageUrl: memory.imageUrl
    });
    if (type === 'memory') setVisitedMemoryIds((prev) => new Set(prev).add(memory.id))
    if (type === 'quality') setVisitedQualityIds((prev) => new Set(prev).add(memory.id))
  };

  const openCentralMessage = () => {
    setSelectedMemory({
      type: 'memory',
      title: "Моя Вселенная",
      description: "Дашенька, ты - центр моей вселенной. Каждая звезда в этом космосе - это часть того, почему я люблю тебя. Каждая планета - это наш общий момент счастья. Вместе мы создали целую галактику воспоминаний и чувств. Спасибо тебе за то, что ты есть в моей жизни. Я люблю тебя больше всех звезд на небе! ✨💖",
      imageUrl: "/images/central.jpg"
    });
  };

  if (viewMode === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <StarField count={50} />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <div className="max-w-2xl mx-auto animate-intro-appear">
            <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-title-wave">
              Вселенная Дашеньки
            </h1>
            
            <p className="text-pink-200 text-lg md:text-xl mb-8 leading-relaxed animate-text-appear">
              Приготовься к путешествию по нашей собственной вселенной, 
              где каждая звезда - это твое удивительное качество, 
              а каждая планета - наш особенный момент вместе.
            </p>
            
            <div className="animate-button-appear">
              <SimpleButton
                onClick={() => setViewMode('universe')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="mr-2" size={20} />
                Начать путешествие
              </SimpleButton>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes intro-appear {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes title-wave {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes text-appear {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes button-appear {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-intro-appear { animation: intro-appear 1s ease-out; }
          .animate-title-wave { background-size: 200% 200%; animation: title-wave 3s ease-in-out infinite; }
          .animate-text-appear { animation: text-appear 1s ease-out 0.5s forwards; opacity: 0; }
          .animate-button-appear { animation: button-appear 0.5s ease-out 1s forwards; opacity: 0; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <StarField count={150} />
      
      <div className="absolute top-4 left-4 z-40 animate-nav-appear">
        <SimpleButton
          onClick={() => setViewMode('intro')}
          variant="outline"
          className="bg-black/50 border-pink-400/50 text-pink-200 hover:bg-pink-500/20"
        >
          <ArrowLeft className="mr-2" size={16} />
          Назад
        </SimpleButton>
      </div>

      <MiniMap
        totalMemories={memories.length}
        visitedMemories={visitedMemoryIds.size}
        totalQualities={qualities.length}
        visitedQualities={visitedQualityIds.size}
        totalHearts={7}
        foundHearts={foundHeartIds.size}
      />

      <CentralGalaxy onClick={openCentralMessage} />

      {memories.map((memory) => (
        <Planet
          key={memory.id}
          {...memory}
          onClick={() => openMemory(memory, 'memory')}
        />
      ))}

      {qualities.map((quality) => (
        <Star
          key={quality.id}
          {...quality}
          onClick={() => openMemory(quality, 'quality')}
        />
      ))}

      {/* Hidden hearts hunt */}
      <HiddenHearts
        foundIds={foundHeartIds}
        onFound={(id) => setFoundHeartIds((prev) => new Set(prev).add(id))}
      />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-pink-300/80 text-sm animate-instructions-appear">
        <div className="space-y-1">
          <p>Кликай на планеты и звезды, чтобы узнать больше ✨</p>
          <div className="flex gap-2 justify-center">
            <SimpleButton size="sm" variant="outline" className="border-pink-400/50 text-pink-200" onClick={() => setConstellationOpen(true)}>
              Собрать созвездие
            </SimpleButton>
            <SimpleButton size="sm" variant="outline" className="border-pink-400/50 text-pink-200" onClick={() => setQuizOpen(true)}>
              Мини-викторина
            </SimpleButton>
          </div>
        </div>
      </div>

      {selectedMemory && (
        <MemoryModal
          isOpen={!!selectedMemory}
          onClose={() => setSelectedMemory(null)}
          {...selectedMemory}
        />
      )}

      <ConstellationGame
        isOpen={isConstellationOpen}
        onClose={() => setConstellationOpen(false)}
        onComplete={() => setConstellationOpen(false)}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setQuizOpen(false)}
        onComplete={() => setQuizOpen(false)}
      />

      {/* Final surprise appears when all planets and stars viewed and at least 5 hearts found */}
      <FinalSurprise
        isOpen={finalOpen}
        onClose={() => setFinalOpen(false)}
      />
      
      <style>{`
        @keyframes nav-appear {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes instructions-appear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-nav-appear { animation: nav-appear 0.5s ease-out 0.5s forwards; opacity: 0; }
        .animate-instructions-appear { animation: instructions-appear 0.5s ease-out 2s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}


