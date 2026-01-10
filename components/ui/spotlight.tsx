import React, { useRef, useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
  isSelected?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "hsl(var(--primary) / 0.2)",
  isSelected = false
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  // Show spotlight for selected cards
  useEffect(() => {
    if (isSelected) {
      setOpacity(0.6);
    } else {
      setOpacity(0);
    }
  }, [isSelected]);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(isSelected ? 1.0 : 0.8);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(isSelected ? 0.6 : 0);
  };

  const handleMouseEnter = () => {
    setOpacity(isSelected ? 1.0 : 0.8);
  };

  const handleMouseLeave = () => {
    setOpacity(isSelected ? 0.6 : 0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 ${
        isSelected 
          ? 'border-primary shadow-lg shadow-primary/20' 
          : 'hover:border-primary/50'
      } ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;