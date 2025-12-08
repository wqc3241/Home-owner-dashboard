import React from 'react';
import { TrendingUp, CheckSquare, Clock, ArrowRight } from 'lucide-react';

const Selling: React.FC = () => {
  const steps = [
    { text: 'Declutter and Deep Clean', done: true },
    { text: 'Fix Minor Repairs', done: false },
    { text: 'Professional Photography', done: false },
    { text: 'Staging Consultation', done: false },
    { text: 'Set List Price', done: false },
    { text: 'List on MLS', done: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Selling Guide</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Market Timing Meter - Spans 2 cols on Large */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center text-lg">
                <Clock size={20} className="mr-2 text-brand-600" /> Market Timing
            </h3>
            <p className="text-sm text-gray-500 mb-8">Analysis based on recent inventory levels and price trends in your zip code.</p>
            
            <div className="relative pt-6 pb-2 px-4">
                 {/* Meter Bar */}
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-bold text-red-500 w-8">Wait</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative shadow-inner">
                        <div className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 w-full"></div>
                         {/* Needle */}
                         <div className="absolute top-0 bottom-0 w-1.5 bg-gray-800 border border-white rounded-sm shadow-md transition-all duration-1000" style={{ left: '65%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-green-500 w-8 text-right">Sell</span>
                </div>
            </div>
            
            <div className="text-center mt-4">
                <p className="font-bold text-yellow-600 text-xl">Neutral Market</p>
                <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
                    Inventory is stable. Prices are flat year-over-year. It's a fair time to sell if your home is in good condition.
                </p>
            </div>
        </div>

        {/* Agent Card */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white flex flex-col justify-between text-center md:text-left shadow-xl">
            <div>
                <h3 className="font-bold text-xl mb-3">Need an Expert Valuation?</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    Algorithms are great, but a local expert can see what data misses. Get a verified CMA report from a top local agent.
                </p>
            </div>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors w-full flex items-center justify-center gap-2">
                Find an Agent <ArrowRight size={16} />
            </button>
        </div>

        {/* Selling Checklist - Spans 2 cols on Large to balance layout or just full width bottom */}
        <div className="md:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center text-lg">
                <CheckSquare size={20} className="mr-2 text-brand-600" /> Pre-Sale Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                        <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${step.done ? 'bg-brand-500 border-brand-500' : 'border-gray-300 bg-white'}`}>
                            {step.done && <TrendingUp size={14} className="text-white" />}
                        </div>
                        <span className={`text-base font-medium ${step.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{step.text}</span>
                    </div>
                ))}
            </div>
            <button className="mt-6 text-brand-600 font-semibold text-sm hover:underline">
                View Full Guide
            </button>
        </div>
      </div>
    </div>
  );
};

export default Selling;