'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import ClinicalHeader from './ClinicalHeader';

interface ClinicalLayoutProps {
  children: ReactNode;
  currentPatient?: string;
}

/**
 * ClinicalLayout Component
 * 
 * Layout structure with fixed sidebar and scrollable main content:
 * - Sidebar: Fixed height (h-screen), does not scroll
 * - Main container: Flex column with overflow-hidden to prevent nested scrolling
 * - Header: Sticky header at top of main content area
 * - Main content: Single scrollable area (overflow-y-auto) for page content
 * 
 * This ensures only one scrollbar appears for the main content area,
 * and the sidebar remains fixed while scrolling.
 */
export default function ClinicalLayout({ children, currentPatient }: ClinicalLayoutProps) {
  return (
    <div className="flex h-screen bg-clinical-grey-50 overflow-hidden">
      {/* Fixed sidebar - does not scroll */}
      <Sidebar />
      {/* Main content area - flex column to stack header and scrollable content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Sticky header - remains visible while scrolling content */}
        <ClinicalHeader currentPatient={currentPatient} />
        {/* Single scrollable main content area */}
        <main className="flex-1 overflow-y-auto p-6 min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}
