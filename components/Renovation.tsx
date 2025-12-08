import React, { useState } from 'react';
import { RenovationProject } from '../types';
import { ArrowRight, Calculator, Check } from 'lucide-react';

const projects: RenovationProject[] = [
  { id: '1', name: 'Kitchen Remodel (Mid-Range)', category: 'Interior', estimatedCostMin: 25000, estimatedCostMax: 45000, estimatedRoi: 55, description: 'New cabinets, stone counters, new appliances.' },
  { id: '2', name: 'Bathroom Addition', category: 'Expansion', estimatedCostMin: 50000, estimatedCostMax: 70000, estimatedRoi: 60, description: 'Adding a full 5x8 bathroom.' },
  { id: '3', name: 'Wood Deck Addition', category: 'Exterior', estimatedCostMin: 15000, estimatedCostMax: 22000, estimatedRoi: 70, description: '16x20 pressure treated wood deck.' },
  { id: '4', name: 'Garage Door Replacement', category: 'Exterior', estimatedCostMin: 1500, estimatedCostMax: 2500, estimatedRoi: 95, description: 'New uninsulated steel door.' },
];

interface RenovationProps {
  currentHomeValue: number;
}

const Renovation: React.FC<RenovationProps> = ({ currentHomeValue }) => {
  const [selectedProject, setSelectedProject] = useState<RenovationProject | null>(null);
  const [budget, setBudget] = useState<number>(0);

  const handleProjectSelect = (project: RenovationProject) => {
    setSelectedProject(project);
    setBudget(project.estimatedCostMin);
  };

  const calculateROI = () => {
    if (!selectedProject) return 0;
    const valueAdd = budget * (selectedProject.estimatedRoi / 100);
    return valueAdd;
  };

  const newValue = currentHomeValue + calculateROI();
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-900">Renovation ROI</h2>
      </div>

      {!selectedProject ? (
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">Select a project to estimate costs and value impact.</p>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProjectSelect(p)}
              className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left hover:border-brand-300 transition-all active:scale-[0.98]"
            >
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800">{p.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                    {p.estimatedRoi}% ROI
                </div>
              </div>
              <div className="mt-3 text-sm font-medium text-gray-600">
                Est: {formatCurrency(p.estimatedCostMin)} - {formatCurrency(p.estimatedCostMax)}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button onClick={() => setSelectedProject(null)} className="text-sm text-brand-600 font-medium hover:underline mb-2">
            &larr; Back to projects
          </button>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProject.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{selectedProject.description}</p>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Planned Budget: {formatCurrency(budget)}
                </label>
                <input
                    type="range"
                    min={selectedProject.estimatedCostMin * 0.8}
                    max={selectedProject.estimatedCostMax * 1.5}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Low</span>
                    <span>High</span>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Est. Value Added</span>
                    <span className="font-bold text-green-600">+{formatCurrency(calculateROI())}</span>
                </div>
                 <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-gray-600 text-sm">New Home Value</span>
                    <span className="font-bold text-gray-900">{formatCurrency(newValue)}</span>
                </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
            <Calculator className="text-blue-600 shrink-0 mt-1" size={20} />
            <p className="text-sm text-blue-800">
                This project typically recovers <strong>{selectedProject.estimatedRoi}%</strong> of its cost in resale value.
                To maximize ROI, stick to neutral finishes and keep the budget under {formatCurrency(selectedProject.estimatedCostMax)}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Renovation;