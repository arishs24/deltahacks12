'use client';

import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from './button';

/**
 * SuccessToast Component
 * 
 * A reusable toast notification component for displaying success messages.
 * Matches the clinical UI design with neutral colors and clean styling.
 * 
 * Features:
 * - Auto-dismisses after specified duration
 * - Manual dismiss via close button
 * - Keyboard accessible (ESC to dismiss)
 * - Positioned at bottom-right of screen
 * - Smooth slide-in animation
 */

interface SuccessToastProps {
  /** Whether the toast is visible */
  isVisible: boolean;
  /** Main success message */
  title: string;
  /** Optional descriptive text */
  description?: string;
  /** Callback when toast is dismissed */
  onDismiss: () => void;
  /** Auto-dismiss duration in milliseconds (default: 5000) */
  duration?: number;
}

export function SuccessToast({
  isVisible,
  title,
  description,
  onDismiss,
  duration = 5000,
}: SuccessToastProps) {
  // Auto-dismiss after specified duration
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onDismiss]);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onDismiss]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <>
      {/* Overlay - subtle backdrop for focus */}
      <div
        className="fixed inset-0 bg-black/10 z-40 transition-opacity"
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Toast Container - positioned at bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-50 w-full max-w-md animate-slide-in-from-right"
        role="alert"
        aria-live="polite"
      >
        <div className="bg-white rounded-lg shadow-lg border border-clinical-grey-200 overflow-hidden">
          {/* Success indicator stripe */}
          <div className="h-1 bg-green-500" />

          {/* Content */}
          <div className="p-5 flex items-start gap-4">
            {/* Success icon */}
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-clinical-grey-900">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-sm text-clinical-grey-600">
                  {description}
                </p>
              )}
            </div>

            {/* Close button */}
            <div className="flex-shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 w-8 p-0 hover:bg-clinical-grey-100"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4 text-clinical-grey-500" />
              </Button>
            </div>
          </div>

          {/* Optional progress bar for auto-dismiss */}
          <div className="h-1 bg-clinical-grey-100 relative overflow-hidden">
            <div
              className="h-full bg-green-500 animate-shrink-width"
              style={{
                animationDuration: `${duration}ms`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * ErrorToast Component
 * 
 * Similar to SuccessToast but styled for error messages.
 */

interface ErrorToastProps {
  /** Whether the toast is visible */
  isVisible: boolean;
  /** Main error message */
  title: string;
  /** Optional descriptive text */
  description?: string;
  /** Callback when toast is dismissed */
  onDismiss: () => void;
  /** Auto-dismiss duration in milliseconds (default: 5000) */
  duration?: number;
}

export function ErrorToast({
  isVisible,
  title,
  description,
  onDismiss,
  duration = 5000,
}: ErrorToastProps) {
  // Auto-dismiss after specified duration
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onDismiss]);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onDismiss]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <>
      {/* Overlay - subtle backdrop for focus */}
      <div
        className="fixed inset-0 bg-black/10 z-40 transition-opacity"
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Toast Container - positioned at bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-50 w-full max-w-md animate-slide-in-from-right"
        role="alert"
        aria-live="assertive"
      >
        <div className="bg-white rounded-lg shadow-lg border border-clinical-grey-200 overflow-hidden">
          {/* Error indicator stripe */}
          <div className="h-1 bg-red-500" />

          {/* Content */}
          <div className="p-5 flex items-start gap-4">
            {/* Error icon */}
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                <X className="h-4 w-4 text-red-600" />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-clinical-grey-900">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-sm text-clinical-grey-600">
                  {description}
                </p>
              )}
            </div>

            {/* Close button */}
            <div className="flex-shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 w-8 p-0 hover:bg-clinical-grey-100"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4 text-clinical-grey-500" />
              </Button>
            </div>
          </div>

          {/* Optional progress bar for auto-dismiss */}
          <div className="h-1 bg-clinical-grey-100 relative overflow-hidden">
            <div
              className="h-full bg-red-500 animate-shrink-width"
              style={{
                animationDuration: `${duration}ms`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
