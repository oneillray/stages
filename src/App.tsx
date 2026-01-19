import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Tab } from './types';
import BottomNavigation from './components/BottomNavigation';
import Settings from './components/Settings';
import HeartRate from './components/HeartRate';
import Power from './components/Power';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('settings');

  const renderTab = () => {
    switch (activeTab) {
      case 'settings':
        return <Settings key="settings" />;
      case 'heart':
        return <HeartRate key="heart" />;
      case 'power':
        return <Power key="power" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <main className="h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
