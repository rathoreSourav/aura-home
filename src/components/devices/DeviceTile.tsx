import React from 'react';
import { cn } from '@/lib/utils';
import { Power } from 'lucide-react';

interface DeviceTileProps {
  name: string;
  room: string;
  icon: React.ReactNode;
  isActive: boolean;
  status?: string;
  accentColor?: string;
  onToggle: () => void;
  onClick?: () => void;
}

export function DeviceTile({
  name,
  room,
  icon,
  isActive,
  status,
  accentColor = 'text-primary',
  onToggle,
  onClick,
}: DeviceTileProps) {
  return (
    <div
      className={cn(
        "device-tile cursor-pointer",
        isActive && "device-tile-active"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
          isActive ? "bg-primary/10" : "bg-secondary"
        )}>
          <div className={cn(
            "w-6 h-6",
            isActive ? accentColor : "text-muted-foreground"
          )}>
            {icon}
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
            isActive 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          )}
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
      
      <div>
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{room}</p>
        {status && (
          <p className={cn(
            "text-xs font-medium mt-2",
            isActive ? accentColor : "text-muted-foreground"
          )}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
