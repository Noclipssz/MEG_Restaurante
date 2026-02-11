import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  variant?: 'default' | 'cream' | 'orange';
}

export function Section({ id, className, children, variant = 'default' }: SectionProps) {
  const variants = {
    default: 'bg-white',
    cream: 'bg-[#FFF8F2]',
    orange: 'bg-[#E8611A] text-white'
  };
  
  return (
    <section id={id} className={cn('py-16 md:py-24', variants[variant], className)}>
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl', className)}>
      {children}
    </div>
  );
}
