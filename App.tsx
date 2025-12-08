import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Maintenance from './components/Maintenance';
import Mortgage from './components/Mortgage';
import Renovation from './components/Renovation';
import Rental from './components/Rental';
import Selling from './components/Selling';
import AiAdvisor from './components/AiAdvisor';
import { ViewState, HomeProfile } from './types';
import { Menu, Bell } from 'lucide-react';

// Mock User Data
const myHome: HomeProfile = {
  address: "123 Arbor Lane, Austin TX",
  currentValue: 452000,
  purchasePrice: 380000,
  purchaseDate: "2021-05-01",
  sqft: 2250,
  beds: 3,
  baths: 2.5,
  yearBuilt: 2005,
  image: "https://picsum.photos/id/15/1200/800"
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard home={myHome} />;
      case ViewState.MAINTENANCE:
        return <Maintenance />;
      case ViewState.MORTGAGE:
        return <Mortgage homeValue={myHome.currentValue} />;
      case ViewState.RENOVATION:
        return <Renovation currentHomeValue={myHome.currentValue} />;
      case ViewState.RENTAL:
        return <Rental mortgagePayment={2150} />;
      case ViewState.SELLING:
        return <Selling />;
      case ViewState.AI_ADVISOR:
        return <AiAdvisor home={myHome} />;
      default:
        return <Dashboard home={myHome} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Desktop Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        className="hidden md:flex" 
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 px-4 py-3 border-b border-gray-100 flex justify-between items-center shadow-sm md:hidden">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
              <span className="font-bold text-lg tracking-tight text-gray-900">HomeHub</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
               <img src="https://picsum.photos/100" alt="User" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
          <h1 className="text-xl font-bold text-gray-800 capitalize">
            {currentView.replace(/_/g, ' ')}
          </h1>
          <div className="flex items-center gap-4">
             <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             <div className="h-8 w-px bg-gray-200 mx-1"></div>
             <div className="flex items-center gap-2">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900 leading-none">Qichao Wang</p>
                  <p className="text-xs text-gray-500 leading-none mt-1">Austin, TX</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-100 shadow-sm cursor-pointer">
                  <img src="https://picsum.photos/100" alt="User" />
                </div>
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {renderView()}
          </div>
        </main>

        {/* Mobile Navigation */}
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
      </div>
    </div>
  );
};

export default App;