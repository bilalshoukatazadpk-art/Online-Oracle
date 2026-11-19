import type { MouseEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';

interface TiltServiceCardProps {
  children: ReactNode;
  accent?: 'orange' | 'magenta';
  className?: string;
}

export function TiltServiceCard({
  children,
  accent = 'orange',
  className = '',
}: TiltServiceCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState(
    'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
  );
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = x * 7;
    const rotX = -y * 7;
    setTransformStyle(
      `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`,
    );
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTransformStyle('perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)');
  };

  const hoverBorder =
    accent === 'orange' ? 'hover:border-[#FFA302]/60' : 'hover:border-[#CC1DB9]/60';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: hovered
          ? 'transform 110ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms ease'
          : 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms ease',
      }}
      className={`rounded-xl border border-white/10 bg-[#0D0D11] ${hoverBorder} will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
