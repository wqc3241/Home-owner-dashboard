import React from 'react';
import { MortgageDetails } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, Percent, Calendar, TrendingDown } from 'lucide-react';

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mortgage Tracker</h2>
        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
            {mortgage.lender}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-200 transition-colors">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign size={18} />
            <span className="text-sm font-medium">Balance</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mortgage.balance)}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-200 transition-colors">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Percent size={18} />
            <span className="text-sm font-medium">Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mortgage.interestRate}%</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-200 transition-colors">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Calendar size={18} />
            <span className="text-sm font-medium">Monthly</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mortgage.monthlyPayment)}</p>
          <p className="text-xs text-gray-400 mt-1">P&I Only</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-200 transition-colors">
           <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign size={18} />
            <span className="text-sm font-medium">Equity</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(equity)}</p>
          <p className="text-xs text-emerald-600/70 mt-1">Available to tap</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Equity Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <h3 className="font-bold text-gray-800 w-full mb-4">Equity Breakdown</h3>
            <div className="flex items-center justify-center gap-8 w-full">
                <div className="h-64 w-64 relative">
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
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <span className="text-xs text-gray-400 block">Total Value</span>
                        <span className="font-bold text-gray-900 text-lg">{formatCurrency(homeValue)}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {equityData.map((d) => (
                        <div key={d.name} className="flex items-start gap-2">
                            <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: d.color }}></div>
                            <div>
                                <span className="text-sm text-gray-500 block">{d.name}</span>
                                <span className="text-lg font-bold text-gray-900">{formatCurrency(d.value)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Amortization / Refi Column */}
        <div className="space-y-6">
             {/* Refi Tip */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white p-3 rounded-xl shadow-md">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900 mb-1 text-lg">Refinance Analysis</h4>
                        <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Current market rates are approx <strong>6.8%</strong>. Your rate is <strong>{mortgage.interestRate}%</strong>. 
                        Refinancing now may increase your payments unless you are removing PMI or cashing out equity.
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-sm hover:bg-blue-700 transition-colors w-full md:w-auto">
                            Simulate Scenarios
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Loan Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500 text-sm">Origination Date</span>
                        <span className="text-gray-900 font-medium text-sm">{mortgage.startDate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500 text-sm">Loan Term</span>
                        <span className="text-gray-900 font-medium text-sm">{mortgage.termYears} Years</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500 text-sm">Payment Frequency</span>
                        <span className="text-gray-900 font-medium text-sm">Monthly</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Mortgage;