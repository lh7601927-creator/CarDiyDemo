import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden shadow-lg h-64 select-none touch-none bg-gray-200">
      {/* Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-col-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
      >
        {/* After Image (Background - Clean) */}
        <div className="absolute inset-0 w-full h-full">
            <img 
                src="https://picsum.photos/id/111/800/600" 
                alt="Clean Car" 
                className="w-full h-full object-cover"
                draggable={false}
            />
             <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">
                AFTER
            </div>
        </div>

        {/* Before Image (Foreground - Dirty) */}
        <div 
            className="absolute inset-0 h-full overflow-hidden border-r-2 border-white/50"
            style={{ width: `${sliderPosition}%` }}
        >
            <img 
                src="https://picsum.photos/id/111/800/600" 
                alt="Dirty Car" 
                className="w-full h-full object-cover max-w-none filter sepia-[.6] brightness-[0.8] contrast-[1.2] blur-[1px]"
                // We fake the "dirty" look using CSS filters on the same image for perfect alignment
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
                draggable={false}
            />
            <div className="absolute top-4 left-4 bg-white/50 backdrop-blur text-gray-900 text-xs font-bold px-2 py-1 rounded">
                BEFORE
            </div>
        </div>

        {/* Slider Handle */}
        <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            style={{ left: `${sliderPosition}%` }}
        >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg -ml-3.5 text-blue-600">
                <ChevronsLeftRight size={16} />
            </div>
        </div>
      </div>
    </div>
  );
};