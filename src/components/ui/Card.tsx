import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`rounded-lg border border-clinical-grey-200 bg-white shadow-sm ${className}`}>
      {title && (
        <div className="border-b border-clinical-grey-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-clinical-grey-900">{title}</h3>
        </div>
      )}
      <div className={title ? 'p-6' : 'p-6'}>{children}</div>
    </div>
  );
}
