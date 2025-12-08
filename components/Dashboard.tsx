import React from 'react';
import { HomeProfile, CompHome } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, MapPin, TrendingUp, Info } from 'lucide-react';

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
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Hero Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 w-full bg-gray-200 relative">
          <img src={home.image} alt="Home" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h1 className="text-white text-xl font-bold">{home.address}</h1>
            <div className="flex text-white/90 text-sm gap-3">
              <span>{home.beds} Beds</span>
              <span>•</span>
              <span>{home.baths} Baths</span>
              <span>•</span>
              <span>{home.sqft.toLocaleString()} Sqft</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-gray-500 font-medium">Estimated Value</p>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{formatCurrency(home.currentValue)}</h2>
            </div>
            <div className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-semibold flex items-center mb-1">
              <ArrowUpRight size={16} className="mr-1" />
              4.2% (1Y)
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-brand-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex justify-between">
             <span>Low: {formatCurrency(home.currentValue * 0.95)}</span>
             <span>High: {formatCurrency(home.currentValue * 1.05)}</span>
          </p>
        </div>
      </div>

      {/* Value History Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Value Trend</h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Last 12 Mos</span>
        </div>
        <div className="h-48 w-full">
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
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Value Drivers */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <TrendingUp size={18} className="mr-2 text-brand-600" /> Value Drivers
        </h3>
        <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Market Demand', val: 'High', color: 'text-green-600 bg-green-50' },
              { label: 'Condition', val: 'Good', color: 'text-blue-600 bg-blue-50' },
              { label: 'School District', val: 'Top 10%', color: 'text-purple-600 bg-purple-50' },
              { label: 'Renovations', val: 'Recent', color: 'text-orange-600 bg-orange-50' },
            ].map((driver) => (
              <div key={driver.label} className="p-3 rounded-xl border border-gray-100 flex flex-col">
                <span className="text-xs text-gray-500 mb-1">{driver.label}</span>
                <span className={`text-sm font-bold ${driver.color} w-fit px-2 py-0.5 rounded`}>{driver.val}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Comparable Homes */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
         <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <MapPin size={18} className="mr-2 text-brand-600" /> Neighborhood Comps
        </h3>
        <div className="space-y-4">
          {mockComps.map((comp) => (
            <div key={comp.id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-3 last:pb-0">
              <div>
                <p className="font-semibold text-sm text-gray-800">{comp.address}</p>
                <p className="text-xs text-gray-500">{comp.sqft} sqft • {comp.beds}bd/{comp.baths}ba</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-brand-700">{formatCurrency(comp.soldPrice)}</p>
                <p className="text-[10px] text-gray-400">Sold {comp.soldDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;