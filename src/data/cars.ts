export interface Car {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  category: 'new' | 'used' | 'rental';
  year?: number;
  description?: string;
}

export const newCars: Car[] = [
  {
    id: 'new-1',
    name: 'Range Rover Vogue',
    price: '$450,000',
    priceValue: 450000,
    image: 'https://i.ibb.co.com/b5bm0zRJ/range-rover.jpg',
    category: 'new',
    year: 2024,
    description: 'The epitome of British luxury. Command every road with unparalleled sophistication.'
  },
  {
    id: 'new-2',
    name: 'Toyota Premio F-EX',
    price: '$42,000',
    priceValue: 42000,
    image: 'https://i.ibb.co.com/xqkKj1QZ/toyota-premio.jpg',
    category: 'new',
    year: 2024,
    description: 'Japanese precision meets elegant design. Perfect for the discerning professional.'
  },
  {
    id: 'new-3',
    name: 'Toyota Hilux Revo',
    price: '$85,000',
    priceValue: 85000,
    image: 'https://i.ibb.co.com/9mzL9SWR/hilux.png',
    category: 'new',
    year: 2024,
    description: 'Unstoppable power meets refined comfort. Conquer any terrain in style.'
  },
  {
    id: 'new-4',
    name: 'Mercedes E-Class',
    price: '$110,000',
    priceValue: 110000,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070',
    category: 'new',
    year: 2024,
    description: 'German engineering excellence. Where innovation meets timeless elegance.'
  }
];

export const usedCars: Car[] = [
  {
    id: 'used-1',
    name: 'Toyota Corolla X',
    price: '$10,500',
    priceValue: 10500,
    image: 'https://i.ibb.co.com/C5XKZ5bz/corolla.jpg',
    category: 'used',
    year: 2021,
    description: 'Legendary reliability at an exceptional value. A timeless choice.'
  },
  {
    id: 'used-2',
    name: 'Mitsubishi Pajero V6',
    price: '$35,000',
    priceValue: 35000,
    image: 'https://i.ibb.co.com/ch17tdxd/pajero.jpg',
    category: 'used',
    year: 2020,
    description: 'Adventure-ready SUV with proven V6 performance. Ready for your next journey.'
  },
  {
    id: 'used-3',
    name: 'Toyota Prius',
    price: '$18,500',
    priceValue: 18500,
    image: 'https://i.ibb.co.com/Xxnyfjxq/prius.png',
    category: 'used',
    year: 2022,
    description: 'Pioneering hybrid technology. Efficient, eco-conscious, and surprisingly refined.'
  }
];

export const rentalCars: Car[] = [
  {
    id: 'rental-1',
    name: 'Toyota Hiace Super GL',
    price: '$100/day',
    priceValue: 100,
    image: 'https://i.ibb.co.com/3yHbKp7K/hiace.png',
    category: 'rental',
    year: 2023,
    description: 'Spacious luxury for group travel. Perfect for corporate events and family trips.'
  },
  {
    id: 'rental-2',
    name: 'Toyota Axio Fielder',
    price: '$50/day',
    priceValue: 50,
    image: 'https://i.ibb.co.com/C3hzZy28/feilder.png',
    category: 'rental',
    year: 2023,
    description: 'Versatile wagon with exceptional fuel economy. Ideal for city and highway.'
  },
  {
    id: 'rental-3',
    name: 'Toyota Noah',
    price: '$80/day',
    priceValue: 80,
    image: 'https://images.unsplash.com/photo-1626027376785-3e284457e937?auto=format&fit=crop&q=80&w=1000',
    category: 'rental',
    year: 2023,
    description: 'Premium MPV experience. Comfort and convenience for every passenger.'
  }
];

export const heroImage = 'https://i.ibb.co.com/NdqDsdfb/bmw-interior.jpg';
export const heroCarImage = 'https://i.ibb.co.com/b5bm0zRJ/range-rover.jpg';
