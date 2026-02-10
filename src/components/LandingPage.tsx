import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Play, Star, Shield, Award, Zap } from 'lucide-react';
import { useCars } from '../context/CarContext';
import CarCard from './CarCard';
import Footer from './Footer';
import { heroImage, heroCarImage } from '../data/cars';

interface LandingPageProps {
  setCurrentView: (view: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
  const { newCarsList, usedCarsList, rentalCarsList } = useCars();

  const features = [
    { icon: Shield, title: 'Certified Quality', desc: '150-point inspection on every vehicle' },
    { icon: Award, title: 'Premium Selection', desc: 'Handpicked luxury automobiles' },
    { icon: Zap, title: 'Instant Financing', desc: 'Quick approval, competitive rates' },
  ];

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e]">
      {/* Hero Section - Full Viewport */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with 60% Opacity */}
        <div className="absolute inset-0">
          <img
            src={heroCarImage}
            alt="Range Rover Vogue"
            className="w-full h-full object-cover"
            style={{ opacity: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0e] via-[#0c0c0e]/60 to-[#0c0c0e]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/80 via-transparent to-[#0c0c0e]/60" />
        </div>

        {/* Subtle Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6"
          >
            Bangladesh's Premier Automotive Destination
          </motion.p>

          {/* Main Heading - Mixed Weights */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl tracking-tight mb-8"
          >
            <span className="font-extralight text-white/90">Experience</span>
            <br />
            <span className="font-bold text-white">Automotive</span>
            <br />
            <span className="font-light text-blue-400">Excellence</span>
          </motion.h1>

          {/* Subtitle Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/50 text-lg lg:text-xl max-w-2xl mx-auto mb-12 font-light"
          >
            Discover a curated collection of the world's finest automobiles.
            New, certified pre-owned, and premium rentals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('new')}
              className="group px-8 py-4 rounded-full bg-blue-600 text-white font-semibold flex items-center gap-3 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 btn-speed relative overflow-hidden"
            >
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold flex items-center gap-3 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              <span>Watch Showreel</span>
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-20"
          >
            {[
              { value: '500+', label: 'Cars Sold' },
              { value: '15+', label: 'Years' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* Luxury Interior Feature Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image with Overlay */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <motion.img
                  src={heroImage}
                  alt="Luxurious BMW Interior"
                  className="w-full aspect-[4/3] object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              </div>

              {/* Floating Review Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 lg:right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm font-light italic leading-relaxed">
                  "The most exceptional car buying experience. Truly world-class service."
                </p>
                <p className="text-blue-400 text-sm mt-3 font-medium">— Rahman K.</p>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:pl-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-4">Why Carcian</p>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white leading-tight mb-6">
                <span className="font-extralight">Where</span>{' '}
                <span className="font-bold">Luxury</span>
                <br />
                <span className="font-extralight">Meets</span>{' '}
                <span className="text-white/50 font-light">Accessibility</span>
              </h2>

              <p className="text-white/50 text-lg font-light leading-relaxed mb-10">
                At Carcian, we believe everyone deserves to experience automotive excellence.
                Our meticulously curated collection features the finest vehicles from around the globe,
                each selected for its exceptional quality and value.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-600/30 transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                      <p className="text-white/40 text-sm mt-1">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Cars Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-3">Fresh Arrivals</p>
              <h2 className="text-4xl lg:text-5xl tracking-tight text-white">
                <span className="font-extralight">New</span>{' '}
                <span className="font-bold">Cars</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => handleNavClick('new')}
              className="group flex items-center gap-2 text-white/50 hover:text-blue-400 mt-6 lg:mt-0 transition-colors"
            >
              <span className="text-sm font-medium">View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {newCarsList.slice(0, 3).map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Used Cars Section */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-3">Certified Pre-Owned</p>
              <h2 className="text-4xl lg:text-5xl tracking-tight text-white">
                <span className="font-extralight">Used</span>{' '}
                <span className="font-bold">Cars</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => handleNavClick('used')}
              className="group flex items-center gap-2 text-white/50 hover:text-blue-400 mt-6 lg:mt-0 transition-colors"
            >
              <span className="text-sm font-medium">View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {usedCarsList.slice(0, 3).map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Rentals Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-3">Premium Fleet</p>
              <h2 className="text-4xl lg:text-5xl tracking-tight text-white">
                <span className="font-extralight">Rental</span>{' '}
                <span className="font-bold">Cars</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => handleNavClick('rentals')}
              className="group flex items-center gap-2 text-white/50 hover:text-blue-400 mt-6 lg:mt-0 transition-colors"
            >
              <span className="text-sm font-medium">View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rentalCarsList.slice(0, 3).map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[150px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-4">Ready to Begin?</p>
          <h2 className="text-4xl lg:text-6xl tracking-tight text-white mb-6">
            <span className="font-extralight">Find Your</span>{' '}
            <span className="font-bold">Perfect</span>{' '}
            <span className="font-extralight">Car</span>
          </h2>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto mb-10">
            Visit our showroom today or browse our complete collection online.
            Our expert team is ready to help you make the perfect choice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('new')}
              className="group px-8 py-4 rounded-full bg-blue-600 text-white font-semibold flex items-center gap-3 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300"
            >
              <span>Browse Inventory</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+8801700000000"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Call: +880 1700 000 000
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
};

export default LandingPage;
