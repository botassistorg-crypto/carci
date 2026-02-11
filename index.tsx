import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// --- Types ---
type Car = {
  id: string;
  name: string;
  image: string;
  category: string;
  seats: number;
  pricePerDay: string;
  description: string;
};

type Booking = {
  id: string;
  carName: string;
  customerName: string;
  phone: string;
  pickup: string;
  dropoff: string;
  tripType: 'oneway' | 'roundtrip';
  date: string;
  budget: string;
  status: 'Pending' | 'Confirmed';
};

type Language = 'en' | 'bn';

// --- Constants & Data ---
const ADMIN_PASSWORD = "01628";
const OWNER_EMAIL = "ikingg99834@gmail.com";
// Hardcoded Script URL provided by user
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwaFC3_GUKYJu5sD5I2SWiZExdRvEvM9LLxU3hYoNRbWqZ-8Lk4FI3LnChmVZN-v66zCg/exec";

const INITIAL_CARS: Car[] = [
  {
    id: '1',
    name: 'Toyota Axio',
    image: 'https://i.ibb.co.com/XxPmHNtM/axio.png',
    category: 'Sedan',
    seats: 4,
    pricePerDay: '3000 BDT',
    description: 'Reliable and fuel-efficient, perfect for city trips.',
  },
  {
    id: '2',
    name: 'Toyota Noah Esquire',
    image: 'https://i.ibb.co.com/99PcC9QC/esquire.png',
    category: 'Microbus',
    seats: 7,
    pricePerDay: '5000 BDT',
    description: 'Luxury family van with spacious interior.',
  },
  {
    id: '3',
    name: 'Toyota Hiace',
    image: 'https://i.ibb.co.com/3yHbKp7K/hiace.png',
    category: 'Van',
    seats: 12,
    pricePerDay: '6000 BDT',
    description: 'Best for large groups and long distance travel.',
  },
  {
    id: '4',
    name: 'Toyota Prius (Red)',
    image: 'https://i.ibb.co.com/Xxnyfjxq/prius.png',
    category: 'Hybrid Sedan',
    seats: 4,
    pricePerDay: '4500 BDT',
    description: 'Eco-friendly stylish ride for premium comfort.',
  },
  {
    id: '5',
    name: 'Toyota Premio',
    image: 'https://i.ibb.co.com/xqkKj1QZ/toyota-premio.jpg',
    category: 'Luxury Sedan',
    seats: 4,
    pricePerDay: '4000 BDT',
    description: 'Classic luxury sedan for business or pleasure.',
  },
  {
    id: '6',
    name: 'Toyota Prius Premium (White)',
    image: 'https://i.ibb.co.com/vxZC68B6/prius-white.png',
    category: 'Premium Hybrid',
    seats: 4,
    pricePerDay: '5500 BDT',
    description: 'Top tier hybrid experience for weddings and events.',
  }
];

const TRANSLATIONS = {
  en: {
    home: 'Home',
    fleet: 'Our Fleet',
    services: 'Services',
    contact: 'Contact',
    admin: 'Owner Login',
    bookNow: 'Book Now',
    heroTitle: 'Premium Car Rental in Dhaka',
    heroSubtitle: 'Safe, Reliable, and Luxurious Rides for Your Journey',
    exploreCars: 'Explore Cars',
    featuredCars: 'Featured Vehicles',
    aboutUs: 'About Us',
    aboutText: 'We provide top-notch car rental services across Bangladesh. Whether you need a car for a wedding, a business trip, or a family vacation, we have the perfect vehicle for you.',
    adminPanel: 'Admin Panel',
    addCar: 'Add New Car',
    dashboard: 'Dashboard',
    logout: 'Logout',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    carName: 'Car Name',
    imageURL: 'Image URL',
    category: 'Category',
    seats: 'Seats',
    price: 'Price Per Day',
    desc: 'Description',
    login: 'Login',
    password: 'Password',
    bookingTitle: 'Book Your Ride',
    name: 'Full Name',
    phone: 'Phone Number',
    pickup: 'Pick-up Location',
    dropoff: 'Drop-off Location',
    date: 'Date & Time',
    tripType: 'Trip Type',
    oneWay: 'One Way (Drop Only)',
    roundTrip: 'Round Trip (Up-Down)',
    budget: 'Estimated Budget (BDT)',
    submitBooking: 'Confirm & Send Request',
    successMsg: 'Booking Request Initiated!',
    successSub: 'We have received your booking details. We will contact you shortly to confirm.',
    manualMail: 'Booking data sent to server.',
    manualMailBtn: 'Send Backup Email',
    selectCar: 'Select a Car',
    recentBookings: 'Recent Bookings',
    noBookings: 'No bookings yet.',
    footerText: 'Dhaka Wheels © 2024. All rights reserved.',
    whyChooseUs: 'Why Choose Us?',
    reason1Title: 'Best Prices',
    reason1Desc: 'Competitive rates for all vehicle types.',
    reason2Title: '24/7 Support',
    reason2Desc: 'We are always here to help you.',
    reason3Title: 'Well Maintained',
    reason3Desc: 'Clean and serviced vehicles for safety.',
    howItWorks: 'How It Works',
    step1: 'Choose Car',
    step2: 'Book Schedule',
    step3: 'Enjoy Ride',
    testimonials: 'Customer Reviews',
    review1: 'Excellent service! The car was clean and driver was professional.',
    review2: 'Best rental experience in Dhaka. Highly recommended.',
    review3: 'Reasonable prices and great cars.',
    settings: 'Settings',
    scriptUrlLabel: 'Google Apps Script URL (for Sheet Integration)',
    scriptUrlPlaceholder: 'Paste your Web App URL here',
    settingsSaved: 'Settings saved!',
    processing: 'Processing Booking...',
  },
  bn: {
    home: 'হোম',
    fleet: 'আমাদের গাড়ি',
    services: 'সেবাসমূহ',
    contact: 'যোগাযোগ',
    admin: 'মালিক লগইন',
    bookNow: 'বুক করুন',
    heroTitle: 'ঢাকায় প্রিমিয়াম কার রেন্টাল',
    heroSubtitle: 'আপনার যাত্রার জন্য নিরাপদ, নির্ভরযোগ্য এবং বিলাসবহুল বাহন',
    exploreCars: 'গাড়ি দেখুন',
    featuredCars: 'জনপ্রিয় গাড়ি',
    aboutUs: 'আমাদের সম্পর্কে',
    aboutText: 'আমরা সমগ্র বাংলাদেশে উন্নতমানের গাড়ি ভাড়ার সেবা প্রদান করি। বিয়ে, ব্যবসায়িক ভ্রমণ বা পারিবারিক ভ্রমণের জন্য আমাদের কাছে রয়েছে সেরা কালেকশন।',
    adminPanel: 'অ্যাডমিন প্যানেল',
    addCar: 'নতুন গাড়ি যোগ করুন',
    dashboard: 'ড্যাশবোর্ড',
    logout: 'লগআউট',
    delete: 'মুছুন',
    edit: 'এডিট',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    carName: 'গাড়ির নাম',
    imageURL: 'ছবির লিঙ্ক',
    category: 'ক্যাটাগরি',
    seats: 'আসন',
    price: 'দৈনিক ভাড়া',
    desc: 'বিবরণ',
    login: 'লগইন',
    password: 'পাসওয়ার্ড',
    bookingTitle: 'গাড়ি বুক করুন',
    name: 'পুরো নাম',
    phone: 'মোবাইল নম্বর',
    pickup: 'পিক-আপ লোকেশন',
    dropoff: 'ড্রপ-অফ লোকেশন',
    date: 'তারিখ ও সময়',
    tripType: 'ভ্রমণের ধরন',
    oneWay: 'একমুখী (শুধু নামিয়ে দেয়া)',
    roundTrip: 'দ্বিমুখী (আসা-যাওয়া)',
    budget: 'আনুমানিক বাজেট (টাকা)',
    submitBooking: 'নিশ্চিত করুন ও ইমেইল পাঠান',
    successMsg: 'বুকিং অনুরোধ গৃহীত হয়েছে!',
    successSub: 'আমরা আপনার বুকিংয়ের বিবরণ পেয়েছি। নিশ্চিত করতে আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
    manualMail: 'বুকিং তথ্য সার্ভারে পাঠানো হয়েছে।',
    manualMailBtn: 'ব্যাকআপ ইমেল পাঠান',
    selectCar: 'গাড়ি নির্বাচন করুন',
    recentBookings: 'সাম্প্রতিক বুকিং',
    noBookings: 'কোন বুকিং নেই।',
    footerText: 'ঢাকা হুইলস © ২০২৪। সর্বস্বত্ব সংরক্ষিত।',
    whyChooseUs: 'কেন আমাদের বেছে নেবেন?',
    reason1Title: 'সেরা মূল্য',
    reason1Desc: 'সব ধরনের গাড়ির জন্য সাশ্রয়ী মূল্য।',
    reason2Title: '২৪/৭ সাপোর্ট',
    reason2Desc: 'আমরা সর্বদা আপনার সেবায় নিয়োজিত।',
    reason3Title: 'সু রক্ষিত গাড়ি',
    reason3Desc: 'নিরাপত্তার জন্য পরিষ্কার এবং সার্ভিসিং করা গাড়ি।',
    howItWorks: 'কিভাবে কাজ করে',
    step1: 'গাড়ি বাছুন',
    step2: 'শিডিউল বুক করুন',
    step3: 'যাত্রা উপভোগ করুন',
    testimonials: 'গ্রাহকদের মতামত',
    review1: 'চমৎকার সেবা! গাড়িটি পরিষ্কার ছিল এবং চালক খুব পেশাদার ছিলেন।',
    review2: 'ঢাকায় সেরা ভাড়ার অভিজ্ঞতা। অত্যন্ত বাঞ্ছনীয়।',
    review3: 'সাশ্রয়ী মূল্য এবং দুর্দান্ত গাড়ি।',
    settings: 'সেটিংস',
    scriptUrlLabel: 'গুগল অ্যাপস স্ক্রিপ্ট ইউআরএল (শীট ইন্টিগ্রেশনের জন্য)',
    scriptUrlPlaceholder: 'এখানে ওয়েব অ্যাপ ইউআরএল পেস্ট করুন',
    settingsSaved: 'সেটিংস সংরক্ষিত!',
    processing: 'বুকিং প্রক্রিয়াধীন...',
  }
};

// --- Animation Wrapper Component ---
// This component encapsulates the CSSTransition and the Ref creation
// to satisfy React Strict Mode and avoid findDOMNode
const AnimationWrapper = ({ children, ...props }: any) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      {...props}
    >
      <div ref={nodeRef} className="page-transition w-full">
        {children}
      </div>
    </CSSTransition>
  );
};

// --- Components ---

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState('home');
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  // Initialized with the provided hardcoded URL
  const [scriptUrl, setScriptUrl] = useState(GOOGLE_SCRIPT_URL);
  
  // Load data from local storage on mount
  useEffect(() => {
    const savedCars = localStorage.getItem('cars');
    const savedBookings = localStorage.getItem('bookings');
    const savedUrl = localStorage.getItem('scriptUrl');
    
    if (savedCars) setCars(JSON.parse(savedCars));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    
    // Use saved URL if exists (allows overriding the constant), otherwise use constant
    if (savedUrl) {
      setScriptUrl(savedUrl);
    } else {
      setScriptUrl(GOOGLE_SCRIPT_URL);
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem('scriptUrl', scriptUrl);
  }, [scriptUrl]);

  const t = TRANSLATIONS[lang];

  const navigateTo = (newView: string, car?: Car) => {
    if (car) setSelectedCarForBooking(car);
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'bn' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Navbar t={t} currentView={view} onNavigate={navigateTo} lang={lang} toggleLang={toggleLang} isAdmin={isAdmin} />
      
      <main className="flex-grow relative">
        <TransitionGroup component="div" className="transition-wrapper relative">
          <AnimationWrapper
            key={view}
            timeout={400}
            classNames="page"
            unmountOnExit
          >
              {view === 'home' && <Home t={t} cars={cars} onBook={(car) => navigateTo('booking', car)} />}
              {view === 'fleet' && <Fleet t={t} cars={cars} onBook={(car) => navigateTo('booking', car)} />}
              {view === 'booking' && (
                <BookingPage 
                  t={t} 
                  selectedCar={selectedCarForBooking} 
                  cars={cars} 
                  onBookingSubmit={(b) => setBookings([b, ...bookings])} 
                  scriptUrl={scriptUrl}
                />
              )}
              {view === 'admin' && (
                <AdminPanel 
                  t={t} 
                  isAuthenticated={isAdmin} 
                  onLogin={setIsAdmin} 
                  cars={cars} 
                  setCars={setCars} 
                  bookings={bookings}
                  scriptUrl={scriptUrl}
                  setScriptUrl={setScriptUrl}
                />
              )}
          </AnimationWrapper>
        </TransitionGroup>
      </main>

      <Footer t={t} />
    </div>
  );
}

// --- Navbar ---
const Navbar = ({ t, currentView, onNavigate, lang, toggleLang, isAdmin }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'fleet', label: t.fleet },
    { id: 'booking', label: t.bookNow },
    { id: 'admin', label: isAdmin ? t.dashboard : t.admin },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <i className="fa-solid fa-car-side text-primary text-2xl transition-transform group-hover:scale-110"></i>
          <span className="text-2xl font-bold text-primary tracking-tight">Dhaka<span className="text-secondary">Wheels</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`menu-item text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${currentView === item.id ? 'text-secondary' : 'text-gray-600 hover:text-primary'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={toggleLang}
            className="px-3 py-1 border border-gray-300 rounded-full text-xs font-bold hover:bg-gray-100 transition duration-300 hover:scale-105"
          >
            {lang === 'en' ? 'বাংলা' : 'English'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
              onClick={toggleLang}
              className="px-2 py-1 border border-gray-300 rounded text-xs font-bold"
            >
              {lang === 'en' ? 'BN' : 'EN'}
          </button>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-2xl text-primary transition-transform active:scale-95">
            <i className={`fa-solid ${isMobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-4 animate-fade-in-up shadow-lg">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileOpen(false);
              }}
              className={`text-left text-lg font-medium p-2 rounded transition-colors ${currentView === item.id ? 'text-secondary bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Home Page ---
const Home = ({ t, cars, onBook }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-gray-900 overflow-hidden flex items-center group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co.com/1fNWzZDR/hero-image-for-demo-car-rental.png" 
            alt="Hero Car" 
            className="w-full h-full object-cover opacity-50 transition-transform duration-[3s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
              {t.heroSubtitle}
            </p>
            <button 
              onClick={() => {
                const fleetSection = document.getElementById('featured-cars');
                fleetSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition transform hover:scale-105 shadow-lg active:scale-95"
            >
              {t.exploreCars} <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">{t.howItWorks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-car', title: t.step1, desc: 'Choose from our wide range of premium vehicles.' },
              { icon: 'fa-calendar-check', title: t.step2, desc: 'Select your date, time and location.' },
              { icon: 'fa-face-smile', title: t.step3, desc: 'We pick you up, you enjoy the journey.' }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-xl hover:bg-gray-50 transition duration-300 hover:-translate-y-2 border border-transparent hover:border-gray-100 hover:shadow-lg">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl transition-transform duration-500 hover:rotate-12">
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section id="featured-cars" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-10 text-center">{t.featuredCars}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.slice(0, 3).map(car => (
              <CarCard key={car.id} car={car} t={t} onBook={onBook} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => (document.querySelector('.fa-car-side') as HTMLElement)?.click()} 
              className="text-primary font-bold hover:text-secondary underline transition-colors"
            >
              View All Cars
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 group">
               <img src="https://i.ibb.co.com/vxZC68B6/prius-white.png" alt="Why us" className="rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-6">{t.whyChooseUs}</h2>
              <div className="space-y-6">
                {[
                    { icon: 'fa-tags', title: t.reason1Title, desc: t.reason1Desc },
                    { icon: 'fa-headset', title: t.reason2Title, desc: t.reason2Desc },
                    { icon: 'fa-screwdriver-wrench', title: t.reason3Title, desc: t.reason3Desc }
                ].map((reason, idx) => (
                    <div key={idx} className="flex gap-4 group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary text-white rounded-lg flex items-center justify-center text-xl transition-transform group-hover:scale-110">
                        <i className={`fa-solid ${reason.icon}`}></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">{reason.title}</h3>
                        <p className="text-gray-600">{reason.desc}</p>
                    </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Testimonials */}
       <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">{t.testimonials}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[t.review1, t.review2, t.review3].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-accent mb-4">
                  {[...Array(5)].map((_, j) => <i key={j} className="fa-solid fa-star"></i>)}
                </div>
                <p className="text-gray-600 italic">"{review}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <span className="font-bold text-sm">Customer {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-primary mb-6">{t.aboutUs}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{t.aboutText}</p>
        </div>
      </section>
    </div>
  );
};

// --- Fleet Page ---
const Fleet = ({ t, cars, onBook }) => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12 animate-fade-in-up">{t.fleet}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <CarCard key={car.id} car={car} t={t} onBook={onBook} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Booking Page ---
const BookingPage = ({ t, selectedCar, cars, onBookingSubmit, scriptUrl }) => {
  const [formData, setFormData] = useState({
    carId: selectedCar ? selectedCar.id : '',
    name: '',
    phone: '',
    pickup: '',
    dropoff: '',
    date: '',
    tripType: 'oneway',
    budget: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  const getMailtoLink = (booking: Booking) => {
    const subject = encodeURIComponent(`New Booking Request: ${booking.carName} - ${booking.customerName}`);
    const bodyText = `
Hello,

I would like to book a car from Dhaka Wheels.

--- Booking Details ---
Car: ${booking.carName}
Customer Name: ${booking.customerName}
Phone: ${booking.phone}
Date: ${booking.date}
Trip Type: ${booking.tripType}
Budget: ${booking.budget} BDT

From: ${booking.pickup}
To: ${booking.dropoff}

Please confirm my booking.
    `;
    const body = encodeURIComponent(bodyText);
    return `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const car = cars.find(c => c.id === formData.carId);
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      carName: car ? car.name : 'Unknown Car',
      customerName: formData.name,
      phone: formData.phone,
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      tripType: formData.tripType as any,
      date: formData.date,
      budget: formData.budget,
      status: 'Pending'
    };

    onBookingSubmit(newBooking);
    setLastBooking(newBooking);

    // Try to submit to Google Sheet if URL is configured
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Essential for GAS
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBooking)
        });
        // We assume success if no network error thrown (no-cors limits response visibility)
      } catch (error) {
        console.error("Booking submission error", error);
        // Fallback or just log, user will see success screen regardless and can use mailto
      }
    }

    setIsProcessing(false);
    setSubmitted(true);
    
    // If NO script URL is present, fallback to auto-opening mail
    if (!scriptUrl) {
       setTimeout(() => {
          window.location.href = getMailtoLink(newBooking);
      }, 500);
    }
  };

  if (submitted && lastBooking) {
    const mailLink = getMailtoLink(lastBooking);
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-check text-3xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.successMsg}</h2>
          <p className="text-gray-600 mb-6 text-sm">{t.successSub}</p>
          
          <div className="mb-6 p-4 bg-gray-50 rounded text-left text-xs text-gray-500 border border-gray-200">
             <p className="font-bold mb-1">{scriptUrl ? t.manualMail : t.manualMail}</p>
             <a 
               href={mailLink}
               className="text-primary font-bold underline mt-1 block"
               target="_blank"
             >
                {t.manualMailBtn}
             </a>
          </div>

          <button 
            onClick={() => setSubmitted(false)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition transform hover:scale-105"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
          
          {/* Summary / Image Side */}
          <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <i className="fa-solid fa-car absolute -right-4 -bottom-4 text-9xl"></i>
            </div>

            <h2 className="text-3xl font-bold mb-6 relative z-10">{t.bookingTitle}</h2>
            <p className="opacity-90 mb-8 text-sm leading-relaxed relative z-10">
              Complete the form to request a ride. Our team will review your request and confirm availability instantly.
            </p>
            {formData.carId && (
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm relative z-10 border border-white/20">
                <span className="text-xs uppercase tracking-wider opacity-70">Selected Car</span>
                <p className="text-xl font-bold mt-1">
                  {cars.find(c => c.id === formData.carId)?.name || 'Car not found'}
                </p>
                <img 
                  src={cars.find(c => c.id === formData.carId)?.image} 
                  alt="selected" 
                  className="mt-4 rounded w-full h-32 object-cover bg-white"
                />
              </div>
            )}
          </div>

          {/* Form Side */}
          <div className="md:w-2/3 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectCar}</label>
                  <select 
                    required
                    value={formData.carId}
                    onChange={(e) => setFormData({...formData, carId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  >
                    <option value="">-- {t.selectCar} --</option>
                    {cars.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.pricePerDay})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.budget}</label>
                  <input 
                    type="number"
                    required
                    placeholder="e.g. 5000"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.pickup}</label>
                  <input 
                    type="text"
                    required
                    placeholder="Area, Road, House"
                    value={formData.pickup}
                    onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.dropoff}</label>
                  <input 
                    type="text"
                    required
                    placeholder="Destination"
                    value={formData.dropoff}
                    onChange={(e) => setFormData({...formData, dropoff: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.date}</label>
                  <input 
                    type="datetime-local"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.tripType}</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                      <input 
                        type="radio" 
                        name="tripType" 
                        value="oneway"
                        checked={formData.tripType === 'oneway'}
                        onChange={(e) => setFormData({...formData, tripType: e.target.value})}
                        className="text-primary focus:ring-primary mr-2"
                      />
                      <span className="text-sm">{t.oneWay}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                      <input 
                        type="radio" 
                        name="tripType" 
                        value="roundtrip"
                        checked={formData.tripType === 'roundtrip'}
                        onChange={(e) => setFormData({...formData, tripType: e.target.value})}
                        className="text-primary focus:ring-primary mr-2"
                      />
                      <span className="text-sm">{t.roundTrip}</span>
                    </label>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-red-700 transition transform hover:-translate-y-1 active:translate-y-0 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> {t.processing}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i> {t.submitBooking}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Panel ---
const AdminPanel = ({ t, isAuthenticated, onLogin, cars, setCars, bookings, scriptUrl, setScriptUrl }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingCar, setEditingCar] = useState<Car | null>(null); // If null, we are adding mode
  const [showCarForm, setShowCarForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  const [tempScriptUrl, setTempScriptUrl] = useState(scriptUrl);
  const [saveMsg, setSaveMsg] = useState('');

  // Car Form State
  const [carForm, setCarForm] = useState<Partial<Car>>({});

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin(true);
      setError('');
    } else {
      setError('Invalid Password');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this car?')) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setCarForm(car);
    setShowCarForm(true);
  };

  const handleAddNew = () => {
    setEditingCar(null);
    setCarForm({});
    setShowCarForm(true);
  };

  const handleSaveCar = (e) => {
    e.preventDefault();
    if (editingCar) {
      // Edit
      setCars(cars.map(c => c.id === editingCar.id ? { ...c, ...carForm } as Car : c));
    } else {
      // Add
      const newCar = { ...carForm, id: Date.now().toString() } as Car;
      setCars([...cars, newCar]);
    }
    setShowCarForm(false);
  };

  const handleSaveSettings = () => {
    setScriptUrl(tempScriptUrl);
    setSaveMsg(t.settingsSaved);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">{t.admin}</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.password}</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none transition"
                placeholder="Enter 01628"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-blue-800 transition transform hover:scale-105">
              {t.login}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-800">{t.dashboard}</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => onLogin(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition shadow-md"
          >
            {t.logout}
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex mb-8 border-b">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-3 font-bold ${activeTab === 'dashboard' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t.dashboard}
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-bold ${activeTab === 'settings' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t.settings}
        </button>
      </div>

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl animate-fade-in-up">
          <h3 className="text-xl font-bold mb-4">{t.settings}</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.scriptUrlLabel}</label>
            <input 
              type="text"
              value={tempScriptUrl}
              onChange={(e) => setTempScriptUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
              placeholder={t.scriptUrlPlaceholder}
            />
            <p className="text-xs text-gray-500 mt-2">Paste the Web App URL from your Google Apps Script deployment here.</p>
          </div>
          <button 
            onClick={handleSaveSettings}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            {t.save}
          </button>
          {saveMsg && <span className="ml-4 text-green-600 font-medium">{saveMsg}</span>}
        </div>
      )}

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <>
          <div className="flex justify-end mb-6">
             <button 
                onClick={handleAddNew}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <i className="fa-solid fa-plus"></i> {t.addCar}
              </button>
          </div>

          {/* Car Form Modal/Inline */}
          {showCarForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto animate-fade-in-up">
                <h3 className="text-xl font-bold mb-4">{editingCar ? t.edit : t.addCar}</h3>
                <form onSubmit={handleSaveCar} className="space-y-4">
                  <input 
                    placeholder={t.carName}
                    value={carForm.name || ''}
                    onChange={e => setCarForm({...carForm, name: e.target.value})}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <input 
                    placeholder={t.imageURL}
                    value={carForm.image || ''}
                    onChange={e => setCarForm({...carForm, image: e.target.value})}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <input 
                    placeholder={t.category}
                    value={carForm.category || ''}
                    onChange={e => setCarForm({...carForm, category: e.target.value})}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <input 
                    placeholder={t.seats}
                    type="number"
                    value={carForm.seats || ''}
                    onChange={e => setCarForm({...carForm, seats: parseInt(e.target.value)})}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <input 
                    placeholder={t.price}
                    value={carForm.pricePerDay || ''}
                    onChange={e => setCarForm({...carForm, pricePerDay: e.target.value})}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <textarea 
                    placeholder={t.desc}
                    value={carForm.description || ''}
                    onChange={e => setCarForm({...carForm, description: e.target.value})}
                    className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-primary text-white py-2 rounded hover:bg-blue-800 transition">{t.save}</button>
                    <button type="button" onClick={() => setShowCarForm(false)} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">{t.cancel}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Bookings List */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">{t.recentBookings}</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {bookings.length === 0 ? (
                <p className="p-6 text-gray-500 text-center">{t.noBookings}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-4 font-semibold text-gray-600">Date</th>
                        <th className="p-4 font-semibold text-gray-600">Customer</th>
                        <th className="p-4 font-semibold text-gray-600">Car</th>
                        <th className="p-4 font-semibold text-gray-600">Route</th>
                        <th className="p-4 font-semibold text-gray-600">Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 text-sm">{new Date(b.date).toLocaleString()}</td>
                          <td className="p-4">
                            <div className="font-medium">{b.customerName}</div>
                            <div className="text-xs text-gray-500">{b.phone}</div>
                          </td>
                          <td className="p-4">{b.carName}</td>
                          <td className="p-4 text-sm">
                            <span className="block font-medium text-xs text-gray-500 uppercase">{b.tripType}</span>
                            {b.pickup} <i className="fa-solid fa-arrow-right mx-1 text-xs"></i> {b.dropoff}
                          </td>
                          <td className="p-4 font-medium text-green-600">{b.budget}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Car Management List */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map(car => (
                <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden relative group hover:shadow-xl transition-all duration-300">
                  <img src={car.image} alt={car.name} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{car.name}</h3>
                    <p className="text-gray-500 text-sm">{car.pricePerDay}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => handleEdit(car)}
                        className="flex-1 bg-blue-100 text-blue-600 py-2 rounded hover:bg-blue-200 transition text-sm font-medium"
                      >
                        {t.edit}
                      </button>
                      <button 
                        onClick={() => handleDelete(car.id)}
                        className="flex-1 bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition text-sm font-medium"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
};

// --- Reusable Car Card ---
interface CarCardProps {
  car: Car;
  t: any;
  onBook: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, t, onBook }) => (
  <div className="car-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col h-full border border-gray-100 group">
    <div className="h-48 overflow-hidden bg-gray-100 relative">
      <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 m-2 rounded-full shadow-lg">
        {car.category}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{car.name}</h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{car.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
        <span className="flex items-center gap-1"><i className="fa-solid fa-users text-accent"></i> {car.seats} {t.seats}</span>
        <span className="flex items-center gap-1"><i className="fa-solid fa-tag text-accent"></i> {car.pricePerDay}</span>
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => onBook(car)}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-md flex justify-center items-center gap-2 group/btn"
        >
          {t.bookNow} <i className="fa-solid fa-chevron-right text-xs transition-transform group-hover/btn:translate-x-1"></i>
        </button>
      </div>
    </div>
  </div>
);

// --- Footer ---
const Footer = ({ t }) => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-white border-b-2 border-secondary inline-block pb-1">Dhaka Wheels</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Providing the best car rental experience in Dhaka, Bangladesh. Safe, reliable, and premium vehicles for all your travel needs.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
          <p className="text-gray-400 text-sm mb-3 flex items-center hover:text-white transition-colors"><i className="fa-solid fa-phone mr-3 text-secondary"></i> +880 1XXX XXXXXX</p>
          <p className="text-gray-400 text-sm mb-3 flex items-center hover:text-white transition-colors"><i className="fa-solid fa-envelope mr-3 text-secondary"></i> info@dhakawheels.com</p>
          <p className="text-gray-400 text-sm flex items-center hover:text-white transition-colors"><i className="fa-solid fa-location-dot mr-3 text-secondary"></i> Gulshan 1, Dhaka, Bangladesh</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition duration-300 transform hover:-translate-y-1">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition duration-300 transform hover:-translate-y-1">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition duration-300 transform hover:-translate-y-1">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        {t.footerText}
      </div>
    </div>
  </footer>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);