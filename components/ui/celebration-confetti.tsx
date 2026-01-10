"use client";

import React from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface CelebrationConfettiProps {
  isActive?: boolean;
  numberOfPieces?: number;
  recycle?: boolean;
  colors?: string[];
}

export default function CelebrationConfetti({ 
  isActive = true, 
  numberOfPieces = 200,
  recycle = false,
  colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899']
}: CelebrationConfettiProps) {
  const { width, height } = useWindowSize();
  
  if (!isActive) return null;
  
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={numberOfPieces}
      recycle={recycle}
      colors={colors}
      gravity={0.3}
      wind={0.01}
      initialVelocityY={-10}
      opacity={0.8}
    />
  );
}
