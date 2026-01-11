"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Settings, 
  Palette, 
  Type, 
  Rocket
} from "lucide-react";
import { Button } from "../../components/ui/button";
import ThemeSelector from "../../components/ui/ThemeSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";

import SpotlightCard from "../../components/ui/spotlight";

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
              A powerful, customizable chat boilerplate with beautiful themes, flexible fonts, 
              and seamless AI integration. Get your chat application running in minutes.
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
                onClick={handleGetStarted}
              >
                <Rocket className="w-5 h-5 mr-2" />
                {hasApiKey ? 'Customize Your Chat' : 'Get Started'}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg cursor-pointer"
                onClick={() => router.push('/demo')}
              >
                <Settings className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </motion.div>
          </motion.div>

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
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <SpotlightCard 
                  className="h-full p-6"
                  spotlightColor="hsl(var(--primary) / 0.3)"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="mt-auto">
                    {feature.content}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Status Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <SpotlightCard 
              className="p-6 text-center"
              spotlightColor={hasApiKey ? "hsl(var(--primary) / 0.25)" : "hsl(25 95% 53% / 0.25)"}
            >
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Quick Setup Status</h3>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className={`flex items-center gap-2 ${hasApiKey ? 'text-green-600' : 'text-orange-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  API Key: {hasApiKey ? 'Configured' : 'Needs Setup'}
                </div>
                <div className="text-muted-foreground">
                  •
                </div>
                <div className="text-muted-foreground">
                  Themes: Ready
                </div>
                <div className="text-muted-foreground">
                  •
                </div>
                <div className="text-muted-foreground">
                  Fonts: Ready
                </div>
              </div>
              
              {!hasApiKey && (
                <p className="text-muted-foreground mt-3 text-sm">
                  Complete the setup process to configure your API key and customize your chat experience
                </p>
              )}
            </SpotlightCard>
          </motion.div>
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