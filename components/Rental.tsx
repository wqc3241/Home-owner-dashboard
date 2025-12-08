import React, { useState } from 'react';
import { Home, Users, ArrowRight } from 'lucide-react';

interface RentalProps {
  mortgagePayment: number;
}

const Rental: React.FC<RentalProps> = ({ mortgagePayment }) => {
  const [monthlyRent, setMonthlyRent] = useState(2800);
  const [managementFeeRate, setManagementFeeRate] = useState(8); // percent
  const [vacancyRate, setVacancyRate] = useState(5); // percent
  const [maintenanceCost, setMaintenanceCost] = useState(150);

  const calculateCashFlow = () => {
    const grossAnnual = monthlyRent * 12;
    const vacancyLoss = grossAnnual * (vacancyRate / 100);
    const managementFee = (grossAnnual - vacancyLoss) * (managementFeeRate / 100);
    const annualMaintenance = maintenanceCost * 12;
    const annualMortgage = mortgagePayment * 12;
    
    // Simple calc: Gross - Vacancy - Mgmt - Maint - Mortgage
    const netOperatingIncome = grossAnnual - vacancyLoss - managementFee - annualMaintenance;
    const cashFlow = netOperatingIncome - annualMortgage; // Assuming mortgage includes taxes/insurance for simplicity here

    return {
        monthlyCashFlow: cashFlow / 12,
        annualCashFlow: cashFlow
    };
  };

  const { monthlyCashFlow } = calculateCashFlow();
  const isPositive = monthlyCashFlow > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Rental Potential Analysis</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
             {/* Hero Result Mobile - Only visible on small screens if needed, but let's hide here and put on right for desktop */}
            
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <h4 className="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2">Calculator Inputs</h4>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Monthly Rent</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                        </div>
                        <input
                            type="number"
                            value={monthlyRent}
                            onChange={(e) => setMonthlyRent(Number(e.target.value))}
                            className="block w-full pl-7 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Market avg: $2,750</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
                        <input
                            type="number"
                            value={vacancyRate}
                            onChange={(e) => setVacancyRate(Number(e.target.value))}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mgmt Fee (%)</label>
                        <input
                            type="number"
                            value={managementFeeRate}
                            onChange={(e) => setManagementFeeRate(Number(e.target.value))}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                        />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Est. Maintenance ($/mo)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                        </div>
                         <input
                            type="number"
                            value={maintenanceCost}
                            onChange={(e) => setMaintenanceCost(Number(e.target.value))}
                            className="block w-full pl-7 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Home size={20} className="text-brand-600" />
                    <h4 className="font-bold text-gray-800 text-lg">Nearby Rentals</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                        <span className="text-gray-600">3bd/2ba Average</span>
                        <span className="font-semibold text-gray-900">$2,750/mo</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                        <span className="text-gray-600">Occupancy Rate</span>
                        <span className="font-semibold text-gray-900">96%</span>
                    </div>
                    <button className="w-full text-brand-600 text-sm font-medium hover:underline text-left flex items-center gap-1">
                        View 5 comparable listings <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
             {/* Result Card */}
            <div className={`rounded-2xl p-8 text-white shadow-xl flex flex-col items-center justify-center text-center h-64 ${isPositive ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' : 'bg-gradient-to-br from-red-500 to-red-700'}`}>
                <p className="opacity-90 text-lg font-medium mb-2">Estimated Monthly Cash Flow</p>
                <h3 className="text-6xl font-bold tracking-tight mb-2">
                    {monthlyCashFlow < 0 ? '-' : '+'}${Math.abs(Math.round(monthlyCashFlow))}
                </h3>
                <p className="opacity-80">
                    After paying ${mortgagePayment} mortgage
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-4">Financial Breakdown</h4>
                <div className="space-y-3 text-sm">
                     <div className="flex justify-between items-center text-gray-600">
                        <span>Gross Rent</span>
                        <span className="font-medium text-gray-900">+${monthlyRent}</span>
                     </div>
                     <div className="flex justify-between items-center text-red-500">
                        <span>Vacancy ({vacancyRate}%)</span>
                        <span className="font-medium">-${Math.round(monthlyRent * (vacancyRate/100))}</span>
                     </div>
                      <div className="flex justify-between items-center text-red-500">
                        <span>Management ({managementFeeRate}%)</span>
                        <span className="font-medium">-${Math.round((monthlyRent * (1 - vacancyRate/100)) * (managementFeeRate/100))}</span>
                     </div>
                      <div className="flex justify-between items-center text-red-500">
                        <span>Maintenance</span>
                        <span className="font-medium">-${maintenanceCost}</span>
                     </div>
                      <div className="flex justify-between items-center text-red-500 pt-2 border-t border-gray-100">
                        <span>Mortgage</span>
                        <span className="font-medium">-${mortgagePayment}</span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Rental;