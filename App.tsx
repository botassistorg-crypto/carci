import React, { useState, useEffect } from 'react';
import { ViewState, Car, MarketingCampaign } from './types';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CarShowcase } from './components/CarShowcase';

// Initial Data for Bangladeshi Market
const INITIAL_CARS: Car[] = [
  // NEW C COLLECTION
  {
    id: 'n1',
    brand: 'Toyota',
    name: 'Premio F-EX',
    year: 2023,
    price: 42000,
    engine: '1.5L VVTi', 
    speed: '180 km/h',
    image: 'https://i.ibb.co.com/xqkKj1QZ/toyota-premio.jpg',
    category: 'New',
    status: 'Available'
  },
  {
    id: 'n2',
    brand: 'Land Rover',
    name: 'Range Rover Vogue',
    year: 2024,
    price: 450000,
    engine: '3.0L Turbo Hybrid', 
    speed: '240 km/h',
    image: 'https://i.ibb.co.com/b5bm0zRJ/range-rover.jpg',
    category: 'New',
    status: 'Available'
  },
  {
    id: 'n3',
    brand: 'Toyota',
    name: 'Hilux Revo Rocco',
    year: 2024,
    price: 85000,
    engine: '2.8L Diesel',
    speed: '190 km/h',
    image: 'https://i.ibb.co.com/9mzL9SWR/hilux.png',
    category: 'New',
    status: 'Available'
  },
  {
    id: 'n4',
    brand: 'Mercedes-Benz',
    name: 'E-Class 200',
    year: 2024,
    price: 110000,
    engine: '2.0L Turbo',
    speed: '240 km/h',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
    category: 'New',
    status: 'Available'
  },

  // USED CAR COLLECTION
  {
    id: 'u1',
    brand: 'Toyota',
    name: 'Corolla X',
    year: 2005,
    price: 10500,
    engine: '1.5L VVT-i',
    speed: '160 km/h',
    image: 'https://i.ibb.co.com/C5XKZ5bz/corolla.jpg',
    category: 'Used',
    status: 'Available'
  },
  {
    id: 'u2',
    brand: 'Mitsubishi',
    name: 'Pajero V6',
    year: 2010,
    price: 35000,
    engine: '3.0L V6',
    speed: '180 km/h',
    image: 'https://i.ibb.co.com/ch17tdxd/pajero.jpg',
    category: 'Used',
    status: 'Available'
  },
  {
    id: 'u3',
    brand: 'Toyota',
    name: 'Prius Hybrid',
    year: 2015,
    price: 18500,
    engine: '1.8L Hybrid',
    speed: '170 km/h',
    image: 'https://i.ibb.co.com/Xxnyfjxq/prius.png',
    category: 'Used',
    status: 'Available'
  },

  // RENTAL FLEET
  {
    id: 'r1',
    brand: 'Toyota',
    name: 'Hiace Super GL',
    year: 2018,
    price: 100,
    engine: '2.7L Petrol',
    speed: 'N/A',
    image: 'https://i.ibb.co.com/3yHbKp7K/hiace.png',
    category: 'Rental',
    status: 'Available'
  },
  {
    id: 'r2',
    brand: 'Toyota',
    name: 'Axio Fielder',
    year: 2017,
    price: 50,
    engine: '1.5L Hybrid',
    speed: 'N/A',
    image: 'https://i.ibb.co.com/C3hzZy28/feilder.png',
    category: 'Rental',
    status: 'Available'
  },
  {
    id: 'r3',
    brand: 'Toyota',
    name: 'Noah Hybrid',
    year: 2019,
    price: 80,
    engine: '1.8L Hybrid',
    speed: 'N/A',
    image: 'https://images.unsplash.com/photo-1626027376785-3e284457e937?auto=format&fit=crop&q=80&w=1000',
    category: 'Rental',
    status: 'Available'
  }
];

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [cars, setCars] = useState<Car[]>([]);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);

  // Load cars from local storage or set initial
  useEffect(() => {
    const savedCars = localStorage.getItem('carcian_cars');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    } else {
      setCars(INITIAL_CARS);
      localStorage.setItem('carcian_cars', JSON.stringify(INITIAL_CARS));
    }
  }, []);

  const handleCampaignCreated = (newCampaign: MarketingCampaign) => {
    setCampaigns([newCampaign, ...campaigns]);
  };

  const handleAddCar = (newCar: Car) => {
    const updatedCars = [newCar, ...cars];
    setCars(updatedCars);
    localStorage.setItem('carcian_cars', JSON.stringify(updatedCars));
  };

  return (
    <>
      {view === ViewState.HOME && (
        <LandingPage 
          cars={cars} 
          onNavigate={setView}
          currentView={view}
        />
      )}

      {view === ViewState.NEW_CARS && (
        <CarShowcase 
          category="New"
          cars={cars}
          onNavigate={setView}
          currentView={view}
        />
      )}

      {view === ViewState.USED_CARS && (
        <CarShowcase 
          category="Used"
          cars={cars}
          onNavigate={setView}
          currentView={view}
        />
      )}

      {view === ViewState.RENTALS && (
        <CarShowcase 
          category="Rental"
          cars={cars}
          onNavigate={setView}
          currentView={view}
        />
      )}

      {view === ViewState.ADMIN_DASHBOARD && (
        <AdminDashboard 
          cars={cars}
          campaigns={campaigns}
          onCampaignCreated={handleCampaignCreated}
          onAddCar={handleAddCar}
          onLogout={() => setView(ViewState.HOME)}
        />
      )}
    </>
  );
}