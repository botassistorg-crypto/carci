import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car, newCars, usedCars, rentalCars } from '../data/cars';

interface CarContextType {
  newCarsList: Car[];
  usedCarsList: Car[];
  rentalCarsList: Car[];
  addCar: (car: Omit<Car, 'id'>) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [newCarsList, setNewCarsList] = useState<Car[]>(newCars);
  const [usedCarsList, setUsedCarsList] = useState<Car[]>(usedCars);
  const [rentalCarsList, setRentalCarsList] = useState<Car[]>(rentalCars);

  const addCar = (car: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...car,
      id: `${car.category}-${Date.now()}`,
      year: car.year || 2024
    };

    switch (car.category) {
      case 'new':
        setNewCarsList(prev => [...prev, newCar]);
        break;
      case 'used':
        setUsedCarsList(prev => [...prev, newCar]);
        break;
      case 'rental':
        setRentalCarsList(prev => [...prev, newCar]);
        break;
    }
  };

  return (
    <CarContext.Provider value={{ newCarsList, usedCarsList, rentalCarsList, addCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};
