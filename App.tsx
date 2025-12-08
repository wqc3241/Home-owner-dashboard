import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Maintenance from './components/Maintenance';
import Mortgage from './components/Mortgage';
import Renovation from './components/Renovation';
import Rental from './components/Rental';
import Selling from './components/Selling';
import AiAdvisor from './components/AiAdvisor';
import { ViewState, HomeProfile } from './types';

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
  image: "https://picsum.photos/800/600"
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Top Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 px-4 py-3 border-b border-gray-100 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
            <span className="font-bold text-lg tracking-tight text-gray-900">HomeHub</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
             <img src="https://picsum.photos/100" alt="User" />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto p-4 pt-6">
        {renderView()}
      </main>

      {/* Navigation */}
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;