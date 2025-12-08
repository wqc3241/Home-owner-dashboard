import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Hammer, Banknote, PaintBucket, TrendingUp, DollarSign, Bot } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, className = '' }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Home' },
    { id: ViewState.MAINTENANCE, icon: Hammer, label: 'Tasks' },
    { id: ViewState.MORTGAGE, icon: Banknote, label: 'Mortgage' },
    { id: ViewState.RENOVATION, icon: PaintBucket, label: 'Reno' },
    { id: ViewState.RENTAL, icon: DollarSign, label: 'Rent' },
    { id: ViewState.SELLING, icon: TrendingUp, label: 'Sell' },
    { id: ViewState.AI_ADVISOR, icon: Bot, label: 'Advisor' },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-area shadow-lg z-50 md:hidden ${className}`}>
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;