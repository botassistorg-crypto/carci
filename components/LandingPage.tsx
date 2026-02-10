import React from 'react';
import { Car, ViewState } from '../types';
import { ArrowRight, Globe } from 'lucide-react';
import { Navbar } from './Navbar';

interface LandingPageProps {
  cars: Car[];
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const LandingPage: React.FC<LandingPageProps> = ({ cars, onNavigate, currentView }) => {
  return (
    <div className="bg-[#0c0c0e] text-white overflow-hidden">
      <Navbar onNavigate={onNavigate} currentView={currentView} />

      {/* Hero Section */}
      <header className="relative w-full h-screen min-h-[700px] pt-24 px-4 md:px-8 lg:px-12 flex flex-col justify-between pb-8">
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury Car" 
              className="w-full h-full object-cover opacity-60"
            />
         </div>

         <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full justify-center">
            <div className="flex justify-between items-start mb-8">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-lg inline-flex">
                  <span className="px-3 py-1 text-xs font-medium uppercase text-blue-300">Bangladesh's #1 Dealership</span>
               </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] max-w-5xl">
              Drive Your <span className="font-semibold text-white">Legacy</span> <br />
              With <span className="text-blue-500 font-bold">Carcian</span>.
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
              From the rugged Toyota Prado for the streets of Dhaka to luxury Mercedes sedans. Buy New, Buy Used, or Rent for your next journey.
            </p>
            
            <div className="mt-8 flex items-center gap-4">
               <button 
                 onClick={() => onNavigate(ViewState.NEW_CARS)}
                 className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all"
               >
                 View Showroom
               </button>
               <button 
                 onClick={() => onNavigate(ViewState.RENTALS)}
                 className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all"
               >
                 Rent a Car
               </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
               <span className="text-xs uppercase tracking-widest">Scroll Down</span>
               <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
         </div>
      </header>

      {/* Featured Fleet Preview */}
      <section className="py-24 px-6 md:px-12 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold">Featured Inventory</h2>
            <button 
              onClick={() => onNavigate(ViewState.NEW_CARS)}
              className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors"
            >
              See all cars <ArrowRight className="w-5 h-5"/>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {cars.slice(0, 3).map((car, idx) => (
               <div key={idx} className="relative h-[400px] rounded-3xl overflow-hidden group bg-gray-900 border border-gray-800 cursor-pointer" onClick={() => onNavigate(car.category === 'Rental' ? ViewState.RENTALS : (car.category === 'New' ? ViewState.NEW_CARS : ViewState.USED_CARS))}>
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                     <p className="text-blue-400 text-xs font-bold uppercase mb-1">{car.category}</p>
                     <h3 className="text-2xl font-bold">{car.name}</h3>
                     <p className="text-gray-300 text-sm mt-1">{car.year} • {car.brand}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 md:px-12 border-t border-gray-900">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="flex-1">
               <p className="text-sm text-blue-500 uppercase tracking-widest mb-4">02 / Rent Process</p>
               <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-8">
                  We Have All That <br /> You May Need <br /> During Your Rent
               </h2>
               <div className="w-full h-[300px] rounded-2xl overflow-hidden mt-8 border border-gray-800">
                  <img src="https://i.ibb.co.com/NdqDsdfb/bmw-interior.jpg" className="w-full h-full object-cover" alt="BMW Interior" />
               </div>
            </div>
            <div className="flex-1 pt-12">
               <div className="space-y-0">
                  {[
                     "Individual Car Rent with Driver",
                     "Car Rent for Tourists",
                     "Photoshoot with Premium Cars",
                     "Monthly Rent Plans"
                  ].map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center py-6 border-b border-gray-800 group cursor-pointer hover:px-4 transition-all duration-300">
                        <div className="flex items-center gap-6">
                           <span className="text-gray-600 font-mono text-sm">0{idx + 1}</span>
                           <span className="text-xl font-medium text-gray-300 group-hover:text-blue-400">{item}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <ArrowRight className="w-4 h-4 text-blue-400" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 text-center border-t border-gray-900 bg-[#08080a]">
         <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-lg shadow-blue-900/50">
               C
            </div>
            <h2 className="text-3xl font-medium">Carcian Auto Dealership</h2>
            <p className="text-gray-500">Dhaka • Chittagong • Sylhet</p>
            <div className="mt-8 flex gap-8 text-sm text-gray-400">
               <a href="#" className="flex items-center gap-2 hover:text-white"><Globe className="w-4 h-4"/> sales@carcian.com.bd</a>
            </div>
         </div>
      </section>
    </div>
  );
};