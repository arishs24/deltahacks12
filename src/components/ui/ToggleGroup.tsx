import { ReactNode } from 'react';

interface ToggleGroupProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ToggleGroup({
  options,
  value,
  onChange,
  className = '',
}: ToggleGroupProps) {
  const isVertical = className.includes('flex-col');
  const baseClasses = isVertical 
    ? 'flex flex-col rounded-lg border border-clinical-grey-200 p-1 gap-1'
    : 'inline-flex rounded-lg border border-clinical-grey-200 p-1';

  return (
    <div className={`${baseClasses} ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            rounded-md px-4 py-2 text-sm font-medium transition-colors w-full
            ${
              value === option.value
                ? 'bg-clinical-blue-600 text-white shadow-sm'
                : 'text-clinical-grey-700 hover:bg-clinical-grey-100'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
