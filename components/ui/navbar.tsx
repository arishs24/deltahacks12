"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { branding } from "@/lib/branding-config";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ color: "var(--foreground)" }}>
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center w-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center touch-manipulation">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              {branding.getAppName()}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              href="/" 
              className="text-sm lg:text-base font-medium hover:text-primary transition-colors touch-manipulation py-2 px-1" 
              style={{ color: "var(--foreground)" }}
            >
              Home
            </Link>
            <Link 
              href="/demo" 
              className="text-sm lg:text-base font-medium hover:text-primary transition-colors touch-manipulation py-2 px-1" 
              style={{ color: "var(--foreground)" }}
            >
              Demo
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-9 w-9 p-0 touch-manipulation hover:bg-accent"
                >
                  {open ? (
                    <X className="h-5 w-5" style={{ color: "var(--foreground)" }} />
                  ) : (
                    <Menu className="h-5 w-5" style={{ color: "var(--foreground)" }} />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[280px] sm:w-[320px] p-0 mobile-dialog" 
                style={{ background: "var(--background)", color: "var(--foreground)" }}
              >
                <div className="flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-primary">
                        {branding.getAppName()}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 touch-manipulation"
                      onClick={() => setOpen(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>

                  {/* Mobile navigation */}
                  <nav className="flex flex-col gap-1 p-4">
                    <Link 
                      href="/" 
                      className="flex items-center py-3 px-4 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-lg touch-manipulation"
                      style={{ color: "var(--foreground)" }}
                      onClick={handleLinkClick}
                    >
                      <span>Home</span>
                    </Link>

                    <Link 
                      href="/demo" 
                      className="flex items-center py-3 px-4 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-lg touch-manipulation"
                      style={{ color: "var(--foreground)" }}
                      onClick={handleLinkClick}
                    >
                      <span>Demo</span>
                    </Link>
                  </nav>

                  {/* Mobile footer */}
                  <div className="mt-auto p-4 border-t border-border">
                    <div className="text-xs text-muted-foreground text-center">
                      {branding.getCompanyName()}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}