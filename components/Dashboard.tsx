import React from 'react';
import { HomeProfile, CompHome } from '../types';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { ArrowUpRight, MapPin, TrendingUp } from 'lucide-react';

interface DashboardProps {
  home: HomeProfile;
}

const mockValueHistory = [
  { month: 'Jan', value: 420000 },
  { month: 'Mar', value: 425000 },
  { month: 'May', value: 428000 },
  { month: 'Jul', value: 440000 },
  { month: 'Sep', value: 445000 },
  { month: 'Nov', value: 452000 },
];

const mockComps: CompHome[] = [
  { id: '1', address: '124 Maple Ave', soldPrice: 465000, soldDate: '2 weeks ago', sqft: 2100, beds: 4, baths: 3 },
  { id: '2', address: '118 Oak St', soldPrice: 440000, soldDate: '1 month ago', sqft: 1950, beds: 3, baths: 2 },
  { id: '3', address: '205 Pine Ln', soldPrice: 455000, soldDate: '2 months ago', sqft: 2050, beds: 3, baths: 2.5 },
];

const Dashboard: React.FC<DashboardProps> = ({ home }) => {
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6 animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-6 md:space-y-0">
      {/* Hero Card - Full width on mobile, 2/3 on desktop */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="h-48 md:h-64 w-full bg-gray-200 relative">
          <img src={home.image} alt="Home" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold">{home.address}</h1>
            <div className="flex text-white/90 text-sm md:text-base gap-3 mt-1">
              <span>{home.beds} Beds</span>
              <span>•</span>
              <span>{home.baths} Baths</span>
              <span>•</span>
              <span>{home.sqft.toLocaleString()} Sqft</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Estimated Value</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-1">{formatCurrency(home.currentValue)}</h2>
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm md:text-base font-semibold flex items-center mb-2 shadow-sm border border-green-100">
              <ArrowUpRight size={18} className="mr-1" />
              4.2% (1Y)
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div className="bg-brand-500 h-3 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-3 flex justify-between font-medium">
             <span>Low: {formatCurrency(home.currentValue * 0.95)}</span>
             <span>High: {formatCurrency(home.currentValue * 1.05)}</span>
          </p>
        </div>
      </div>

      {/* Value Drivers - Right column top */}
      <div className="md:col-span-1 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
          <TrendingUp size={20} className="mr-2 text-brand-600" /> Value Drivers
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {[
              { label: 'Market Demand', val: 'High', color: 'text-green-600 bg-green-50 border-green-100' },
              { label: 'Condition', val: 'Good', color: 'text-blue-600 bg-blue-50 border-blue-100' },
              { label: 'School District', val: 'Top 10%', color: 'text-purple-600 bg-purple-50 border-purple-100' },
              { label: 'Renovations', val: 'Recent', color: 'text-orange-600 bg-orange-50 border-orange-100' },
            ].map((driver) => (
              <div key={driver.label} className="p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between transition-shadow hover:shadow-md bg-white">
                <span className="text-sm text-gray-500 mb-1 md:mb-0">{driver.label}</span>
                <span className={`text-sm font-bold ${driver.color} border px-3 py-1 rounded-full w-fit`}>{driver.val}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Value History Chart - Left bottom */}
      <div className="md:col-span-2 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 text-lg">Value Trend</h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">Last 12 Months</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockValueHistory}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Value']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
              />
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparable Homes - Right bottom */}
      <div className="md:col-span-1 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
         <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
          <MapPin size={20} className="mr-2 text-brand-600" /> Neighborhood Comps
        </h3>
        <div className="space-y-4">
          {mockComps.map((comp) => (
            <div key={comp.id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-3 last:pb-0 hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors cursor-pointer">
              <div>
                <p className="font-semibold text-sm text-gray-800">{comp.address}</p>
                <p className="text-xs text-gray-500 mt-0.5">{comp.sqft} sqft • {comp.beds}bd/{comp.baths}ba</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-brand-700">{formatCurrency(comp.soldPrice)}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Sold {comp.soldDate}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-xs font-semibold text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
            View All Sales
        </button>
      </div>
    </div>
  );
};

export default Dashboard;