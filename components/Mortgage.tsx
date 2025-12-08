import React from 'react';
import { MortgageDetails } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, Percent, Calendar } from 'lucide-react';

interface MortgageProps {
  homeValue: number;
}

const Mortgage: React.FC<MortgageProps> = ({ homeValue }) => {
  // Mock data
  const mortgage: MortgageDetails = {
    balance: 320000,
    interestRate: 6.5,
    monthlyPayment: 2150,
    lender: "Chase Bank",
    termYears: 30,
    startDate: "2021-05-01"
  };

  const equity = homeValue - mortgage.balance;
  const equityData = [
    { name: 'Equity', value: equity, color: '#10b981' }, // Green
    { name: 'Loan Balance', value: mortgage.balance, color: '#ef4444' }, // Red
  ];

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Mortgage</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign size={18} />
            <span className="text-sm font-medium">Balance</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(mortgage.balance)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Percent size={18} />
            <span className="text-sm font-medium">Rate</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{mortgage.interestRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Calendar size={18} />
            <span className="text-sm font-medium">Monthly</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(mortgage.monthlyPayment)}</p>
          <p className="text-xs text-gray-400">Principal & Interest</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign size={18} />
            <span className="text-sm font-medium">Equity</span>
          </div>
          <p className="text-xl font-bold text-emerald-600">{formatCurrency(equity)}</p>
        </div>
      </div>

      {/* Equity Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
        <h3 className="font-bold text-gray-800 w-full mb-2">Equity Breakdown</h3>
        <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={equityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {equityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-sm text-gray-400 block">Total Value</span>
                <span className="font-bold text-gray-900">{formatCurrency(homeValue)}</span>
            </div>
        </div>
        <div className="flex gap-6 mt-4">
            {equityData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                    <span className="text-sm font-medium text-gray-600">{d.name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Refi Tip */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h4 className="font-bold text-blue-900 mb-2">Refinance Opportunity</h4>
        <p className="text-sm text-blue-800 mb-4">
          Current rates are hovering around 6.8%. You are currently at {mortgage.interestRate}%. 
          It might not be the best time to refinance unless you need to tap into equity.
        </p>
        <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:bg-blue-700 transition-colors">
            Calculate Savings
        </button>
      </div>
    </div>
  );
};

export default Mortgage;