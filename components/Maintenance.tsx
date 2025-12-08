import React, { useState } from 'react';
import { MaintenanceTask } from '../types';
import { CheckCircle2, Circle, AlertCircle, Calendar, Plus, Wrench } from 'lucide-react';

const initialTasks: MaintenanceTask[] = [
  { id: '1', title: 'Replace HVAC Filter', dueDate: '2023-10-25', category: 'HVAC', isCompleted: false, estimatedCost: 20, impact: 'High' },
  { id: '2', title: 'Clean Gutters', dueDate: '2023-11-01', category: 'Exterior', isCompleted: false, estimatedCost: 150, impact: 'High' },
  { id: '3', title: 'Test Smoke Detectors', dueDate: '2023-10-20', category: 'Electrical', isCompleted: true, estimatedCost: 0, impact: 'High' },
  { id: '4', title: 'Inspect Roof', dueDate: '2023-11-15', category: 'Exterior', isCompleted: false, estimatedCost: 0, impact: 'Medium' },
  { id: '5', title: 'Flush Water Heater', dueDate: '2023-12-01', category: 'Plumbing', isCompleted: false, estimatedCost: 0, impact: 'Medium' },
  { id: '6', title: 'Service Lawn Mower', dueDate: '2023-10-30', category: 'Exterior', isCompleted: false, estimatedCost: 45, impact: 'Low' },
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
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-2 md:mb-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-900 hidden md:block">Maintenance Tracker</h2>
            <p className="text-gray-500 hidden md:block">Keep your home value high with regular upkeep.</p>
        </div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-2 font-medium">
          <Plus size={20} />
          <span className="hidden md:inline">Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Score Card */}
        <div className="md:col-span-1 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
            <div>
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
                <span className="text-5xl font-bold">{Math.round(progress)}%</span>
                <span className="text-sm opacity-80 mb-2">Optimized</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 opacity-80 text-sm">
                    <Wrench size={16} />
                    <span>{tasks.length - completedCount} tasks pending</span>
                </div>
            </div>
        </div>

        {/* Tasks Section */}
        <div className="md:col-span-2 space-y-4">
             {/* Filters */}
            <div className="flex p-1 bg-white border border-gray-200 rounded-xl w-full md:w-fit">
                {(['all', 'pending', 'completed'] as const).map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 md:flex-none px-6 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                    filter === f ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {f}
                </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-3">
                {filteredTasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-brand-300 transition-colors">
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
                        <div className="flex items-center gap-3 mt-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getPriorityColor(task.impact)}`}>
                            {task.impact}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center">
                            <Calendar size={12} className="mr-1" /> {task.dueDate}
                        </span>
                        </div>
                    </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold text-gray-500 block bg-gray-50 px-2 py-1 rounded">{task.category}</span>
                        {task.estimatedCost > 0 && (
                            <span className="text-xs text-gray-400 block mt-1">${task.estimatedCost} est.</span>
                        )}
                    </div>
                </div>
                ))}
                {filteredTasks.length === 0 && (
                <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                    <p>No tasks found.</p>
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;