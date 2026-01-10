interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default',
  className = '' 
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-clinical-grey-100 text-clinical-grey-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-clinical-blue-100 text-clinical-blue-800',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
        ${variantStyles[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
