import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Plus,
  Sparkles,
  Image,
  DollarSign,
  Tag,
  Type,
  Loader2,
  Check,
  Car,
  AlertCircle,
  Wand2,
  ArrowLeft,
  LayoutGrid,
  Settings,
  LogOut,
  Eye
} from 'lucide-react';
import { useCars } from '../context/CarContext';
import { Car as CarType } from '../data/cars';

interface AdminDashboardProps {
  setCurrentView: (view: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentView }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { addCar, newCarsList, usedCarsList, rentalCarsList } = useCars();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceValue: '',
    image: '',
    category: 'new' as 'new' | 'used' | 'rental',
    description: ''
  });

  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'inventory'>('add');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'carcian2024') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateCaption = async () => {
    if (!formData.name) return;

    setIsGeneratingCaption(true);

    if (apiKey) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Generate a luxurious, premium marketing caption for a car named "${formData.name}" priced at ${formData.price || 'premium pricing'}. The caption should be elegant and sophisticated. Keep it under 40 words. Do not use quotation marks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        setGeneratedCaption(text);
        setFormData(prev => ({ ...prev, description: text }));
      } catch {
        generateFallbackCaption();
      }
    } else {
      generateFallbackCaption();
    }

    setIsGeneratingCaption(false);
  };

  const generateFallbackCaption = () => {
    const captions = [
      `Experience unparalleled luxury with the ${formData.name}. Engineered for those who demand excellence.`,
      `The ${formData.name} — where precision engineering meets timeless elegance. Command every road.`,
      `Discover the art of driving with the ${formData.name}. A symphony of power and refined aesthetics.`,
      `Elevate your journey with the ${formData.name}. Premium craftsmanship meets innovation.`,
      `The ${formData.name} embodies automotive excellence. Bold design, superior performance.`
    ];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    setGeneratedCaption(randomCaption);
    setFormData(prev => ({ ...prev, description: randomCaption }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) return;

    const newCar: Omit<CarType, 'id'> = {
      name: formData.name,
      price: formData.price,
      priceValue: parseFloat(formData.priceValue) || 0,
      image: formData.image,
      category: formData.category,
      year: 2024,
      description: formData.description || `Premium ${formData.category} vehicle available at Carcian.`
    };

    addCar(newCar);

    setFormData({
      name: '',
      price: '',
      priceValue: '',
      image: '',
      category: 'new',
      description: ''
    });
    setGeneratedCaption('');

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0c0c0e] flex items-center justify-center px-6 pt-20"
      >
        <div className="w-full max-w-md">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-blue-400" />
              </div>
              <h1 className="text-3xl tracking-tight text-white mb-2">
                <span className="font-extralight">Owner</span>{' '}
                <span className="font-bold">Login</span>
              </h1>
              <p className="text-white/40 text-sm">Access your dealership dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors"
                  placeholder="Enter admin password"
                />
              </div>

              <AnimatePresence>
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {loginError}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300"
              >
                Login to Dashboard
              </motion.button>
            </form>

            <p className="text-white/20 text-xs text-center mt-8">
              Demo password: carcian2024
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Dashboard
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0c0c0e]"
    >
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <span className="text-white font-semibold">CARCIAN</span>
                  <span className="text-white/30 text-xs ml-2">Admin</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400/80 mb-3">Dashboard</p>
            <h1 className="text-4xl lg:text-5xl tracking-tight text-white">
              <span className="font-extralight">Manage</span>{' '}
              <span className="font-bold">Inventory</span>
            </h1>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-12"
          >
            {[
              { label: 'New Cars', count: newCarsList.length, color: 'emerald', borderColor: 'border-emerald-500/30' },
              { label: 'Used Cars', count: usedCarsList.length, color: 'blue', borderColor: 'border-blue-500/30' },
              { label: 'Rental Cars', count: rentalCarsList.length, color: 'purple', borderColor: 'border-purple-500/30' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`bg-white/5 backdrop-blur-md border ${stat.borderColor} rounded-2xl p-6`}
              >
                <p className={`text-${stat.color}-400 text-xs uppercase tracking-widest mb-2`}>{stat.label}</p>
                <p className="text-4xl font-light text-white">{stat.count}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('add')}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'add'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'inventory'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              View Inventory
            </motion.button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10 transition-all">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'add' ? (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Add Car Form */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Add New Vehicle</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Car Name */}
                    <div>
                      <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                        <Type className="w-3.5 h-3.5" />
                        Car Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors"
                        placeholder="e.g., Toyota Land Cruiser"
                        required
                      />
                    </div>

                    {/* Price */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                          <DollarSign className="w-3.5 h-3.5" />
                          Display Price
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors"
                          placeholder="$50,000"
                          required
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                          <DollarSign className="w-3.5 h-3.5" />
                          Numeric Value
                        </label>
                        <input
                          type="number"
                          name="priceValue"
                          value={formData.priceValue}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors"
                          placeholder="50000"
                        />
                      </div>
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                        <Image className="w-3.5 h-3.5" />
                        Image URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors"
                        placeholder="https://example.com/car.jpg"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                        <Tag className="w-3.5 h-3.5" />
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="new" className="bg-[#111113]">New Car</option>
                        <option value="used" className="bg-[#111113]">Used Car</option>
                        <option value="rental" className="bg-[#111113]">Rental Car</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors resize-none"
                        placeholder="Marketing description..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full py-4 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300"
                    >
                      <Plus className="w-5 h-5" />
                      Add Vehicle
                    </motion.button>
                  </form>
                </div>

                {/* AI Caption Generator + Preview */}
                <div className="space-y-6">
                  {/* AI Generator */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center">
                        <Wand2 className="w-5 h-5 text-purple-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white">AI Caption Generator</h2>
                    </div>

                    <p className="text-white/40 text-sm mb-6">
                      Generate compelling marketing copy using AI. Add your API key for enhanced results.
                    </p>

                    {/* API Key Input */}
                    <div className="mb-6">
                      <label className="text-white/40 text-xs uppercase tracking-widest mb-3 block">
                        Google AI API Key (Optional)
                      </label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500/50 transition-colors"
                        placeholder="Enter Gemini API key..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={generateCaption}
                      disabled={isGeneratingCaption || !formData.name}
                      className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                        formData.name
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50'
                          : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
                      }`}
                    >
                      {isGeneratingCaption ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate Caption
                        </>
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {generatedCaption && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-6 p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20"
                        >
                          <p className="text-purple-300 text-xs uppercase tracking-widest mb-2">Generated:</p>
                          <p className="text-white/90 text-sm leading-relaxed">{generatedCaption}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Preview Card */}
                  <AnimatePresence>
                    {formData.name && formData.image && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
                      >
                        <h3 className="text-lg font-bold text-white mb-6">Preview</h3>
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-gray-900/40">
                          <div className="aspect-video relative">
                            <img
                              src={formData.image}
                              alt={formData.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <p className="text-2xl font-bold text-white">{formData.price || '$0'}</p>
                            </div>
                          </div>
                          <div className="p-5">
                            <h4 className="text-lg font-bold text-white">{formData.name}</h4>
                            {formData.description && (
                              <p className="text-white/40 text-sm mt-2 line-clamp-2">{formData.description}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* Inventory View */
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                    <Car className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Current Inventory</h2>
                </div>

                <div className="space-y-8">
                  {/* New Cars */}
                  <div>
                    <h3 className="text-emerald-400 text-xs uppercase tracking-widest mb-4 font-semibold">
                      New Cars ({newCarsList.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {newCarsList.map((car) => (
                        <div key={car.id} className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
                          <img src={car.image} alt={car.name} className="w-16 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="text-white font-semibold text-sm">{car.name}</p>
                            <p className="text-white/40 text-xs">{car.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Used Cars */}
                  <div>
                    <h3 className="text-blue-400 text-xs uppercase tracking-widest mb-4 font-semibold">
                      Used Cars ({usedCarsList.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {usedCarsList.map((car) => (
                        <div key={car.id} className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4 hover:border-blue-500/30 transition-colors">
                          <img src={car.image} alt={car.name} className="w-16 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="text-white font-semibold text-sm">{car.name}</p>
                            <p className="text-white/40 text-xs">{car.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rental Cars */}
                  <div>
                    <h3 className="text-purple-400 text-xs uppercase tracking-widest mb-4 font-semibold">
                      Rental Cars ({rentalCarsList.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {rentalCarsList.map((car) => (
                        <div key={car.id} className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4 hover:border-purple-500/30 transition-colors">
                          <img src={car.image} alt={car.name} className="w-16 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="text-white font-semibold text-sm">{car.name}</p>
                            <p className="text-white/40 text-xs">{car.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-emerald-600/30 z-50"
          >
            <Check className="w-5 h-5" />
            <span className="font-semibold">Vehicle added successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;
