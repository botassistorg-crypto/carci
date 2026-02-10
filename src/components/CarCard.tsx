import React from 'react';
import { motion } from 'framer-motion';
import { Car } from '../data/cars';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface CarCardProps {
  car: Car;
  index?: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index = 0 }) => {
  const getCategoryLabel = () => {
    switch (car.category) {
      case 'new': return 'New';
      case 'used': return 'Pre-Owned';
      case 'rental': return 'Rental';
      default: return '';
    }
  };

  const getCategoryColor = () => {
    switch (car.category) {
      case 'new': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'used': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'rental': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl overflow-hidden bg-gray-900/40 border border-white/5 card-glow"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Floating Year Badge (Glassmorphism) */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-white/70" />
            <span className="text-xs text-white/90 font-medium">{car.year || 2024}</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${getCategoryColor()}`}>
            {getCategoryLabel()}
          </span>
        </div>

        {/* Price - Bottom of Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <motion.p
            className="text-3xl lg:text-4xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {car.price}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {car.name}
        </h3>

        {car.description && (
          <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-6">
            {car.description}
          </p>
        )}

        {/* CTA Button - Pill with Speed Effect */}
        <motion.button
          whileHover={{ scale: 1.02, skewX: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group/btn btn-speed relative overflow-hidden"
        >
          <span className="text-sm relative z-10">
            {car.category === 'rental' ? 'Book Now' : 'View Details'}
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 relative z-10" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CarCard;
