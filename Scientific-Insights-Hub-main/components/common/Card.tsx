
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg ring-1 ring-white/10 p-6 backdrop-blur-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 bg-slate-700 h-12 w-12 flex items-center justify-center rounded-lg text-indigo-400">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
      </div>
      <div className="text-slate-300">
        {children}
      </div>
    </div>
  );
};

export default Card;
