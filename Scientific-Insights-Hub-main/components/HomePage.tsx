
import React from 'react';
import { Calculator, BrainCircuit, Rocket, BarChart2, Zap } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg ring-1 ring-white/10 backdrop-blur-md">
        <div className="flex items-center gap-4 mb-3">
            <div className="text-indigo-400">{icon}</div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-3">
          Scientific Insights Hub
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-300">
          Your AI-powered toolkit for complex scientific computation, machine learning exploration, and data visualization. Select a tool from the sidebar to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard 
            icon={<Calculator size={24} />} 
            title="Symbolic Calculator"
            description="Solve complex equations and perform symbolic mathematics, powered by Gemini's reasoning capabilities."
        />
        <FeatureCard 
            icon={<BrainCircuit size={24} />} 
            title="ML Playground"
            description="Experiment with simple machine learning models like linear regression on your own data."
        />
        <FeatureCard 
            icon={<Rocket size={24} />} 
            title="Astronomy Tools"
            description="Perform astronomical calculations and conversions, from coordinate systems to time formats."
        />
        <FeatureCard 
            icon={<BarChart2 size={24} />} 
            title="Data Visualizer"
            description="Input numerical data to instantly generate insightful charts and get an AI-powered analysis."
        />
      </div>

      <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
          <div className="flex items-center justify-center gap-3 mb-2">
              <Zap size={20} className="text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Powered by the Gemini API</h3>
          </div>
          <p className="text-slate-400">
              This entire platform leverages the advanced reasoning and code interpretation capabilities of Google's Gemini model to simulate complex scientific libraries and deliver powerful results directly in your browser.
          </p>
      </div>
    </div>
  );
};

export default HomePage;
