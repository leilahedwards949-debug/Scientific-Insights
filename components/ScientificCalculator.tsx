
import React, { useState, useCallback } from 'react';
import { Calculator, Send } from 'lucide-react';
import Card from './common/Card';
import Loader from './common/Loader';
import ResultDisplay from './common/ResultDisplay';
import { solveSymbolicMath } from '../services/geminiService';

const ScientificCalculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('solve(x**2 - 4)');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expression.trim()) return;

    setIsLoading(true);
    setResult('');
    try {
      const apiResult = await solveSymbolicMath(expression);
      setResult(apiResult);
    } catch (error) {
      setResult('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [expression]);

  return (
    <Card title="Symbolic Calculator" icon={<Calculator size={24} />}>
      <p className="mb-4 text-sm text-slate-400">
        Enter a mathematical expression or equation to solve. This tool uses AI to simulate the functionality of a symbolic math library like SymPy.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g., expand((x + y)**2)"
            className="flex-grow bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !expression.trim()}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
            <span>Solve</span>
          </button>
        </div>
      </form>

      {isLoading && <Loader />}
      <ResultDisplay content={result} />
    </Card>
  );
};

export default ScientificCalculator;
