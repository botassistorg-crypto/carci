import React from 'react';
import { Car, CarCategory, ViewState } from '../types';
import { Navbar } from './Navbar';
import { ArrowRight } from 'lucide-react';

interface CarShowcaseProps {
  category: CarCategory;
  cars: Car[];
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const CarShowcase: React.FC<CarShowcaseProps> = ({ category, cars, onNavigate, currentView }) => {
  const filteredCars = cars.filter(c => c.category === category);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      <Navbar onNavigate={onNavigate} currentView={currentView} />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-20">
        <div className="mb-12">
          <p className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">Inventory</p>
          <h1 className="text-4xl md:text-5xl font-bold">{category === 'Rental' ? 'Rental Fleet' : `${category} Collection`}</h1>
          <p className="text-gray-400 mt-4 max-w-2xl">
            {category === 'New' && "Explore the latest models fresh from the showroom floor. Experience cutting-edge technology and pristine condition."}
            {category === 'Used' && "Verified, high-quality pre-owned vehicles. Great deals on Toyota, Honda, and luxury brands."}
            {category === 'Rental' && "Need a ride for a trip or event? Choose from our wide range of comfortable sedans, microbuses, and luxury SUVs."}
          </p>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-gray-800">
            <p className="text-gray-500 text-lg">No vehicles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <div key={car.id} className="group bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                    {car.year}
                  </div>
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">{car.brand}</p>
                      <h3 className="text-xl font-bold text-white">{car.name}</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 my-6 text-sm text-gray-400">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Engine</span>
                      <span className="text-gray-300">{car.engine}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Speed</span>
                      <span className="text-gray-300">{car.speed}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <span className="text-lg font-bold text-white">
                        {category === 'Rental' ? `$${car.price}/day` : `$${car.price.toLocaleString()}`}
                      </span>
                      {category === 'Rental' && <span className="text-xs text-gray-500 block">Inc. Insurance</span>}
                    </div>
                    <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                      {category === 'Rental' ? 'Book Now' : 'Details'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};