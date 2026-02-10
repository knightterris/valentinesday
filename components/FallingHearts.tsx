
import React, { useEffect, useState } from 'react';

interface HeartProps {
  id: number;
  left: number;
  duration: number;
  size: number;
  color: string;
}

const FallingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: HeartProps = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: 3 + Math.random() * 7,
        size: 15 + Math.random() * 25,
        color: Math.random() > 0.5 ? '#fb7185' : '#f43f5e', // rose-400 or rose-500
      };

      setHearts((prev) => [...prev.slice(-40), newHeart]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute top-[-50px] animate-fall"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            color: heart.color,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};

export default FallingHearts;
