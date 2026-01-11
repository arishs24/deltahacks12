"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Palette, Type, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import ThemeSelector from "../../components/ui/ThemeSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { HeroSection } from "../../components/landing/HeroSection";
import { FeatureCard } from "../../components/landing/FeatureCard";
import { StatusCard } from "../../components/landing/StatusCard";

export default function LandingPage() {
  const router = useRouter();
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>('slate');

  useEffect(() => {
    setHasApiKey(!!process.env.NEXT_PUBLIC_MOORCHEH_API_KEY);
    
    // Load current theme from appearance.json
    fetch('/api/appearance')
      .then(res => res.json())
      .then(config => {
        setCurrentTheme(config.theme?.defaultTheme || 'slate');
      })
      .catch(() => {
        // Fallback to default theme
        setCurrentTheme('slate');
      });
  }, []);

  const handleGetStarted = () => {
    router.push('/landing/setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <HeroSection
            hasApiKey={hasApiKey}
            onGetStarted={handleGetStarted}
            onViewDemo={() => router.push('/demo')}
          />

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              {
                icon: <Palette className="w-6 h-6 text-primary" />,
                title: "Beautiful Themes",
                description: "Choose from pre-built themes or create custom color schemes that match your brand",
                content: (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setShowThemeSelector(true)}
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Choose Theme
                    </Button>
                  </div>
                )
              },
              {
                icon: <Type className="w-6 h-6 text-primary" />,
                title: "Typography System", 
                description: "50+ Google Fonts with smart combinations for perfect readability and style",
                content: (
                  <div className="space-y-1 text-sm">
                    <div style={{ fontFamily: 'Inter' }}>Inter - Modern & Clean</div>
                    <div style={{ fontFamily: 'Poppins' }}>Poppins - Friendly</div>
                    <div style={{ fontFamily: 'Roboto' }}>Roboto - Professional</div>
                  </div>
                )
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "AI-Powered",
                description: "Integrated with Moorcheh AI for intelligent conversations and responses",
                content: (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Ready to connect
                  </div>
                )
              }
            ].map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                content={feature.content}
                index={index}
              />
            ))}
          </motion.div>

          {/* Status Section */}
          <StatusCard hasApiKey={hasApiKey} />
        </div>
      </main>

      {/* Theme Selector Dialog */}
      <Dialog open={showThemeSelector} onOpenChange={setShowThemeSelector}>
        <DialogContent
          className="max-w-4xl max-h-[70vh] overflow-y-auto"
          aria-describedby="theme-selector-description"
        >
          <DialogHeader>
            <DialogTitle className="text-center">Choose Your Theme</DialogTitle>
            <div
              id="theme-selector-description"
              className="text-sm text-muted-foreground text-center"
            >
              Select a theme to customize your chat experience
            </div>
          </DialogHeader>
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeSelect={(theme) => {
              setCurrentTheme(theme);
              setShowThemeSelector(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}