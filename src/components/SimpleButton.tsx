import { ReactNode, ButtonHTMLAttributes } from 'react';

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export function SimpleButton({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default',
  ...props 
}: SimpleButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/50";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  } as const;
  
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3",
    lg: "h-10 rounded-md px-6"
  } as const;

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}


