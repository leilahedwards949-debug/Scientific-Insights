
import React from 'react';
import { marked } from 'marked';

interface ResultDisplayProps {
  content: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content }) => {
  if (!content) return null;

  const parsedContent = marked.parse(content);

  return (
    <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-indigo-400 mb-2">Result</h3>
      <div 
        className="prose prose-invert prose-sm max-w-none text-slate-300
                   prose-headings:text-slate-100 prose-strong:text-slate-100
                   prose-code:bg-slate-800 prose-code:p-1 prose-code:rounded
                   prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    </div>
  );
};

export default ResultDisplay;
