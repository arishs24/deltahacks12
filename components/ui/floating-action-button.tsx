"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "./button";

interface FloatingActionButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  size?: "sm" | "md" | "lg";
}

export function FloatingActionButton({
  children,
  className,
  onClick,
  position = "bottom-right",
  size = "md",
}: FloatingActionButtonProps) {
  const positionStyles = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6", 
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  const sizeStyles = {
    sm: "h-12 w-12",
    md: "h-14 w-14", 
    lg: "h-16 w-16",
  };

  return (
    <motion.div
      className={cn(
        "fixed z-50",
        positionStyles[position]
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Button
        className={cn(
          "rounded-full shadow-lg",
          sizeStyles[size],
          className
        )}
        onClick={onClick}
      >
        {children}
      </Button>
      
      {/* Pulse animation */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full bg-primary/20",
          sizeStyles[size]
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
