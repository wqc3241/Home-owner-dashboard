import React from 'react';
import { TrendingUp, CheckSquare, Clock } from 'lucide-react';

const Selling: React.FC = () => {
  const steps = [
    { text: 'Declutter and Deep Clean', done: true },
    { text: 'Fix Minor Repairs', done: false },
    { text: 'Professional Photography', done: false },
    { text: 'Staging Consultation', done: false },
  ];

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Selling Guide</h2>

      {/* Market Timing Meter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center">
            <Clock size={18} className="mr-2 text-brand-600" /> Market Timing
        </h3>
        <p className="text-sm text-gray-500 mb-4">Should you sell right now?</p>
        
        <div className="flex items-center gap-4 mb-2">
            <span className="text-xs font-bold text-red-500">Wait</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 w-full relative">
                     <div className="absolute top-0 bottom-0 w-1 bg-black border-white border-2 rounded-full" style={{ left: '65%' }}></div>
                </div>
            </div>
            <span className="text-xs font-bold text-green-500">Sell</span>
        </div>
        <p className="text-center font-bold text-yellow-600">Neutral Market</p>
        <p className="text-xs text-center text-gray-400 mt-1">
            Inventory is stable. Prices are flat year-over-year.
        </p>
      </div>

      {/* Selling Checklist */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <CheckSquare size={18} className="mr-2 text-brand-600" /> Pre-Sale Checklist
        </h3>
        <div className="space-y-3">
            {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${step.done ? 'bg-brand-500 border-brand-500' : 'border-gray-300'}`}>
                        {step.done && <TrendingUp size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm ${step.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{step.text}</span>
                </div>
            ))}
        </div>
      </div>
      
      {/* Agent Card */}
      <div className="bg-gray-900 rounded-2xl p-6 text-white text-center">
        <h3 className="font-bold text-lg mb-2">Need an Expert Valuation?</h3>
        <p className="text-sm text-gray-300 mb-4">Get a verified CMA report from a top local agent.</p>
        <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
            Find an Agent
        </button>
      </div>
    </div>
  );
};

export default Selling;