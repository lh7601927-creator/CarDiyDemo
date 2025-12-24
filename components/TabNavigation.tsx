import React from 'react';
import { Home, PaintBucket, Calendar, User } from 'lucide-react';
import { Tab } from '../types';

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isDarkMode: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, isDarkMode }) => {
  const getTabClass = (tab: Tab) => {
    const isActive = activeTab === tab;
    if (isDarkMode) {
      return isActive ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300';
    }
    return isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600';
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 px-6 py-4 pb-6 flex justify-between items-center transition-colors duration-500 z-50 ${isDarkMode ? 'bg-slate-900/90 border-t border-slate-800' : 'bg-white/90 border-t border-gray-100'} backdrop-blur-md`}>
      <button 
        onClick={() => setActiveTab(Tab.HOME)} 
        className={`flex flex-col items-center gap-1 transition-transform active:scale-95 ${getTabClass(Tab.HOME)}`}
      >
        <Home size={24} strokeWidth={activeTab === Tab.HOME ? 2.5 : 2} />
        <span className="text-[10px] font-medium">首页</span>
      </button>

      <button 
        onClick={() => setActiveTab(Tab.VISUALIZER)} 
        className={`flex flex-col items-center gap-1 transition-transform active:scale-95 ${getTabClass(Tab.VISUALIZER)}`}
      >
        <PaintBucket size={24} strokeWidth={activeTab === Tab.VISUALIZER ? 2.5 : 2} />
        <span className="text-[10px] font-medium">实验室</span>
      </button>

      <button 
        onClick={() => setActiveTab(Tab.BOOKING)} 
        className={`flex flex-col items-center gap-1 transition-transform active:scale-95 ${getTabClass(Tab.BOOKING)}`}
      >
        <Calendar size={24} strokeWidth={activeTab === Tab.BOOKING ? 2.5 : 2} />
        <span className="text-[10px] font-medium">预约</span>
      </button>

      <button 
        onClick={() => setActiveTab(Tab.PROFILE)} 
        className={`flex flex-col items-center gap-1 transition-transform active:scale-95 ${getTabClass(Tab.PROFILE)}`}
      >
        <User size={24} strokeWidth={activeTab === Tab.PROFILE ? 2.5 : 2} />
        <span className="text-[10px] font-medium">我的</span>
      </button>
    </div>
  );
};