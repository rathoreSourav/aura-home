import React from 'react';
import { X, Thermometer, Minus, Plus, Wind, Droplets, Snowflake, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThermostatControlProps {
  device: {
    id: string;
    name: string;
    room: string;
    temperature: number;
    targetTemp: number;
    humidity: number;
    mode: 'heat' | 'cool' | 'auto' | 'off';
    isOn: boolean;
  };
  onClose: () => void;
  onTempChange: (temp: number) => void;
  onModeChange: (mode: 'heat' | 'cool' | 'auto' | 'off') => void;
}

const modes = [
  { id: 'heat', icon: Flame, label: 'Heat', color: 'text-home-warm' },
  { id: 'cool', icon: Snowflake, label: 'Cool', color: 'text-home-cool' },
  { id: 'auto', icon: Wind, label: 'Auto', color: 'text-home-success' },
];

export function ThermostatControl({
  device,
  onClose,
  onTempChange,
  onModeChange,
}: ThermostatControlProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[2rem] p-6 pb-10 animate-slide-up shadow-large">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center",
              device.mode === 'heat' ? "bg-home-warm/10" : device.mode === 'cool' ? "bg-home-cool/10" : "bg-secondary"
            )}>
              <Thermometer className={cn(
                "w-6 h-6",
                device.mode === 'heat' ? "text-home-warm" : device.mode === 'cool' ? "text-home-cool" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{device.name}</h2>
              <p className="text-sm text-muted-foreground">{device.room}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Current Temperature Display */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-home-cool" />
            <span className="text-sm text-muted-foreground">{device.humidity}% Humidity</span>
          </div>
          <p className="text-sm text-muted-foreground">Current</p>
          <p className="text-4xl font-light text-foreground">{device.temperature}°F</p>
        </div>

        {/* Target Temperature Control */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <Button
            variant="icon"
            size="iconXl"
            onClick={() => onTempChange(device.targetTemp - 1)}
          >
            <Minus className="w-6 h-6" />
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Set to</p>
            <p className="text-6xl font-light text-foreground">{device.targetTemp}°</p>
          </div>
          
          <Button
            variant="icon"
            size="iconXl"
            onClick={() => onTempChange(device.targetTemp + 1)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-3 gap-3">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = device.mode === mode.id;
            
            return (
              <Button
                key={mode.id}
                variant={isActive ? "deviceActive" : "device"}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => onModeChange(mode.id as 'heat' | 'cool' | 'auto')}
              >
                <Icon className={cn("w-6 h-6", isActive ? mode.color : "text-muted-foreground")} />
                <span className="text-xs font-medium">{mode.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
