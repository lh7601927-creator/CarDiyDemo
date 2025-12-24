import React from 'react';
import { Technician } from '../types';
import { Star } from 'lucide-react';

interface TechnicianSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const technicians: Technician[] = [
  { id: '1', name: '王师傅', rating: 5.0, specialty: '精洗达人', avatar: 'https://picsum.photos/id/64/100/100' },
  { id: '2', name: 'Mike', rating: 4.9, specialty: '改装专家', avatar: 'https://picsum.photos/id/91/100/100' },
  { id: '3', name: '李工', rating: 4.8, specialty: '极速快修', avatar: 'https://picsum.photos/id/177/100/100' },
];

export const TechnicianSelector: React.FC<TechnicianSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {technicians.map((tech) => {
        const isSelected = selectedId === tech.id;
        return (
          <div 
            key={tech.id}
            onClick={() => onSelect(tech.id)}
            className={`cursor-pointer flex flex-col items-center p-3 rounded-2xl border transition-all duration-200 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <div className={`relative w-14 h-14 rounded-full mb-2 p-[2px] ${isSelected ? 'bg-blue-500' : 'bg-transparent'}`}>
                <img 
                    src={tech.avatar} 
                    alt={tech.name} 
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                />
                {tech.rating === 5.0 && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white shadow-sm border border-white">
                        金牌
                    </div>
                )}
            </div>
            <div className="text-sm font-bold text-gray-900">{tech.name}</div>
            <div className="flex items-center text-xs text-yellow-500 mb-1">
                <Star size={10} fill="currentColor" />
                <span className="ml-0.5">{tech.rating}</span>
            </div>
            <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {tech.specialty}
            </div>
          </div>
        );
      })}
    </div>
  );
};