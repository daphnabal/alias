import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  delay: number;
}

const CONFETTI_COLORS = [
  '#ef4444', '#3b82f6', '#22c55e', '#facc15', '#a855f7', '#f97316',
  '#ec4899', '#14b8a6', '#f43f5e', '#8b5cf6',
];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    rotation: Math.random() * 360,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 8,
    velocityX: (Math.random() - 0.5) * 4,
    velocityY: 2 + Math.random() * 4,
    delay: Math.random() * 1.5,
  }));
}

interface ConfettiProps {
  /** Number of confetti pieces */
  count?: number;
  /** Duration in ms before confetti disappears */
  duration?: number;
}

export default function Confetti({ count = 60, duration = 4000 }: ConfettiProps) {
  const [particles] = useState(() => createParticles(count));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: '2px',
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
