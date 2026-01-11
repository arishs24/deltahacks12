'use client';

/**
 * CustomizationDemo Component
 * 
 * A simple demo component to show that the customization system is working.
 * This can be added to any page to verify themes and fonts are applied.
 */

import React from 'react';

export function CustomizationDemo() {
  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary">
        Customization System Demo
      </h1>
      
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-xl font-heading font-semibold mb-2">Typography Test</h2>
        <p className="font-primary text-foreground mb-2">
          This is body text using the <strong>primary font</strong> from your font configuration.
        </p>
        <h3 className="text-lg font-heading font-medium mb-2">Heading Font</h3>
        <p className="font-primary text-muted-foreground mb-2">
          This is muted text to show different text colors work properly.
        </p>
        <code className="font-mono bg-muted px-2 py-1 rounded text-sm">
          console.log(&apos;This is monospace font&apos;);
        </code>
      </div>

      <div className="bg-secondary rounded-lg p-4">
        <h3 className="text-lg font-heading font-medium mb-2">Color System Test</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-primary text-primary-foreground p-2 rounded">Primary</div>
          <div className="bg-secondary text-secondary-foreground p-2 rounded">Secondary</div>
          <div className="bg-accent text-accent-foreground p-2 rounded">Accent</div>
          <div className="bg-muted text-muted-foreground p-2 rounded">Muted</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-heading font-medium mb-2">Current Configuration</h3>
        <div className="font-mono text-sm space-y-1">
          <div>Theme: <span className="text-primary">Check customize/themes/theme-config.ts</span></div>
          <div>Fonts: <span className="text-primary">Check customize/fonts/font-config.ts</span></div>
        </div>
      </div>

      <div className="text-center text-muted-foreground">
        <p className="font-primary">
          🎨 Edit files in the <code className="font-mono bg-muted px-1 rounded">customize/</code> folder to see changes!
        </p>
      </div>
    </div>
  );
} 