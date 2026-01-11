// Component extracted from: Landing Page
// Status card showing setup status

'use client';

import { motion } from 'framer-motion';
import SpotlightCard from '@/components/ui/spotlight';

interface StatusCardProps {
  hasApiKey: boolean;
}

export function StatusCard({ hasApiKey }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      <SpotlightCard
        className="p-6 text-center"
        spotlightColor={
          hasApiKey ? 'hsl(var(--primary) / 0.25)' : 'hsl(25 95% 53% / 0.25)'
        }
      >
        <h3 className="text-lg font-semibold mb-2 text-card-foreground">
          Quick Setup Status
        </h3>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div
            className={`flex items-center gap-2 ${
              hasApiKey ? 'text-green-600' : 'text-orange-600'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                hasApiKey ? 'bg-green-500' : 'bg-orange-500'
              }`}
            ></div>
            API Key: {hasApiKey ? 'Configured' : 'Needs Setup'}
          </div>
          <div className="text-muted-foreground">•</div>
          <div className="text-muted-foreground">Themes: Ready</div>
          <div className="text-muted-foreground">•</div>
          <div className="text-muted-foreground">Fonts: Ready</div>
        </div>

        {!hasApiKey && (
          <p className="text-muted-foreground mt-3 text-sm">
            Complete the setup process to configure your API key and customize your chat
            experience
          </p>
        )}
      </SpotlightCard>
    </motion.div>
  );
}
