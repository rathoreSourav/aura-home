import React from 'react';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  name: string;
  deviceCount: number;
  activeCount: number;
  gradient: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function RoomCard({ name, deviceCount, activeCount, gradient, icon, onClick }: RoomCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "room-card text-left w-full group",
        gradient
      )}
    >
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
        {icon}
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-5 h-5 text-white">
            {icon}
          </div>
        </div>
        
        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-white/70 text-sm mt-1">
            {activeCount} of {deviceCount} on
          </p>
        </div>
      </div>
    </button>
  );
}
