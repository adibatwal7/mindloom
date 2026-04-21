import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'lavender';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:  'bg-primary text-white hover:bg-primary-deep focus:ring-indigo-400 shadow-md shadow-indigo-900/10',
    lavender: 'bg-lavender text-white hover:bg-[#6B5BD3] focus:ring-violet-400 shadow-md shadow-violet-900/10',
    secondary:'bg-cloud text-primaryText hover:bg-indigo-100 focus:ring-indigo-300 border border-indigo-100',
    outline:  'border-2 border-primary/30 bg-transparent text-primary hover:bg-cloud focus:ring-indigo-300',
    ghost:    'bg-transparent text-primaryText hover:bg-softGray shadow-none',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm rounded-xl',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg rounded-3xl',
    xl: 'h-[60px] px-10 text-xl rounded-3xl',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
