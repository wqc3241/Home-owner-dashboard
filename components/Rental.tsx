import React, { useState } from 'react';
import { DollarSign, Home, Users } from 'lucide-react';

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
    <div className="space-y-6 pb-24 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Rental Potential</h2>

      {/* Hero Result */}
      <div className={`rounded-2xl p-6 text-white shadow-lg ${isPositive ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' : 'bg-gradient-to-br from-red-500 to-red-700'}`}>
         <p className="opacity-90 text-sm font-medium mb-1">Estimated Monthly Cash Flow</p>
         <h3 className="text-4xl font-bold">
            {monthlyCashFlow < 0 ? '-' : '+'}${Math.abs(Math.round(monthlyCashFlow))}
         </h3>
         <p className="text-xs opacity-75 mt-2">
            Based on current mortgage of ${mortgagePayment}/mo
         </p>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5">
        <h4 className="font-bold text-gray-800">Calculator Inputs</h4>
        
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
                    className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy (%)</label>
                <input
                    type="number"
                    value={vacancyRate}
                    onChange={(e) => setVacancyRate(Number(e.target.value))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mgmt Fee (%)</label>
                <input
                    type="number"
                    value={managementFeeRate}
                    onChange={(e) => setManagementFeeRate(Number(e.target.value))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                />
            </div>
        </div>
      </div>

      {/* Rental Comps Lite */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Home size={18} className="text-brand-600" />
            <h4 className="font-bold text-gray-800">Nearby Rentals</h4>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                <span className="text-gray-600">3bd/2ba Average</span>
                <span className="font-semibold text-gray-900">$2,750/mo</span>
             </div>
             <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                <span className="text-gray-600">Occupancy Rate</span>
                <span className="font-semibold text-gray-900">96%</span>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Rental;