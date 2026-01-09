
import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Hammer, Banknote, PaintBucket, TrendingUp, DollarSign, Bot, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, className = '' }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Home Dashboard' },
    { id: ViewState.MAINTENANCE, icon: Hammer, label: 'Maintenance Tasks' },
    { id: ViewState.MORTGAGE, icon: Banknote, label: 'Mortgage Tracker' },
    { id: ViewState.RENOVATION, icon: PaintBucket, label: 'Renovation ROI' },
    { id: ViewState.RENTAL, icon: DollarSign, label: 'Rental Potential' },
    { id: ViewState.SELLING, icon: TrendingUp, label: 'Selling Guide' },
    { id: ViewState.AI_ADVISOR, icon: Bot, label: 'AI Advisor' },
  ];

  // Using the same consistent avatar for the user
  const userAvatar = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=AceDay&backgroundColor=b6e3f4";

  return (
    <div className={`w-64 bg-white border-r border-gray-200 h-screen flex-col flex-shrink-0 sticky top-0 ${className}`}>
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3 shadow-sm">H</div>
        <span className="font-bold text-xl tracking-tight text-gray-900">HomeHub</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-brand-50 text-brand-700 font-semibold shadow-sm ring-1 ring-brand-200' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon 
                size={20} 
                className={`mr-3 transition-colors ${isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Profile / Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shadow-inner border border-gray-100 group-hover:border-brand-200 transition-colors">
                <img src={userAvatar} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Qichao Wang</p>
                <p className="text-xs text-gray-500 truncate">Pro Member</p>
            </div>
            <LogOut size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
