import React, { useState } from 'react';
import { Car, MarketingCampaign, CarCategory } from '../types';
import { generateCarMarketingStrategy, generateCarImage } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, DollarSign, Calendar, Image as ImageIcon, CheckCircle, PlusCircle, LogOut, LayoutDashboard, CarFront } from 'lucide-react';

interface AdminDashboardProps {
  cars: Car[];
  campaigns: MarketingCampaign[];
  onCampaignCreated: (campaign: MarketingCampaign) => void;
  onAddCar: (car: Car) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ cars, campaigns, onCampaignCreated, onAddCar, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'marketing' | 'inventory'>('inventory');
  const [selectedCarId, setSelectedCarId] = useState<string>(cars[0]?.id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Form State for Adding Car
  const [newCar, setNewCar] = useState<Partial<Car>>({
    category: 'New',
    status: 'Available',
    year: new Date().getFullYear(),
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1000'
  });

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCar.name && newCar.brand && newCar.price) {
      const carToAdd: Car = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCar.name!,
        brand: newCar.brand!,
        year: newCar.year || 2024,
        price: Number(newCar.price),
        engine: newCar.engine || '2.0L 4-Cyl',
        speed: newCar.speed || '180 km/h',
        image: newCar.image!,
        category: newCar.category as CarCategory,
        status: 'Available'
      };
      onAddCar(carToAdd);
      alert("Car Added Successfully!");
      setNewCar({ 
        category: 'New', 
        status: 'Available', 
        year: new Date().getFullYear(),
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1000' 
      }); // Reset form partially
    }
  };

  const handleGenerateCampaign = async () => {
    const car = cars.find(c => c.id === selectedCarId);
    if (!car) return;

    setIsGenerating(true);
    setStatusMsg(`Analyzing ${car.name} specs...`);

    try {
      setTimeout(() => setStatusMsg('Drafting viral captions...'), 1000);
      const campaign = await generateCarMarketingStrategy(car);

      setStatusMsg('Rendering 4K promotional visuals...');
      for (const post of campaign.posts) {
         const img = await generateCarImage(post.imagePrompt + ` showing a ${car.brand} ${car.name}`);
         post.imageUrl = img;
      }
      
      onCampaignCreated(campaign);
    } catch (e) {
      console.error(e);
      alert("AI Failed to generate campaign");
    } finally {
      setIsGenerating(false);
      setStatusMsg('');
    }
  };

  const totalRevenue = campaigns.reduce((acc, c) => acc + c.projectedRevenue, 1250000);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
           <div>
             <h1 className="text-3xl font-bold flex items-center gap-3">
               <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">C</span>
               Carcian Admin
             </h1>
             <p className="text-gray-400 mt-2">Manage website inventory and AI marketing.</p>
           </div>
           <button onClick={onLogout} className="flex items-center gap-2 text-gray-400 hover:text-white">
             <LogOut className="w-5 h-5" /> Logout
           </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8 border-b border-gray-800 pb-1">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-2 font-medium flex items-center gap-2 ${activeTab === 'inventory' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          >
            <PlusCircle className="w-4 h-4" /> Add Vehicle (CMS)
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`pb-3 px-2 font-medium flex items-center gap-2 ${activeTab === 'marketing' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          >
            <Sparkles className="w-4 h-4" /> AI Marketing Bot
          </button>
        </div>

        {activeTab === 'inventory' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
              <h2 className="text-xl font-bold mb-6">Add New Vehicle to Website</h2>
              <form onSubmit={handleAddCar} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Brand</label>
                    <input type="text" placeholder="e.g. Toyota" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
                      value={newCar.brand || ''} onChange={e => setNewCar({...newCar, brand: e.target.value})} required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Model Name</label>
                    <input type="text" placeholder="e.g. Premio" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
                      value={newCar.name || ''} onChange={e => setNewCar({...newCar, name: e.target.value})} required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Category</label>
                    <select className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none"
                      value={newCar.category} onChange={e => setNewCar({...newCar, category: e.target.value as CarCategory})}
                    >
                      <option value="New">New Car</option>
                      <option value="Used">Used Car</option>
                      <option value="Rental">Rental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Price {newCar.category === 'Rental' ? '(Per Day)' : '(Total)'}</label>
                    <input type="number" placeholder="Amount in USD" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
                      value={newCar.price || ''} onChange={e => setNewCar({...newCar, price: parseInt(e.target.value)})} required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Year</label>
                    <input type="number" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
                      value={newCar.year} onChange={e => setNewCar({...newCar, year: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Engine</label>
                    <input type="text" placeholder="1.5L" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
                      value={newCar.engine || ''} onChange={e => setNewCar({...newCar, engine: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Speed</label>
                    <input type="text" placeholder="180 km/h" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
                      value={newCar.speed || ''} onChange={e => setNewCar({...newCar, speed: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-xs text-gray-500 mb-1">Image URL</label>
                   <input type="text" placeholder="https://..." className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" 
                      value={newCar.image || ''} onChange={e => setNewCar({...newCar, image: e.target.value})}
                   />
                   {newCar.image && (
                     <img src={newCar.image} className="mt-2 w-full h-32 object-cover rounded-lg border border-gray-700" alt="Preview" />
                   )}
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4">
                  Add to Website
                </button>
              </form>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
               <h2 className="text-xl font-bold mb-6">Current Inventory List</h2>
               <div className="space-y-3 h-[500px] overflow-y-auto no-scrollbar">
                  {cars.map(car => (
                    <div key={car.id} className="flex items-center gap-4 p-3 bg-black/40 rounded-lg border border-gray-800">
                       <img src={car.image} className="w-12 h-12 rounded bg-gray-800 object-cover" />
                       <div className="flex-1">
                          <p className="font-bold text-sm">{car.brand} {car.name}</p>
                          <p className="text-xs text-gray-500">{car.category} • {car.year}</p>
                       </div>
                       <span className="text-sm font-mono">${car.price.toLocaleString()}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               {/* Stats and Charts (Existing Logic) */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                     <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-sm uppercase">Revenue (Posts)</p>
                        <DollarSign className="w-5 h-5 text-green-500" />
                     </div>
                     <h3 className="text-4xl font-semibold">${totalRevenue.toLocaleString()}</h3>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                     <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-sm uppercase">Active Promotions</p>
                        <Sparkles className="w-5 h-5 text-blue-500" />
                     </div>
                     <h3 className="text-4xl font-semibold">{campaigns.length}</h3>
                  </div>
               </div>
               
               {/* Campaign List */}
               <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">Live Auto-Generated Content</h3>
                <div className="space-y-4">
                  {campaigns.flatMap(c => c.posts).map(post => (
                    <div key={post.id} className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-gray-800/50">
                       <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                          {post.imageUrl ? (
                            <img src={post.imageUrl} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600"><ImageIcon className="w-6 h-6"/></div>
                          )}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-white line-clamp-1">{post.caption}</h4>
                            <span className="text-xs text-blue-400 font-mono">${post.estimatedRevenue} Est.</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                             <span className={`uppercase text-[10px] px-1.5 py-0.5 rounded border border-gray-700`}>{post.platform}</span>
                          </div>
                       </div>
                    </div>
                  ))}
                  {campaigns.length === 0 && (
                    <div className="text-center text-gray-500 py-8">No marketing campaigns active. Select a car to begin.</div>
                  )}
                </div>
             </div>
            </div>

            {/* Generator Column */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-3xl sticky top-8">
               <div className="mb-8">
                 <h2 className="text-2xl font-bold text-white mb-2">Auto-Promote</h2>
                 <p className="text-gray-400 text-sm">Select a vehicle from your inventory. AI will generate viral content to sell or rent it.</p>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">Select Vehicle</label>
                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto no-scrollbar">
                      {cars.map(car => (
                        <div 
                          key={car.id} 
                          onClick={() => setSelectedCarId(car.id)}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${selectedCarId === car.id ? 'bg-blue-600/10 border-blue-500' : 'bg-black/40 border-gray-800 hover:border-gray-600'}`}
                        >
                           <img src={car.image} className="w-12 h-12 rounded-lg object-cover" />
                           <div>
                              <p className={`font-semibold ${selectedCarId === car.id ? 'text-blue-400' : 'text-white'}`}>{car.brand} {car.name}</p>
                              <p className="text-xs text-gray-500">${car.price}</p>
                           </div>
                           {selectedCarId === car.id && <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                     <button 
                       onClick={handleGenerateCampaign}
                       disabled={isGenerating}
                       className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {isGenerating ? (
                         <>
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           {statusMsg}
                         </>
                       ) : (
                         <>
                           <Sparkles className="w-5 h-5" />
                           Generate Viral Campaign
                         </>
                       )}
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};