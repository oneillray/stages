import { Settings, Heart, Zap } from 'lucide-react';
import type { Tab } from '../types';

interface BottomNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => onTabChange('settings')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'settings' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Settings className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Settings</span>
        </button>
        <button
          onClick={() => onTabChange('heart')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'heart' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Heart className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Heart</span>
        </button>
        <button
          onClick={() => onTabChange('power')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'power' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Zap className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Power</span>
        </button>
      </div>
    </nav>
  );
}
