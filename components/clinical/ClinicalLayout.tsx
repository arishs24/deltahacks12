'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import ClinicalHeader from './ClinicalHeader';

interface ClinicalLayoutProps {
  children: ReactNode;
  currentPatient?: string;
}

export default function ClinicalLayout({ children, currentPatient }: ClinicalLayoutProps) {
  return (
    <div className="flex h-screen bg-clinical-grey-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ClinicalHeader currentPatient={currentPatient} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
