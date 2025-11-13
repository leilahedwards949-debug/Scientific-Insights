
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { BarChart2, Lightbulb, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image';
import Card from './common/Card';
import Loader from './common/Loader';
import { VisualizationDataPoint } from '../types';
import { analyzeDataset } from '../services/geminiService';
import ResultDisplay from './common/ResultDisplay';


const DataVisualizer: React.FC = () => {
  const [rawData, setRawData] = useState<string>('12, 23, 15, 8, 20, 17');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement>(null);


  const data: VisualizationDataPoint[] = useMemo(() => {
    return rawData
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '' && !isNaN(Number(s)))
      .map((val, index) => ({
        name: `P${index + 1}`,
        value: Number(val),
      }));
  }, [rawData]);

  const handleAnalysis = useCallback(async () => {
    if (!rawData.trim()) return;

    setIsLoading(true);
    setAnalysis('');
    try {
      const apiResult = await analyzeDataset(rawData);
      setAnalysis(apiResult);
    } catch (error) {
      setAnalysis('An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, [rawData]);
  
  const handleDownload = useCallback(() => {
    if (chartRef.current === null) {
      return;
    }

    toPng(chartRef.current, { cacheBust: true, backgroundColor: '#1e293b' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'scientific-hub-chart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download chart', err);
      });
  }, []);

  return (
    <Card title="Data Visualizer" icon={<BarChart2 size={24} />}>
      <p className="mb-4 text-sm text-slate-400">
        Enter a comma-separated list of numbers to generate a bar chart. You can also get an AI-powered analysis of your dataset.
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="data-input-viz" className="block text-sm font-medium text-slate-300 mb-1">
            Numerical Data
          </label>
          <textarea
            id="data-input-viz"
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-mono text-sm"
            placeholder="e.g., 5, 8, 2, 10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
            <button
                onClick={handleAnalysis}
                disabled={isLoading || !rawData.trim()}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
                <Lightbulb size={16} />
                <span>Analyze Data</span>
            </button>
            <button
                onClick={handleDownload}
                disabled={data.length === 0}
                className="flex items-center justify-center gap-2 bg-slate-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-slate-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
            >
                <Download size={16} />
                <span>Download Chart</span>
            </button>
        </div>

        <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700 min-h-[300px]" ref={chartRef}>
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Chart</h3>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#e2e8f0',
                  }}
                />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                <Bar dataKey="value" fill="#818cf8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-500">
              Enter valid data to see the chart.
            </div>
          )}
        </div>
        
        {isLoading && <Loader />}
        <ResultDisplay content={analysis} />
      </div>
    </Card>
  );
};

export default DataVisualizer;
