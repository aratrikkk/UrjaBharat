
import React, { useState } from 'react';
import { Recommendation } from '../types';
import { getAIExplanation } from '../services/geminiService';
import { ChevronDown, ChevronUp, Zap, Sparkles } from 'lucide-react';

interface RecommendationCardProps {
  recomm: Recommendation;
  onExecute: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recomm, onExecute }) => {
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleExplain = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (explanation) {
        setExplanation(null);
        return;
    }
    setLoadingExplanation(true);
    const context = "Operating 3 units at Bharat Energy Dynamics Plant A-4. PSU Standard Energy Audit in progress.";
    const result = await getAIExplanation(recomm.description, context);
    setExplanation(result || "Error fetching explanation.");
    setLoadingExplanation(false);
  };

  const urgencyBorders = {
    high: 'border-l-orange-500 bg-orange-50/20',
    medium: 'border-l-blue-500 bg-blue-50/20',
    low: 'border-l-gray-400 bg-gray-50/20'
  };

  return (
    <div className={`border-l-4 rounded border border-gray-100 p-4 mb-3 transition-all ${urgencyBorders[recomm.urgency]}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-gray-800 leading-tight">{recomm.title}</h4>
        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border ${recomm.urgency === 'high' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          {recomm.urgency} Priority
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3 leading-snug">{recomm.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
           <div className="flex flex-col">
              <span className="text-[8px] text-gray-400 uppercase font-bold">Benefit</span>
              <span className="text-[10px] font-bold text-green-700">{recomm.impact}</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[8px] text-gray-400 uppercase font-bold">Savings (Est)</span>
              <span className="text-[10px] font-bold text-blue-700">₹{recomm.estimatedSavings}</span>
           </div>
        </div>
        <button 
          onClick={handleExplain}
          className="flex items-center gap-1 text-[9px] font-bold text-[#003366] uppercase tracking-wider hover:underline"
          disabled={loadingExplanation}
        >
          {loadingExplanation ? 'Consulting AI...' : explanation ? <><ChevronUp size={12}/> Hide Insight</> : <><Sparkles size={12}/> AI Insight</>}
        </button>
      </div>

      {explanation && (
        <div className="mb-4 p-3 bg-white border border-blue-100 rounded text-xs text-gray-600 italic leading-relaxed animate-in fade-in slide-in-from-top-1">
          <p className="not-italic font-bold text-[#003366] text-[10px] uppercase mb-1 flex items-center gap-1">
             <Zap size={10}/> Technical Justification
          </p>
          {explanation}
        </div>
      )}

      <button 
        onClick={() => onExecute(recomm.id)}
        className="w-full py-1.5 bg-[#003366] text-white text-[10px] font-bold rounded hover:bg-blue-900 transition-colors uppercase tracking-widest"
      >
        Authorize Execution
      </button>
    </div>
  );
};

export default RecommendationCard;
