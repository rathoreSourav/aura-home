import React from 'react';
import { X, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface LightControlProps {
  device: {
    id: string;
    name: string;
    room: string;
    brightness: number;
    color: string;
    isOn: boolean;
  };
  onClose: () => void;
  onBrightnessChange: (value: number) => void;
  onColorChange: (color: string) => void;
  onToggle: () => void;
}

const colorOptions = [
  { id: 'warm', color: '#FFA726', label: 'Warm' },
  { id: 'daylight', color: '#FFFDE7', label: 'Daylight' },
  { id: 'cool', color: '#81D4FA', label: 'Cool' },
  { id: 'purple', color: '#CE93D8', label: 'Purple' },
  { id: 'blue', color: '#64B5F6', label: 'Blue' },
  { id: 'green', color: '#A5D6A7', label: 'Green' },
];

export function LightControl({
  device,
  onClose,
  onBrightnessChange,
  onColorChange,
  onToggle,
}: LightControlProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[2rem] p-6 pb-10 animate-slide-up shadow-large">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center",
              device.isOn ? "bg-home-warm/10" : "bg-secondary"
            )}>
              <Lightbulb className={cn(
                "w-6 h-6",
                device.isOn ? "text-home-warm" : "text-muted-foreground"
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

        {/* Brightness Control */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Brightness</span>
            <span className="text-sm font-semibold text-foreground">{device.brightness}%</span>
          </div>
          <div className="relative py-4">
            <Slider
              value={[device.brightness]}
              onValueChange={([value]) => onBrightnessChange(value)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-8">
          <span className="text-sm font-medium text-muted-foreground mb-4 block">Color</span>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {colorOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onColorChange(option.color)}
                className={cn(
                  "flex flex-col items-center gap-2 min-w-[60px]",
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full border-2 transition-all",
                    device.color === option.color
                      ? "border-primary scale-110"
                      : "border-transparent"
                  )}
                  style={{ backgroundColor: option.color }}
                />
                <span className="text-xs text-muted-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Button */}
        <Button
          variant={device.isOn ? "default" : "secondary"}
          size="xl"
          className="w-full"
          onClick={onToggle}
        >
          {device.isOn ? 'Turn Off' : 'Turn On'}
        </Button>
      </div>
    </div>
  );
}
