
import React from 'react';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex items-center mb-3">
          {icon && <div className="mr-4 text-sky-500">{icon}</div>}
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        </div>
        <div className="text-slate-600 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};
