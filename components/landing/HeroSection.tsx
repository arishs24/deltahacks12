// Component extracted from: Landing Page
// Hero section with main heading and CTA buttons

'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  hasApiKey: boolean;
  onGetStarted: () => void;
  onViewDemo: () => void;
}

export function HeroSection({ hasApiKey, onGetStarted, onViewDemo }: HeroSectionProps) {
  return (
    <motion.div
      className="text-center mb-16 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Sparkles className="w-4 h-4" />
        Moorcheh Chat Boilerplate
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Build Your
        <span className="block text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text">
          AI Chat Experience
        </span>
      </motion.h1>

      <motion.p
        className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        A powerful, customizable chat boilerplate with beautiful themes, flexible fonts, and
        seamless AI integration. Get your chat application running in minutes.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Button
          size="lg"
          className="px-8 py-3 text-lg font-semibold cursor-pointer"
          onClick={onGetStarted}
        >
          <Rocket className="w-5 h-5 mr-2" />
          {hasApiKey ? 'Customize Your Chat' : 'Get Started'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="px-8 py-3 text-lg cursor-pointer"
          onClick={onViewDemo}
        >
          <Settings className="w-5 h-5 mr-2" />
          View Demo
        </Button>
      </motion.div>
    </motion.div>
  );
}
