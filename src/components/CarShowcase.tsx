import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, BadgeCheck, Car as CarIcon, Filter, Grid3X3, LayoutList } from 'lucide-react';
import { useCars } from '../context/CarContext';
import CarCard from './CarCard';
import Footer from './Footer';

interface CarShowcaseProps {
  category: 'new' | 'used' | 'rentals';
  setCurrentView: (view: string) => void;
}

const CarShowcase: React.FC<CarShowcaseProps> = ({ category, setCurrentView }) => {
  const { newCarsList, usedCarsList, rentalCarsList } = useCars();
  const [activeFilter, setActiveFilter] = useState(0);

  const getConfig = () => {
    switch (category) {
      case 'new':
        return {
          title: 'New Cars',
          subtitle: 'Brand New Vehicles',
          description: 'Explore our exclusive collection of brand new vehicles. Each car comes with full manufacturer warranty and premium after-sales service.',
          cars: newCarsList,
          icon: Sparkles,
          iconColor: 'text-emerald-400',
          iconBg: 'bg-emerald-500/20 border-emerald-500/30',
          bgGradient: 'from-emerald-500/10',
          filters: ['All Models', 'SUV', 'Sedan', 'Pickup'],
        };
      case 'used':
        return {
          title: 'Used Cars',
          subtitle: 'Certified Pre-Owned',
          description: 'Quality certified pre-owned vehicles delivering exceptional value. Every car undergoes thorough inspection with our quality guarantee.',
          cars: usedCarsList,
          icon: BadgeCheck,
          iconColor: 'text-blue-400',
          iconBg: 'bg-blue-500/20 border-blue-500/30',
          bgGradient: 'from-blue-500/10',
          filters: ['All Prices', 'Under $15K', '$15K - $30K', 'Above $30K'],
        };
      case 'rentals':
        return {
          title: 'Rental Cars',
          subtitle: 'Premium Rentals',
          description: 'Premium vehicles for every occasion. From corporate events to family trips, experience luxury with our curated rental fleet.',
          cars: rentalCarsList,
          icon: CarIcon,
          iconColor: 'text-purple-400',
          iconBg: 'bg-purple-500/20 border-purple-500/30',
          bgGradient: 'from-purple-500/10',
          filters: ['All Types', 'MPV', 'Sedan', 'Van'],
        };
    }
  };

  const config = getConfig();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#0c0c0e] pt-20"
    >
      {/* Hero Banner */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} to-transparent opacity-50`} />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </motion.button>

          <div className="flex items-start gap-5 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
              className={`w-14 h-14 rounded-2xl ${config.iconBg} border flex items-center justify-center`}
            >
              <config.icon className={`w-6 h-6 ${config.iconColor}`} />
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-2"
              >
                {config.subtitle}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl lg:text-6xl tracking-tight text-white"
              >
                <span className="font-extralight">{config.title.split(' ')[0]}</span>{' '}
                <span className="font-bold">{config.title.split(' ')[1]}</span>
              </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-lg font-light max-w-2xl mt-6"
          >
            {config.description}
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="sticky top-20 z-30 bg-black/80 backdrop-blur-md border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              <div className="hidden sm:flex items-center gap-2">
                {config.filters.map((filter, idx) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveFilter(idx)}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === idx
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white/40 text-sm">
                Showing <span className="text-white font-semibold">{config.cars.length}</span> vehicles
              </p>
              <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                <button className="p-2 rounded-full bg-white/10 text-white">
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full text-white/40 hover:text-white transition-colors">
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Car Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {config.cars.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {config.cars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <CarIcon className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/40 text-lg">No vehicles available in this category.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentView('admin')}
                  className="mt-6 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
                >
                  Add Vehicles
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Rental Info (only for rentals) */}
      {category === 'rentals' && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Rental Terms</h3>
                  <ul className="space-y-4 text-white/50">
                    {[
                      'Minimum rental period: 1 day',
                      'Valid driving license required',
                      'Security deposit applicable',
                      'Fuel policy: Same-to-same',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">What's Included</h3>
                  <ul className="space-y-4 text-white/50">
                    {[
                      'Comprehensive insurance coverage',
                      '24/7 roadside assistance',
                      'Free delivery within Dhaka',
                      'Professional driver available',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />
    </motion.div>
  );
};

export default CarShowcase;
