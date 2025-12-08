import React, { useState } from 'react';
import { MaintenanceTask } from '../types';
import { CheckCircle2, Circle, AlertCircle, Calendar, Plus } from 'lucide-react';

const initialTasks: MaintenanceTask[] = [
  { id: '1', title: 'Replace HVAC Filter', dueDate: '2023-10-25', category: 'HVAC', isCompleted: false, estimatedCost: 20, impact: 'High' },
  { id: '2', title: 'Clean Gutters', dueDate: '2023-11-01', category: 'Exterior', isCompleted: false, estimatedCost: 150, impact: 'High' },
  { id: '3', title: 'Test Smoke Detectors', dueDate: '2023-10-20', category: 'Electrical', isCompleted: true, estimatedCost: 0, impact: 'High' },
  { id: '4', title: 'Inspect Roof', dueDate: '2023-11-15', category: 'Exterior', isCompleted: false, estimatedCost: 0, impact: 'Medium' },
  { id: '5', title: 'Flush Water Heater', dueDate: '2023-12-01', category: 'Plumbing', isCompleted: false, estimatedCost: 0, impact: 'Medium' },
];

const Maintenance: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.isCompleted;
    if (filter === 'completed') return t.isCompleted;
    return true;
  });

  const getPriorityColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Maintenance</h2>
        <button className="bg-brand-600 text-white p-2 rounded-full shadow-lg hover:bg-brand-700 active:scale-95 transition-all">
          <Plus size={24} />
        </button>
      </div>

      {/* Health Score Card */}
      <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg opacity-90">Home Health Score</h3>
            <p className="text-sm opacity-75">Based on completed tasks</p>
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
             <AlertCircle size={24} className="text-white" />
          </div>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold">{Math.round(progress)}%</span>
          <span className="text-sm opacity-80 mb-1.5">Optimized</span>
        </div>
        <div className="w-full bg-black/20 rounded-full h-2">
          <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex p-1 bg-gray-100 rounded-xl">
        {(['all', 'pending', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
              filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <button onClick={() => toggleTask(task.id)} className="text-gray-300 hover:text-brand-500 transition-colors">
                {task.isCompleted ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              <div>
                <h4 className={`font-semibold text-gray-800 ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${getPriorityColor(task.impact)}`}>
                    {task.impact} Impact
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Calendar size={12} className="mr-1" /> {task.dueDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
                <span className="text-xs font-semibold text-gray-500 block">{task.category}</span>
                {task.estimatedCost > 0 && (
                    <span className="text-xs text-gray-400 block">${task.estimatedCost} est.</span>
                )}
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;