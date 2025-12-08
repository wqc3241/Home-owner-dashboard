export interface HomeProfile {
  address: string;
  currentValue: number;
  purchasePrice: number;
  purchaseDate: string;
  sqft: number;
  beds: number;
  baths: number;
  yearBuilt: number;
  image: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  dueDate: string;
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'Exterior' | 'Appliance';
  isCompleted: boolean;
  estimatedCost: number;
  impact: 'High' | 'Medium' | 'Low';
}

export interface MortgageDetails {
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  lender: string;
  termYears: number;
  startDate: string;
}

export interface RenovationProject {
  id: string;
  name: string;
  category: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  estimatedRoi: number; // Percentage
  description: string;
}

export interface CompHome {
  id: string;
  address: string;
  soldPrice: number;
  soldDate: string;
  sqft: number;
  beds: number;
  baths: number;
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  MAINTENANCE = 'maintenance',
  MORTGAGE = 'mortgage',
  RENOVATION = 'renovation',
  RENTAL = 'rental',
  SELLING = 'selling',
  AI_ADVISOR = 'ai_advisor'
}