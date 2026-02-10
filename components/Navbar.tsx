import React from 'react';
import { ViewState } from '../types';
import { Search, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/40 border-b border-white/5">
      <div 
        className="flex items-center gap-12 cursor-pointer" 
        onClick={() => onNavigate(ViewState.HOME)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <span className="relative top-[1px]">C</span>
          </div>
          <span className="font-bold text-xl tracking-wide text-white">Carcian</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate(ViewState.NEW_CARS); }}
            className={`hover:text-white transition-colors ${currentView === ViewState.NEW_CARS ? 'text-blue-500' : ''}`}
          >
            New Cars
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate(ViewState.USED_CARS); }}
            className={`hover:text-white transition-colors ${currentView === ViewState.USED_CARS ? 'text-blue-500' : ''}`}
          >
            Used Market
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate(ViewState.RENTALS); }}
            className={`hover:text-white transition-colors ${currentView === ViewState.RENTALS ? 'text-blue-500' : ''}`}
          >
            Rentals
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <button className="flex items-center gap-1 hover:text-white text-gray-400">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <span className="h-4 w-px bg-gray-700"></span>
            <button className="flex items-center gap-1 hover:text-white text-gray-400">
              <span>BDT</span>
            </button>
        </div>
        <button 
          onClick={() => onNavigate(ViewState.ADMIN_DASHBOARD)}
          className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
        >
          Owner Login
        </button>
      </div>
    </nav>
  );
};