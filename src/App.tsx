import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

// Типы для данных
interface Habit {
  id: number;
  name: string;
  icon: keyof typeof LucideIcons;
  streak: number;
  completed: boolean;
  color: 'game-orange' | 'game-green' | 'game-blue' | 'game-pink' | 'game-purple';
  progress: number;
  xp: number;
}

interface Achievement {
  name: string;
  icon: keyof typeof LucideIcons;
  unlocked: boolean;
  color: 'game-orange' | 'game-green' | 'game-blue' | 'game-pink' | 'game-purple';
}

// Хардкод-данные
const habits: Habit[] = [
  { id: 1, name: 'Чтение 30 мин', icon: 'BookOpen', streak: 12, completed: true, color: 'game-blue', progress: 100, xp: 50 },
  { id: 2, name: 'Зарядка', icon: 'Dumbbell', streak: 5, completed: false, color: 'game-orange', progress: 60, xp: 30 },
  { id: 3, name: '2 л воды', icon: 'Droplet', streak: 8, completed: true, color: 'game-green', progress: 100, xp: 40 },
  { id: 4, name: 'Медитация', icon: 'Brain', streak: 3, completed: false, color: 'game-purple', progress: 40, xp: 20 },
  { id: 5, name: 'Сон до 23:00', icon: 'Moon', streak: 15, completed: true, color: 'game-pink', progress: 100, xp: 50 },
];

const achievements: Achievement[] = [
  { name: 'Первые 7 дней', icon: 'Award', unlocked: true, color: 'game-orange' },
  { name: 'Железная воля', icon: 'Flame', unlocked: true, color: 'game-pink' },
  { name: 'Книжный червь', icon: 'BookOpen', unlocked: false, color: 'game-blue' },
  { name: 'Спортсмен', icon: 'Dumbbell', unlocked: false, color: 'game-green' },
  { name: 'Мастер медитации', icon: 'Brain', unlocked: false, color: 'game-purple' },
  { name: 'Коллекционер', icon: 'Trophy', unlocked: true, color: 'game-orange' },
];

const generateHeatmapData = () => {
  const weeks = 12;
  const daysPerWeek = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      week.push(Math.floor(Math.random() * 8));
    }
    data.push(week);
  }
  return data;
};

const heatmapData = generateHeatmapData();

// Типы фигур Тетриса
type TetrominoShape = number[][];

// Фигуры Тетриса (7 классических)
const tetrominos: TetrominoShape[] = [
  // I - палка
  [[1, 1, 1, 1]],
  // O - квадрат
  [[1, 1], [1, 1]],
  // T - т
  [[0, 1, 0], [1, 1, 1]],
  // S - зигзаг
  [[0, 1, 1], [1, 1, 0]],
  // Z - обратный зигзаг
  [[1, 1, 0], [0, 1, 1]],
  // L - угол
  [[1, 0, 0], [1, 1, 1]],
  // J - обратный угол
  [[0, 0, 1], [1, 1, 1]],
];

// Много цветов для фигур
const tetrominoColors = [
  '#00F0F0', // Циан
  '#F0F000', // Жёлтый
  '#A000F0', // Фиолетовый
  '#00F000', // Зелёный
  '#F00000', // Красный
  '#F0A000', // Оранжевый
  '#0000F0', // Синий
  '#FF6B6B', // Светло-красный
  '#FFE66D', // Светло-жёлтый
  '#4ECDC4', // Бирюзовый
  '#FF9F1C', // Оранжевый
  '#E056A0', // Розовый
  '#6C5CE7', // Фиолетовый
  '#00CEC9', // Циан
  '#74B9FF', // Голубой
  '#55EFC4', // Мятный
  '#FDCB6E', // Персиковый
  '#E17055', // Терракотовый
  '#0984E3', // Синий
  '#A29BFE', // Лавандовый
  '#FD79A8', // Светло-розовый
  '#D63031', // Тёмно-красный
];

// Компонент фигуры Тетриса
const Tetromino: React.FC<{ 
  shape: TetrominoShape; 
  color: string; 
  left: string; 
  top: string; 
  delay: number;
  cellSize: number;
  duration: number;
}> = ({ shape, color, left, top, delay, cellSize, duration }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top }}
      initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
      animate={{ 
        opacity: 0.45,
        y: [0, -12, 0],
        rotate: [0, 4, 0, -4, 0],
        scale: [0.95, 1, 0.95],
      }}
      transition={{
        y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: duration + 2, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration: duration - 1, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 1.5, delay },
      }}
    >
      {shape.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="rounded-md"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell ? color : 'transparent',
                margin: 0,
                opacity: cell ? 1 : 0,
                boxShadow: cell ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
              }}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

// Компонент логотипа-пьедестала
const PodiumLogo: React.FC = () => {
  return (
    <div className="relative w-10 h-10">
      <motion.div
        className="absolute rounded-md shadow-game-sm"
        style={{
          width: '18px',
          height: '18px',
          backgroundColor: '#2EC4B6',
          left: '0',
          bottom: '0',
        }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-md shadow-game-sm"
        style={{
          width: '18px',
          height: '18px',
          backgroundColor: '#FFE66D',
          right: '0',
          bottom: '0',
        }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div
        className="absolute rounded-md shadow-game-sm"
        style={{
          width: '18px',
          height: '18px',
          backgroundColor: '#FF6B6B',
          left: '11px',
          bottom: '14px',
        }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  );
};

const Icon: React.FC<{ name: keyof typeof LucideIcons; className?: string; size?: number }> = ({ name, className, size = 24 }) => {
  const LucideIcon = LucideIcons[name] as React.FC<{ size?: number; className?: string }>;
  if (!LucideIcon) return <LucideIcons.HelpCircle size={size} className={className} />;
  return <LucideIcon size={size} className={className} />;
};

const App: React.FC = () => {
  const userLevel = 12;
  const currentXP = 2400;
  const maxXP = 3000;
  const xpPercent = (currentXP / maxXP) * 100;
  const coins = "2.4K";

  // Генерация 35 фигур Тетриса, равномерно распределённых
  const generateTetrominos = () => {
    const items = [];
    const count = 35;
    
    // Предопределённые позиции для равномерного распределения
    const positions = [
      // Левый верх
      { left: '5%', top: '8%' },
      { left: '8%', top: '18%' },
      { left: '3%', top: '30%' },
      // Левый центр
      { left: '7%', top: '45%' },
      { left: '4%', top: '58%' },
      { left: '6%', top: '72%' },
      // Левый низ
      { left: '8%', top: '85%' },
      { left: '3%', top: '92%' },
      
      // Правый верх
      { left: '90%', top: '5%' },
      { left: '93%', top: '20%' },
      { left: '88%', top: '35%' },
      // Правый центр
      { left: '92%', top: '50%' },
      { left: '87%', top: '65%' },
      { left: '91%', top: '78%' },
      // Правый низ
      { left: '89%', top: '88%' },
      { left: '94%', top: '94%' },
      
      // Центр верх
      { left: '45%', top: '3%' },
      { left: '55%', top: '7%' },
      { left: '50%', top: '12%' },
      // Центр (между колонками)
      { left: '35%', top: '25%' },
      { left: '65%', top: '28%' },
      { left: '40%', top: '40%' },
      { left: '60%', top: '42%' },
      // Центр низ
      { left: '38%', top: '75%' },
      { left: '62%', top: '78%' },
      { left: '45%', top: '88%' },
      { left: '55%', top: '92%' },
      
      // Дополнительные по краям
      { left: '15%', top: '12%' },
      { left: '80%', top: '15%' },
      { left: '12%', top: '65%' },
      { left: '82%', top: '60%' },
      { left: '20%', top: '90%' },
      { left: '75%', top: '90%' },
      { left: '25%', top: '5%' },
      { left: '70%', top: '5%' },
    ];
    
    for (let i = 0; i < count; i++) {
      const shapeIndex = i % tetrominos.length;
      const colorIndex = i % tetrominoColors.length;
      const posIndex = i % positions.length;
      
      items.push({
        id: i,
        shape: tetrominos[shapeIndex],
        color: tetrominoColors[colorIndex],
        left: positions[posIndex].left,
        top: positions[posIndex].top,
        delay: (i * 0.3) % 3,
        cellSize: 24 + (i % 3) * 4, // 24, 28, 32px
        duration: 5 + (i % 4),
      });
    }
    return items;
  };

  const tetrominoItems = generateTetrominos();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden p-4 md:p-6">
      {/* Фигуры Тетриса на фоне - 35 штук, равномерно распределены */}
      {tetrominoItems.map((item) => (
        <Tetromino
          key={item.id}
          shape={item.shape}
          color={item.color}
          left={item.left}
          top={item.top}
          delay={item.delay}
          cellSize={item.cellSize}
          duration={item.duration}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Шапка */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#2d2d2d] p-4 rounded-3xl shadow-game border-4 border-gray-500"
        >
          <div className="flex items-center gap-3">
            <PodiumLogo />
            <h1 className="text-2xl md:text-3xl font-display font-extrabold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Habit Hack
            </h1>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex items-center gap-2 bg-game-orange/20 px-4 py-2 rounded-full border-4 border-game-orange/60">
              <span className="font-bold text-game-orange">УРОВЕНЬ {userLevel}</span>
            </div>
            <div className="flex items-center gap-2 bg-game-blue/20 px-4 py-2 rounded-full border-4 border-game-blue/60">
              <Icon name="Coins" size={20} className="text-game-blue" />
              <span className="font-bold text-game-blue">{coins}</span>
            </div>
            <div className="flex items-center gap-2 bg-game-pink/20 px-4 py-2 rounded-full border-4 border-game-pink/60">
              <Icon name="Zap" size={20} className="text-game-pink" />
              <span className="font-bold text-game-pink">12</span>
            </div>
          </div>
        </motion.header>

        {/* Основная сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Сегодняшние задания */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-[#2d2d2d] p-5 rounded-3xl shadow-game border-4 border-gray-500"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Zap" size={28} className="text-game-orange" />
                <h2 className="text-2xl font-display font-bold text-white">Сегодняшние задания</h2>
              </div>
              <div className="space-y-4">
                {habits.map((habit, index) => {
                  const IconComponent = LucideIcons[habit.icon] as React.FC<{ size?: number; className?: string }>;
                  const borderColor = habit.completed ? 'border-game-green' : 'border-gray-500';
                  return (
                    <motion.div
                      key={habit.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`bg-[#3a3a3a] border-4 ${borderColor} rounded-2xl p-4 shadow-game-sm cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-${habit.color} text-white shadow-game-sm border-2 border-white/20`}>
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-white">{habit.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-300">
                              <Icon name="Flame" size={14} className="text-game-orange" />
                              <span>🔥{habit.streak}</span>
                              <span className="mx-1">•</span>
                              <span className="font-medium text-game-green">+{habit.xp} XP</span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          className={`w-12 h-12 rounded-xl shadow-game-sm flex items-center justify-center border-2 ${
                            habit.completed 
                              ? 'bg-game-green text-white border-game-green/50' 
                              : 'bg-gray-600 text-gray-300 border-gray-500'
                          }`}
                        >
                          {habit.completed ? <Icon name="Check" size={24} /> : <Icon name="Circle" size={24} />}
                        </motion.button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold w-10 text-gray-300">{habit.progress}%</span>
                        <div className="flex-1 h-4 bg-gray-600 rounded-full overflow-hidden border border-gray-500">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${habit.progress}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full bg-${habit.color} rounded-full`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Колесо фортуны */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-game-purple/30 to-game-pink/30 backdrop-blur-sm p-5 rounded-3xl shadow-game border-4 border-gray-500"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="p-2 bg-[#2d2d2d] rounded-xl border-2 border-gray-500"
                  >
                    <Icon name="FerrisWheel" size={36} className="text-game-purple" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">Колесо фортуны</h3>
                    <p className="text-sm text-gray-300">1 бесплатное вращение доступно!</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-6 rounded-2xl shadow-game flex items-center gap-2 border-4 border-red-300"
                >
                  <Icon name="Dices" size={20} />
                  КРУТИТЬ
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Тепловая карта */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#2d2d2d] p-5 rounded-3xl shadow-game border-4 border-gray-500"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Calendar" size={28} className="text-game-blue" />
              <h2 className="text-2xl font-display font-bold text-white">Активность</h2>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {heatmapData.flat().map((value, idx) => {
                let bgColor = 'bg-gray-600';
                let borderColor = 'border-gray-500';
                if (value >= 5) {
                  bgColor = 'bg-game-green';
                  borderColor = 'border-game-green/50';
                } else if (value >= 3) {
                  bgColor = 'bg-game-orange';
                  borderColor = 'border-game-orange/50';
                } else if (value >= 1) {
                  bgColor = 'bg-game-orange/60';
                  borderColor = 'border-game-orange/30';
                }
                
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    className={`aspect-square rounded-md ${bgColor} shadow-game-sm border-2 ${borderColor}`}
                    title={`${value} привычек выполнено`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Последние 12 недель</p>
          </motion.div>
        </div>

        {/* Достижения */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-[#2d2d2d] p-5 rounded-3xl shadow-game border-4 border-gray-500"
        >
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Trophy" size={28} className="text-game-pink" />
            <h2 className="text-2xl font-display font-bold text-white">Достижения</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {achievements.map((ach, idx) => {
              const IconComponent = LucideIcons[ach.icon] as React.FC<{ size?: number; className?: string }>;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className={`rounded-2xl p-4 text-center border-4 ${
                    ach.unlocked 
                      ? `border-${ach.color} bg-${ach.color}/15` 
                      : 'border-gray-600 bg-[#3a3a3a]'
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-xl border-2 ${
                    ach.unlocked 
                      ? `bg-${ach.color} text-white border-white/20` 
                      : 'bg-gray-600 text-gray-300 border-gray-500'
                  } shadow-game-sm mb-2`}>
                    <IconComponent size={28} />
                  </div>
                  <h4 className="font-bold text-sm text-white">{ach.name}</h4>
                  <p className={`text-xs mt-1 font-medium ${ach.unlocked ? 'text-game-green' : 'text-gray-400'}`}>
                    {ach.unlocked ? '✅ Получено' : '🔒 Закрыто'}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Прогресс уровня */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-gradient-to-r from-red-600 to-orange-600 p-5 rounded-3xl shadow-game text-white border-4 border-red-300"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Icon name="Sparkles" size={28} />
              <span className="font-display font-bold text-xl">Уровень {userLevel}</span>
            </div>
            <span className="font-bold">{currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP</span>
          </div>
          <div className="h-6 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="mt-2 text-sm font-medium opacity-90 flex items-center gap-1">
            <Icon name="Zap" size={16} />
            Ещё {maxXP - currentXP} XP до {userLevel + 1} уровня!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default App;