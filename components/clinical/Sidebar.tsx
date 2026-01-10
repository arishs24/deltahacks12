'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Eye, 
  Settings,
  Stethoscope 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Model Viewer', href: '/viewer', icon: Eye },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-clinical-grey-900 text-white">
      <div className="flex h-16 items-center border-b border-clinical-grey-800 px-6">
        <Stethoscope className="h-6 w-6 text-clinical-blue-400 mr-2" />
        <span className="text-lg font-semibold">Knee CDS</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-clinical-blue-600 text-white'
                  : 'text-clinical-grey-300 hover:bg-clinical-grey-800 hover:text-white'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-clinical-grey-800 p-4">
        <p className="text-xs text-clinical-grey-400">
          Clinical Decision Support Tool
        </p>
        <p className="text-xs text-clinical-grey-500 mt-1">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
