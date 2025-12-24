import React, { useState, useEffect } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { CarVisualizer } from './components/CarVisualizer';
import { TechnicianSelector } from './components/TechnicianSelector';
import { Tab, CarConfig } from './types';
import { CloudSun, Droplets, MapPin, ChevronRight, Award, Zap, Timer, ArrowRight, Box } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// --- Home Component ---
const Home: React.FC<{ onNavigate: (tab: Tab) => void }> = ({ onNavigate }) => (
  <div className="space-y-8 pb-32 pt-6 px-6 animate-fade-in">
    {/* Header */}
    <header className="flex justify-between items-start">
        <div>
            <div className="text-gray-400 text-sm font-medium mb-1">下午好</div>
            <h1 className="text-2xl font-bold text-gray-900">Alex</h1>
        </div>
        <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                <CloudSun size={18} className="text-blue-500" />
                <span className="text-sm font-medium">24°C 晴</span>
             </div>
             <div className="text-xs text-green-600 font-medium mt-1">
                洗车指数：适宜
             </div>
        </div>
    </header>

    {/* Hero Cards */}
    <div className="grid grid-cols-2 gap-4 h-48">
        {/* Quick Wash Card */}
        <div 
            onClick={() => onNavigate(Tab.BOOKING)}
            className="cursor-pointer relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-5 flex flex-col justify-between group active:scale-[0.98] transition-transform shadow-sm border border-green-100/50"
        >
            <div className="z-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-green-600">
                    <Droplets size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">极速<br/>洗车</h2>
                <p className="text-xs text-gray-500 mt-1">15分钟立等可取</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
                <Droplets size={100} />
            </div>
            <div className="absolute top-4 right-4 animate-pulse">
                <div className="bg-green-500 w-2 h-2 rounded-full"></div>
            </div>
        </div>

        {/* 3D Visualizer Card */}
        <div 
            onClick={() => onNavigate(Tab.VISUALIZER)}
            className="cursor-pointer relative overflow-hidden bg-slate-900 rounded-3xl p-5 flex flex-col justify-between text-white active:scale-[0.98] transition-transform shadow-lg shadow-slate-200"
        >
             <div className="z-10">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-3 shadow-sm border border-slate-700">
                    <Box size={20} className="text-blue-400" />
                </div>
                <h2 className="text-lg font-bold leading-tight">3D<br/>实验室</h2>
                <p className="text-xs text-slate-400 mt-1">赛博改装体验</p>
            </div>
            <div className="absolute -right-2 -bottom-4 opacity-20 rotate-12 text-blue-500">
                <Zap size={100} />
            </div>
            <div className="absolute top-4 right-4 bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded text-white">NEW</div>
        </div>
    </div>

    {/* Trust Booster: Before/After */}
    <section>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-lg">焕然一新</h3>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">昨日服务 128 单</span>
        </div>
        <BeforeAfterSlider />
    </section>

    {/* Shop Status */}
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
             <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                <MapPin size={20} />
             </div>
             <div>
                <div className="text-sm font-bold text-gray-900">世纪公园旗舰店</div>
                <div className="text-xs text-gray-400 mt-0.5">距离 1.2km</div>
             </div>
        </div>
        <div className="text-right">
             <div className="text-xs text-gray-400">当前空闲</div>
             <div className="text-xl font-bold text-green-600">3 <span className="text-xs font-normal text-gray-400">工位</span></div>
        </div>
    </div>
  </div>
);

// --- Booking Component ---
interface BookingProps {
    customConfig: CarConfig;
}

const Booking: React.FC<BookingProps> = ({ customConfig }) => {
    const [step, setStep] = useState(1);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [isCustomBooking, setIsCustomBooking] = useState(false);

    // Detect if user has a non-default configuration
    useEffect(() => {
        if (customConfig.price > 250000 || customConfig.color !== '#d1d5db') {
            setIsCustomBooking(true);
        }
    }, [customConfig]);

    return (
        <div className="h-full flex flex-col pb-24 pt-6 px-6 animate-fade-in">
            <header className="mb-6 flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">预约服务</h1>
                {/* Progress Bar */}
                <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2 px-2">
                    <span className={step >= 1 ? 'text-blue-600' : ''}>选择服务</span>
                    <span className={step >= 2 ? 'text-blue-600' : ''}>确认时间</span>
                    <span className={step >= 3 ? 'text-blue-600' : ''}>完成</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pb-8">
                {/* 3D Lab Import Logic */}
                {isCustomBooking && (
                    <section className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg relative overflow-hidden flex-shrink-0">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <div className="text-xs font-bold text-blue-400 mb-1 flex items-center gap-1">
                                    <Zap size={12} />
                                    来自 3D 实验室
                                </div>
                                <div className="font-bold text-lg mb-1">专属改装方案</div>
                                <div className="text-xs text-slate-400">
                                    配色: {customConfig.color === '#d1d5db' ? '标准银' : '定制色'} 
                                    {' '}|{' '}
                                    轮毂: {customConfig.rims.toUpperCase()}
                                </div>
                            </div>
                            <div className="text-xl font-bold">¥{customConfig.price.toLocaleString()}</div>
                        </div>
                        <Zap size={80} className="absolute -right-4 -bottom-4 text-white/5 rotate-12" />
                    </section>
                )}

                {/* Service Selection */}
                <section>
                    <h3 className="font-bold text-gray-900 mb-4">推荐项目</h3>
                    <div className="space-y-3">
                        <div className={`flex items-center justify-between p-4 border rounded-2xl shadow-sm transition-all ${!isCustomBooking ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!isCustomBooking ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <Droplets size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">标准普洗</div>
                                    <div className="text-xs text-gray-500">外部清洗 + 内部吸尘</div>
                                </div>
                            </div>
                            <div className="font-bold text-lg text-blue-600">¥45</div>
                        </div>
                    </div>
                </section>

                {/* Technician Selection */}
                <section>
                    <h3 className="font-bold text-gray-900 mb-4">选择技师</h3>
                    <TechnicianSelector selectedId={selectedTech} onSelect={setSelectedTech} />
                </section>

                {/* Coupon Logic */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Award className="text-orange-500" size={18} />
                        <span className="text-sm font-bold text-orange-800">新人专享</span>
                    </div>
                    <span className="text-sm font-medium text-orange-600">- ¥50.00</span>
                </div>
            </div>

            <div className="pt-4 mt-auto border-t border-gray-100 flex-shrink-0 bg-white">
                <div className="flex justify-between items-end mb-4">
                    <div className="text-sm text-gray-500">预估总价</div>
                    <div className="text-2xl font-bold text-gray-900">
                        {isCustomBooking ? `¥${(customConfig.price - 50).toLocaleString()}` : '¥25.00'}
                    </div>
                </div>
                <button 
                    onClick={() => setStep(prev => Math.min(prev + 1, 3))}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    {step === 3 ? '预约成功' : '立即支付'}
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}

// --- Profile Component (Unchanged mostly) ---
const Profile: React.FC = () => {
    const data = [
        { name: 'Wash', value: 12, color: '#3b82f6' },
        { name: 'Mod', value: 3, color: '#10b981' },
        { name: 'Repair', value: 1, color: '#f59e0b' },
    ];
    return (
        <div className="pb-32 pt-6 px-6 animate-fade-in">
             <header className="flex items-center gap-4 mb-8">
                <img src="https://picsum.photos/id/1011/100/100" className="w-16 h-16 rounded-full border-2 border-white shadow-md" alt="Avatar" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Alex Chen</h1>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Award size={14} className="text-yellow-500" />
                        护车达人 Lv.3
                    </div>
                </div>
            </header>
            {/* Garage */}
            <section className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    我的车库
                    <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 rounded">2</span>
                </h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    <div className="min-w-[160px] bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
                        <img src="https://picsum.photos/id/111/200/120" className="w-full h-24 object-cover rounded-xl mb-3" alt="Car 1" />
                        <div className="font-bold text-sm">Tesla Model 3</div>
                        <div className="text-xs text-gray-400">沪A 88888</div>
                    </div>
                    <div className="min-w-[160px] bg-gray-50 rounded-2xl p-3 border border-gray-100 flex items-center justify-center flex-col text-gray-400 border-dashed">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                            <span className="text-2xl">+</span>
                        </div>
                        <div className="text-xs">添加爱车</div>
                    </div>
                </div>
            </section>
            {/* Badges & Stats */}
            <section className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">服务分布</h4>
                    <div className="h-24 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} innerRadius={25} outerRadius={35} paddingAngle={5} dataKey="value">
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-xl font-bold text-gray-900">16</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                     <div className="bg-yellow-50 p-3 rounded-2xl flex items-center gap-3 border border-yellow-100">
                        <div className="bg-white p-2 rounded-full shadow-sm text-yellow-500">
                            <Award size={18} />
                        </div>
                        <div>
                            <div className="text-xs text-yellow-800 font-bold">改装先锋</div>
                            <div className="text-[10px] text-yellow-600">已解锁</div>
                        </div>
                     </div>
                </div>
            </section>
        </div>
    );
}

// --- Main App Shell ---
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Shared State for O2O loop
  const [carConfig, setCarConfig] = useState<CarConfig>({
      color: '#d1d5db',
      rims: 'standard',
      tint: 0,
      price: 263900
  });

  useEffect(() => {
    if (activeTab === Tab.VISUALIZER) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, [activeTab]);

  return (
    // Use h-[100dvh] to perfectly fit the mobile viewport without scrolling the whole page
    <div className={`h-[100dvh] w-screen overflow-hidden transition-colors duration-700 ease-in-out font-sans flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Content Area - Flex Grow to fill available space above tab bar */}
      <main className="flex-1 w-full max-w-md mx-auto relative overflow-hidden flex flex-col">
        {/* Scrollable Container for standard tabs, Fixed for Visualizer */}
        <div className={`flex-1 w-full flex flex-col ${activeTab === Tab.VISUALIZER ? 'overflow-hidden h-full' : 'overflow-y-auto no-scrollbar'}`}>
            {activeTab === Tab.HOME && <Home onNavigate={setActiveTab} />}
            {activeTab === Tab.VISUALIZER && (
                <CarVisualizer 
                    config={carConfig} 
                    setConfig={setCarConfig} 
                    onBook={() => setActiveTab(Tab.BOOKING)}
                />
            )}
            {activeTab === Tab.BOOKING && <Booking customConfig={carConfig} />}
            {activeTab === Tab.PROFILE && <Profile />}
        </div>
      </main>

      {/* Navigation - Fixed at bottom */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
    </div>
  );
}