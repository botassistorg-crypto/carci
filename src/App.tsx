import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CarProvider } from './context/CarContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CarShowcase from './components/CarShowcase';
import AdminDashboard from './components/AdminDashboard';

type ViewState = 'home' | 'new' | 'used' | 'rentals' | 'admin';

export function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleSetView = useCallback((view: string) => {
    setCurrentView(view as ViewState);
    // Scroll to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle browser back button (optional enhancement)
  useEffect(() => {
    const handlePopState = () => {
      // Reset to home on back button
      setCurrentView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <LandingPage key="home" setCurrentView={handleSetView} />;
      case 'new':
        return <CarShowcase key="new" category="new" setCurrentView={handleSetView} />;
      case 'used':
        return <CarShowcase key="used" category="used" setCurrentView={handleSetView} />;
      case 'rentals':
        return <CarShowcase key="rentals" category="rentals" setCurrentView={handleSetView} />;
      case 'admin':
        return <AdminDashboard key="admin" setCurrentView={handleSetView} />;
      default:
        return <LandingPage key="home-default" setCurrentView={handleSetView} />;
    }
  };

  return (
    <CarProvider>
      <div className="min-h-screen bg-[#0c0c0e] text-white font-manrope">
        {/* Navbar - Always visible except on admin */}
        {currentView !== 'admin' && (
          <Navbar currentView={currentView} setCurrentView={handleSetView} />
        )}
        
        {/* Main Content with Page Transitions */}
        <main>
          <AnimatePresence mode="wait">
            {renderView()}
          </AnimatePresence>
        </main>
      </div>
    </CarProvider>
  );
}
