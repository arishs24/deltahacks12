import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  currentPatient?: string;
}

export default function Layout({ children, currentPatient }: LayoutProps) {
  return (
    <div className="flex h-screen bg-clinical-grey-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header currentPatient={currentPatient} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
