// Component extracted from: Landing Page
// Individual feature card component

'use client';

import { motion } from 'framer-motion';
import SpotlightCard from '@/components/ui/spotlight';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
  index: number;
}

export function FeatureCard({ icon, title, description, content, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <SpotlightCard className="h-full p-6" spotlightColor="hsl(var(--primary) / 0.3)">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="mt-auto">{content}</div>
      </SpotlightCard>
    </motion.div>
  );
}
