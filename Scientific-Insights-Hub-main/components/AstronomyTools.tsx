
import React, { useState, useCallback } from 'react';
import { Rocket, Send } from 'lucide-react';
import Card from './common/Card';
import Loader from './common/Loader';
import ResultDisplay from './common/ResultDisplay';
import { answerAstronomyQuestion } from '../services/geminiService';

const AstronomyTools: React.FC = () => {
  const [question, setQuestion] = useState<string>('Convert 2024-01-01T12:00:00 UTC to Julian Date.');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setResult('');
    try {
      const apiResult = await answerAstronomyQuestion(question);
      setResult(apiResult);
    } catch (error) {
      setResult('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [question]);
  
  const exampleQueries = [
    'What are the ICRS coordinates of the star Betelgeuse?',
    'Convert Galactic coordinates (l=120 deg, b=30 deg) to ICRS.',
    'What is the distance between Earth and Mars on July 4, 2025?',
  ];

  return (
    <Card title="Astronomy Tools" icon={<Rocket size={24} />}>
      <p className="mb-4 text-sm text-slate-400">
        Ask an astronomy-related question. The AI will simulate Astropy's capabilities to provide coordinate conversions, time calculations, and more.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your astronomy query..."
            className="flex-grow bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
            <span>Ask</span>
          </button>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-sm text-slate-400 mb-2">Example Queries:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => setQuestion(q)}
              disabled={isLoading}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <Loader />}
      <ResultDisplay content={result} />
    </Card>
  );
};

export default AstronomyTools;
