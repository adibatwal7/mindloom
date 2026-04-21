import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from './Button';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

const Card: React.FC<CardProps> = ({ 
  className, 
  children,
  variant = 'default',
  ...props 
}) => {
  const baseStyles = 'rounded-3xl overflow-hidden';
  const variants = {
    default: 'bg-white shadow-xl border border-gray-100',
    glass: 'bg-white/80 backdrop-blur-md shadow-2xl border border-white/50',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
