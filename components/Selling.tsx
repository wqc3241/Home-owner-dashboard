
import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckSquare, Clock, ArrowRight, User, Star, ShieldCheck, Phone, MessageSquare, Search, Loader2, RefreshCw } from 'lucide-react';

interface Agent {
  name: string;
  title: string;
  company: string;
  rating: number;
  reviews: number;
  experience: string;
  specialty: string;
  avatar: string;
  performance: {
    avgSalePrice: string;
    avgDaysOnMarket: number;
    aboveListPrice: string;
  };
}

const mockAgent: Agent = {
  name: "Sarah Miller",
  title: "Senior Listing Specialist",
  company: "Luxury Realty Group",
  rating: 4.9,
  reviews: 124,
  experience: "12+ Years",
  specialty: "Austin Central & Waterfront",
  avatar: "https://i.pravatar.cc/150?u=sarah",
  performance: {
    avgSalePrice: "$520k",
    avgDaysOnMarket: 14,
    aboveListPrice: "102%",
  }
};

type AgentStatus = 'unassigned' | 'matching' | 'assigned';

const Selling: React.FC = () => {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('unassigned');
  const [showNotification, setShowNotification] = useState(false);

  const steps = [
    { text: 'Declutter and Deep Clean', done: true },
    { text: 'Fix Minor Repairs', done: false },
    { text: 'Professional Photography', done: false },
    { text: 'Staging Consultation', done: false },
    { text: 'Set List Price', done: false },
    { text: 'List on MLS', done: false },
  ];

  const handleStartMatching = () => {
    setAgentStatus('matching');
    setTimeout(() => {
      setAgentStatus('assigned');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 2500);
  };

  const handleResetAgent = () => {
    setAgentStatus('unassigned');
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-bounce-short">
          <ShieldCheck size={24} />
          <div>
            <p className="font-bold">Agent Matched!</p>
            <p className="text-xs opacity-90">Sarah Miller is ready to help you sell.</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Selling Guide & Agent Match</h2>
          <p className="text-gray-500 text-sm mt-1">Get the best price for your home with local experts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Agent Section - Primary Focus */}
        <div className="lg:col-span-2 space-y-6">
          {agentStatus === 'unassigned' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[380px]">
              <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-brand-50/30">
                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-200">
                  <Search size={24} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 leading-tight">
                  Find Your Perfect <br /> <span className="text-brand-600">Selling Agent</span>
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  We analyze local sales data to match you with top-performing agents in Austin who specialize in properties like yours.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <ShieldCheck size={18} className="text-emerald-500" /> Secure & Verified Experts
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <Clock size={18} className="text-blue-500" /> Sell 2x Faster than Market Avg
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 bg-white border-l border-gray-50 flex flex-col items-center justify-center">
                <div className="w-full space-y-4">
                  <button 
                    onClick={handleStartMatching}
                    className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all active:scale-[0.98] shadow-xl shadow-brand-100 flex items-center justify-center gap-3"
                  >
                    Match Me with an Agent <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={handleStartMatching}
                    className="w-full bg-gray-50 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all border border-gray-200 flex items-center justify-center gap-3"
                  >
                    Auto-Assign Top Seller
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-6 text-center">
                  Free service for HomeHub Pro members. <br /> No obligation to list.
                </p>
              </div>
            </div>
          )}

          {agentStatus === 'matching' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center min-h-[380px] text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-200 rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-brand-100 p-8 rounded-full">
                  <Loader2 size={48} className="text-brand-600 animate-spin" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Matching with Local Experts...</h3>
                <p className="text-gray-500 max-w-sm mt-2 mx-auto">
                  Analyzing over 500+ recent sales in the Austin area to find the agent with the highest success rate for your home type.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-12 bg-brand-200 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 animate-progress"></div>
                </div>
              </div>
            </div>
          )}

          {agentStatus === 'assigned' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[380px] flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center border-r border-gray-100">
                <div className="relative">
                  <img src={mockAgent.avatar} alt={mockAgent.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl mb-4" />
                  <div className="absolute bottom-4 right-0 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                    <ShieldCheck size={16} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{mockAgent.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{mockAgent.title}</p>
                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold text-gray-800">{mockAgent.rating}</span>
                  <span className="text-xs text-gray-400 font-normal">({mockAgent.reviews} reviews)</span>
                </div>
                <div className="mt-6 flex flex-col gap-2 w-full">
                  <button className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 hover:bg-brand-700 transition-all">
                    <MessageSquare size={16} /> Secure Chat
                  </button>
                  <button className="w-full bg-white text-gray-700 py-3 rounded-xl font-bold text-sm border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                    <Phone size={16} /> Call Now
                  </button>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1 block">Verified Expert</span>
                    <h4 className="text-2xl font-bold text-gray-900">{mockAgent.company}</h4>
                  </div>
                  <button onClick={handleResetAgent} className="text-gray-400 hover:text-brand-600 transition-colors">
                    <RefreshCw size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Experience</p>
                    <p className="font-bold text-gray-800">{mockAgent.experience}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Specialty</p>
                    <p className="font-bold text-gray-800 truncate">{mockAgent.specialty}</p>
                  </div>
                </div>

                <h5 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Performance Metrics</h5>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Avg. Sale Price in Zip</span>
                    <span className="font-bold text-gray-900">{mockAgent.performance.avgSalePrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Avg. Days on Market</span>
                    <span className="font-bold text-emerald-600">{mockAgent.performance.avgDaysOnMarket} Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Final Sale vs List</span>
                    <span className="font-bold text-brand-600">{mockAgent.performance.aboveListPrice}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">Next Step: Schedule a free in-home consultation.</p>
                  <button className="text-brand-600 font-bold text-sm hover:underline flex items-center gap-1">
                    Book Meeting <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Market Timing Meter */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center text-lg">
                <Clock size={20} className="mr-2 text-brand-600" /> Market Timing
            </h3>
            <p className="text-sm text-gray-500 mb-8">Analysis based on recent inventory levels and price trends in your zip code.</p>
            
            <div className="relative pt-6 pb-2 px-4">
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-bold text-red-500 w-8">Wait</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative shadow-inner">
                        <div className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 w-full"></div>
                         <div className="absolute top-0 bottom-0 w-1.5 bg-gray-800 border border-white rounded-sm shadow-md transition-all duration-1000" style={{ left: '65%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-green-500 w-8 text-right">Sell</span>
                </div>
            </div>
            
            <div className="text-center mt-4">
                <p className="font-bold text-yellow-600 text-xl">Neutral Market</p>
                <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto leading-relaxed">
                    Inventory is stable. Prices are flat year-over-year. It's a fair time to sell if your home is in good condition.
                </p>
            </div>
          </div>
        </div>

        {/* Sidebar Tasks / Checklist */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <h3 className="font-bold text-xl mb-3">Sell Faster & Secure</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Matched agents are vetted for:
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-brand-400 rounded-full"></div> Professional Photography
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-brand-400 rounded-full"></div> Premium MLS Listing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-brand-400 rounded-full"></div> Legal Contract Support
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center text-lg">
                <CheckSquare size={20} className="mr-2 text-brand-600" /> Pre-Sale Checklist
            </h3>
            <div className="space-y-4">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-50 group">
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${step.done ? 'bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-200' : 'border-gray-300 bg-white group-hover:border-brand-400'}`}>
                            {step.done && <ShieldCheck size={14} className="text-white" />}
                        </div>
                        <span className={`text-sm font-medium ${step.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{step.text}</span>
                    </div>
                ))}
            </div>
            <button className="mt-8 w-full py-3 bg-gray-50 rounded-xl text-brand-600 font-bold text-sm hover:bg-brand-100 transition-colors">
                Download Full Selling Guide
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.5s infinite ease-in-out;
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-short {
          animation: bounce-short 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Selling;
