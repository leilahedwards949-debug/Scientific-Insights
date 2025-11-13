
import React, { useState, useCallback } from 'react';
import { Home, Calculator, BrainCircuit, Rocket, BarChart2 } from 'lucide-react';
import HomePage from './components/HomePage';
import ScientificCalculator from './components/ScientificCalculator';
import MLPlayground from './components/MLPlayground';
import AstronomyTools from './components/AstronomyTools';
import DataVisualizer from './components/DataVisualizer';
import { Tool } from './types';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-slate-700 text-white'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.HOME);

  const renderTool = useCallback(() => {
    switch (activeTool) {
      case Tool.HOME:
        return <HomePage />;
      case Tool.CALCULATOR:
        return <ScientificCalculator />;
      case Tool.ML_PLAYGROUND:
        return <MLPlayground />;
      case Tool.ASTRONOMY:
        return <AstronomyTools />;
      case Tool.VISUALIZER:
        return <DataVisualizer />;
      default:
        return <HomePage />;
    }
  }, [activeTool]);

  const navItems = [
    { id: Tool.HOME, icon: <Home size={20} />, label: 'Home' },
    { id: Tool.CALCULATOR, icon: <Calculator size={20} />, label: 'Symbolic Calculator' },
    { id: Tool.ML_PLAYGROUND, icon: <BrainCircuit size={20} />, label: 'ML Playground' },
    { id: Tool.ASTRONOMY, icon: <Rocket size={20} />, label: 'Astronomy Tools' },
    { id: Tool.VISUALIZER, icon: <BarChart2 size={20} />, label: 'Data Visualizer' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      <aside className="w-64 flex-shrink-0 bg-slate-900/70 backdrop-blur-lg border-r border-slate-800 p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="ml-2 text-xl font-bold text-white">Scientific Hub</h1>
        </div>
        <nav className="flex-grow space-y-2">
          {navItems.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeTool === item.id}
              onClick={() => setActiveTool(item.id)}
            />
          ))}
        </nav>
        <div className="text-xs text-slate-500 text-center mt-4">
          <p>Powered by Gemini API</p>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
           {renderTool()}
        </div>
      </main>
    </div>
  );
}
