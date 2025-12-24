import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls, RoundedBox } from '@react-three/drei';
import { CarConfig } from '../types';
import { Zap, Palette } from 'lucide-react';

interface CarVisualizerProps {
  config: CarConfig;
  setConfig: (config: CarConfig) => void;
  onBook: () => void;
}

// --- Wheel Component ---
const Wheel = ({ position, isLeft, config }: { position: [number, number, number], isLeft: boolean, config: CarConfig }) => {
    const rimColor = config.rims === 'sport' ? '#1f2937' : '#e5e7eb';
    const isSport = config.rims === 'sport';
    
    return (
        <group position={position}>
            <group rotation={[0, 0, Math.PI / 2]}>
                {/* Tire Base */}
                <mesh>
                    <cylinderGeometry args={[0.38, 0.38, 0.34, 32]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
                </mesh>
                
                {/* Tire Treads */}
                {[-0.1, -0.03, 0.04, 0.11].map((x, i) => (
                    <mesh key={i} position={[0, x, 0]} rotation={[Math.PI/2, 0, 0]}>
                        <torusGeometry args={[0.38, 0.02, 16, 48]} />
                        <meshStandardMaterial color="#151515" roughness={1.0} />
                    </mesh>
                ))}

                {/* Rim Group */}
                <group position={[0, isLeft ? 0.08 : -0.08, 0]} rotation={[isLeft ? 0 : Math.PI, 0, 0]}>
                    <mesh position={[0, -0.04, 0]}>
                        <cylinderGeometry args={[0.29, 0.29, 0.12, 32]} />
                        <meshStandardMaterial color={rimColor} metalness={0.7} roughness={0.2} />
                    </mesh>

                    <group position={[0, 0.02, 0]} rotation={[Math.PI/2, 0, 0]}>
                        <mesh position={[0, 0, -0.01]}>
                             <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} rotation={[Math.PI/2, 0, 0]} />
                             <meshStandardMaterial color={rimColor} metalness={0.7} roughness={0.2} />
                        </mesh>

                        {isSport ? (
                            Array.from({ length: 10 }).map((_, i) => (
                                <group key={i} rotation={[0, 0, (i / 10) * Math.PI * 2]}>
                                    <mesh position={[0, 0.14, 0]} rotation={[0, 0.2, 0]}>
                                        <boxGeometry args={[0.035, 0.28, 0.015]} />
                                        <meshStandardMaterial color={rimColor} metalness={0.7} roughness={0.2} />
                                    </mesh>
                                </group>
                            ))
                        ) : (
                            Array.from({ length: 7 }).map((_, i) => (
                                <group key={i} rotation={[0, 0, (i / 7) * Math.PI * 2]}>
                                    <mesh position={[0, 0.14, 0]}>
                                        <boxGeometry args={[0.08, 0.26, 0.02]} />
                                        <meshStandardMaterial color={rimColor} metalness={0.7} roughness={0.2} />
                                    </mesh>
                                </group>
                            ))
                        )}

                        {Array.from({ length: 5 }).map((_, i) => {
                            const angle = (i / 5) * Math.PI * 2;
                            return (
                                <mesh key={i} position={[Math.cos(angle)*0.05, Math.sin(angle)*0.05, 0.02]} rotation={[Math.PI/2, 0, 0]}>
                                    <cylinderGeometry args={[0.008, 0.008, 0.02, 8]} />
                                    <meshStandardMaterial color="#666" metalness={1} />
                                </mesh>
                            );
                        })}

                        <mesh position={[0, 0, 0.025]}>
                            <circleGeometry args={[0.035, 32]} />
                            <meshStandardMaterial color="#111" />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
};

// --- Car Model Component ---
const CarModel = ({ config }: { config: CarConfig }) => {
    const width = 1.9;
    const length = 4.4;
    const chassisHeight = 0.65;
    const cabinHeight = 0.7;
    const wheelZ = 1.4;
    const wheelX = 0.88;
    const wheelY = 0.35;

    return (
        <group rotation={[0, -Math.PI / 4, 0]}>
            {/* Chassis */}
            <RoundedBox 
                args={[width, chassisHeight, length]} 
                radius={0.15} 
                smooth={4} 
                position={[0, chassisHeight / 2 + 0.2, 0]} 
                castShadow 
                receiveShadow
            >
                <meshPhysicalMaterial 
                    color={config.color} 
                    metalness={0.6} 
                    roughness={0.2} 
                    clearcoat={1} 
                    clearcoatRoughness={0.1}
                />
            </RoundedBox>

            {/* Cabin */}
            <RoundedBox 
                args={[width * 0.85, cabinHeight, length * 0.6]} 
                radius={0.25} 
                smooth={4} 
                position={[0, chassisHeight + cabinHeight / 2 + 0.1, -0.2]}
            >
                <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.0} />
            </RoundedBox>

            {/* Headlights */}
            <mesh position={[0.6, chassisHeight + 0.2, length / 2 - 0.05]} rotation={[0, 0.1, 0]}>
                <boxGeometry args={[0.5, 0.05, 0.1]} />
                <meshStandardMaterial color="#e0e7ff" emissive="#e0e7ff" emissiveIntensity={3} toneMapped={false} />
            </mesh>
            <mesh position={[-0.6, chassisHeight + 0.2, length / 2 - 0.05]} rotation={[0, -0.1, 0]}>
                <boxGeometry args={[0.5, 0.05, 0.1]} />
                <meshStandardMaterial color="#e0e7ff" emissive="#e0e7ff" emissiveIntensity={3} toneMapped={false} />
            </mesh>

            {/* Taillights */}
            <mesh position={[0, chassisHeight + 0.25, -length / 2 + 0.05]}>
                <boxGeometry args={[width - 0.2, 0.04, 0.1]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
            </mesh>

            {/* Wheels */}
            {[
                { pos: [wheelX, wheelY, wheelZ], isLeft: true },
                { pos: [-wheelX, wheelY, wheelZ], isLeft: false },
                { pos: [wheelX, wheelY, -wheelZ], isLeft: true },
                { pos: [-wheelX, wheelY, -wheelZ], isLeft: false }
            ].map((wheel, i) => (
                <Wheel 
                    key={i} 
                    position={wheel.pos as [number, number, number]} 
                    isLeft={wheel.isLeft} 
                    config={config} 
                />
            ))}
        </group>
    );
};

// --- Main Visualizer Component ---
export const CarVisualizer: React.FC<CarVisualizerProps> = ({ config, setConfig, onBook }) => {
  const customColorInputRef = useRef<HTMLInputElement>(null);

  const prices: { base: number, colors: Record<string, { price: number, name: string }>, rims: Record<string, { price: number, name: string }> } = {
    base: 263900,
    colors: {
        '#d1d5db': { price: 0, name: '冷光银' },
        '#f8fafc': { price: 8000, name: '珍珠白' },
        '#1e3a8a': { price: 8000, name: '深海蓝' },
        '#b91c1c': { price: 12000, name: '烈焰红' },
        '#18181b': { price: 12000, name: '哑光黑' }
    },
    rims: {
        'standard': { price: 0, name: '双子星' },
        'sport': { price: 8000, name: '感应涡轮' }
    }
  };

  const isStandardColor = Object.keys(prices.colors).includes(config.color);
  
  useEffect(() => {
    let colorPrice = 0;
    if (isStandardColor) {
        colorPrice = prices.colors[config.color].price;
    } else {
        colorPrice = 15000;
    }

    const rimPrice = config.rims === 'sport' ? prices.rims.sport.price : prices.rims.standard.price;
    const total = prices.base + colorPrice + rimPrice;
    
    if (total !== config.price) {
      setConfig({ ...config, price: total });
    }
  }, [config.color, config.rims, isStandardColor, setConfig, config.price]);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfig({ ...config, color: e.target.value });
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      
      {/* 3D Canvas Area - Improved Background Visibility */}
      <div className="relative flex-1 w-full bg-gradient-to-b from-gray-100 to-gray-200 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-700 dark:via-slate-900 dark:to-black">
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 35, position: [8, 3, 8] }}>
            {/* Brighter Lights for better visibility */}
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -5, -10]} intensity={1} />
            
            <PresentationControls 
                speed={1.5} 
                global 
                zoom={0.8} 
                polar={[-0.1, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
                {/* environment={null} prevents external HDR fetch which causes errors */}
                <Stage environment={null} intensity={2} contactShadow={{ resolution: 1024, scale: 20, blur: 2, opacity: 0.4, color: '#000000' }}>
                     <CarModel config={config} />
                </Stage>
            </PresentationControls>
        </Canvas>

        {/* Top Overlay */}
        <div className="absolute top-8 left-0 right-0 text-center pointer-events-none">
            <h1 className="text-xl font-medium tracking-[0.2em] uppercase text-gray-500 dark:text-slate-400 drop-shadow-md">Model Y</h1>
            <div className="text-xs font-bold text-gray-900 dark:text-white mt-1 drop-shadow-md">高性能版</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-900 px-6 pt-5 pb-24 relative z-10 transition-colors duration-500 shadow-[0_-5px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-5px_30px_rgba(0,0,0,0.5)] rounded-t-3xl -mt-6">
        
        {/* Controls Row */}
        <div className="flex justify-between items-center mb-6">
            
            {/* Paint Selector */}
            <div className="flex items-center gap-3">
                {Object.entries(prices.colors).map(([color, info]) => (
                    <button
                        key={color}
                        onClick={() => setConfig({...config, color})}
                        className={`w-7 h-7 rounded-full shadow-md transition-all duration-300 relative ${config.color === color ? 'scale-125 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                        style={{ backgroundColor: color }}
                        aria-label={info.name}
                    />
                ))}
                
                {/* DIY Color Button */}
                <div className="relative">
                    <button
                        onClick={() => customColorInputRef.current?.click()}
                        className={`w-7 h-7 rounded-full shadow-md transition-all duration-300 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 ${!isStandardColor ? 'scale-125 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : 'hover:scale-110 opacity-80 hover:opacity-100'}`}
                        title="自定义颜色 (DIY)"
                    >
                         <Palette size={12} className="text-white" />
                    </button>
                    <input 
                        ref={customColorInputRef}
                        type="color" 
                        className="absolute opacity-0 inset-0 w-0 h-0" 
                        onChange={handleCustomColorChange}
                    />
                </div>
            </div>

            {/* Wheels Toggle */}
            <div className="flex bg-gray-100 dark:bg-slate-800 p-0.5 rounded-full">
                <button 
                    onClick={() => setConfig({...config, rims: 'standard'})}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap ${config.rims === 'standard' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                    双子星
                </button>
                <button 
                    onClick={() => setConfig({...config, rims: 'sport'})}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap ${config.rims === 'sport' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                    感应涡轮
                </button>
            </div>

        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
            <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5 flex items-center gap-2">
                        预估总价
                        {!isStandardColor && <span className="text-[10px] text-yellow-500 bg-yellow-500/10 px-1 rounded">定制色</span>}
                    </div>
                    <div className="text-2xl font-light tracking-tight text-gray-900 dark:text-white">
                    ¥{config.price.toLocaleString()}
                    </div>
            </div>
            <button 
                onClick={onBook}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center gap-2 text-sm"
            >
                立即预订
                <Zap size={14} fill="currentColor" />
            </button>
        </div>

      </div>
    </div>
  );
};