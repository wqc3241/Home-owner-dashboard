import React, { useState } from 'react';
import { RenovationProject } from '../types';
import { Calculator } from 'lucide-react';

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Renovation ROI Calculator</h2>
            <p className="text-gray-500 text-sm">Estimate how projects impact your home value.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Project List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide px-1">Available Projects</h3>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProjectSelect(p)}
              className={`w-full p-4 rounded-xl shadow-sm border text-left transition-all active:scale-[0.98] ${
                  selectedProject?.id === p.id 
                  ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500' 
                  : 'bg-white border-gray-100 hover:border-brand-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                    <h3 className={`font-bold ${selectedProject?.id === p.id ? 'text-brand-800' : 'text-gray-800'}`}>{p.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded shrink-0 ml-2">
                    {p.estimatedRoi}% ROI
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Est: {formatCurrency(p.estimatedCostMin)} - {formatCurrency(p.estimatedCostMax)}
              </div>
            </button>
          ))}
        </div>

        {/* Simulator Area */}
        <div className="lg:col-span-2">
            {!selectedProject ? (
                 <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl h-96 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <Calculator size={48} className="mb-4 opacity-50" />
                    <p className="font-medium text-lg">Select a project to simulate costs</p>
                    <p className="text-sm">Choose from the list on the left to see ROI projections</p>
                 </div>
            ) : (
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8 animate-fade-in">
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded mb-2 inline-block uppercase">{selectedProject.category}</span>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                            </div>
                            <button onClick={() => setSelectedProject(null)} className="lg:hidden text-sm text-brand-600 underline">Close</button>
                        </div>
                        <p className="text-gray-500 mt-2">{selectedProject.description}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-gray-700">Planned Budget</label>
                            <span className="text-xl font-bold text-brand-700">{formatCurrency(budget)}</span>
                        </div>
                        <input
                            type="range"
                            min={selectedProject.estimatedCostMin * 0.8}
                            max={selectedProject.estimatedCostMax * 1.5}
                            step={500}
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600 mb-2"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>{formatCurrency(selectedProject.estimatedCostMin * 0.8)}</span>
                            <span>{formatCurrency(selectedProject.estimatedCostMax * 1.5)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-gray-100 bg-white">
                             <span className="text-gray-500 text-sm block mb-1">Estimated Value Added</span>
                             <span className="text-2xl font-bold text-green-600">+{formatCurrency(calculateROI())}</span>
                        </div>
                         <div className="p-4 rounded-xl border border-gray-100 bg-white">
                             <span className="text-gray-500 text-sm block mb-1">New Home Value</span>
                             <span className="text-2xl font-bold text-gray-900">{formatCurrency(newValue)}</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-xl flex items-start gap-4">
                        <div className="bg-blue-200 text-blue-700 p-2 rounded-full shrink-0">
                            <Calculator size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm">ROI Insight</h4>
                            <p className="text-sm text-blue-800 mt-1">
                                This project typically recovers <strong>{selectedProject.estimatedRoi}%</strong> of its cost in resale value.
                                To maximize ROI, stick to neutral finishes and keep the budget under {formatCurrency(selectedProject.estimatedCostMax)}.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Renovation;