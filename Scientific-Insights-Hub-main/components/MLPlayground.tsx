
import React, { useState, useCallback } from 'react';
import { BrainCircuit, Bot } from 'lucide-react';
import Card from './common/Card';
import Loader from './common/Loader';
import ResultDisplay from './common/ResultDisplay';
import { performLinearRegression } from '../services/geminiService';

const MLPlayground: React.FC = () => {
  const [data, setData] = useState<string>('1,2\n2,4.1\n3,5.9\n4,8.2\n5,9.8');
  const [predictX, setPredictX] = useState<string>('6');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.trim() || !predictX.trim()) return;

    setIsLoading(true);
    setResult('');
    try {
      const apiResult = await performLinearRegression(data, predictX);
      setResult(apiResult);
    } catch (error) {
      setResult('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [data, predictX]);

  return (
    <Card title="ML Playground: Linear Regression" icon={<BrainCircuit size={24} />}>
      <p className="mb-4 text-sm text-slate-400">
        Enter comma-separated X,Y data points (one per line) to train a simple linear regression model. Then, provide an X value to predict.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="data-input" className="block text-sm font-medium text-slate-300 mb-1">
            Training Data (X,Y)
          </label>
          <textarea
            id="data-input"
            value={data}
            onChange={(e) => setData(e.target.value)}
            rows={5}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-mono text-sm"
            placeholder="e.g., 1,2&#10;2,4&#10;3,6"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="predict-input" className="block text-sm font-medium text-slate-300 mb-1">
            Predict Y for X =
          </label>
          <input
            id="predict-input"
            type="number"
            value={predictX}
            onChange={(e) => setPredictX(e.target.value)}
            className="w-full sm:w-1/2 bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="e.g., 6"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !data.trim() || !predictX.trim()}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          <Bot size={16} />
          <span>Train & Predict</span>
        </button>
      </form>

      {isLoading && <Loader />}
      <ResultDisplay content={result} />
    </Card>
  );
};

export default MLPlayground;
