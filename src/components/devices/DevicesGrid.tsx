import React from 'react';
import { Lightbulb, Thermometer, Video, Lock, Speaker, Fan, Tv, Coffee } from 'lucide-react';
import { DeviceTile } from './DeviceTile';

interface Device {
  id: string;
  name: string;
  room: string;
  type: string;
  isActive: boolean;
  status?: string;
}

interface DevicesGridProps {
  devices: Device[];
  onDeviceToggle: (id: string) => void;
  onDeviceClick: (device: Device) => void;
}

const getDeviceIcon = (type: string) => {
  const icons: Record<string, React.ReactNode> = {
    light: <Lightbulb className="w-full h-full" />,
    thermostat: <Thermometer className="w-full h-full" />,
    camera: <Video className="w-full h-full" />,
    lock: <Lock className="w-full h-full" />,
    speaker: <Speaker className="w-full h-full" />,
    fan: <Fan className="w-full h-full" />,
    tv: <Tv className="w-full h-full" />,
    coffee: <Coffee className="w-full h-full" />,
  };
  return icons[type] || <Lightbulb className="w-full h-full" />;
};

const getAccentColor = (type: string, isActive: boolean) => {
  if (!isActive) return 'text-muted-foreground';
  const colors: Record<string, string> = {
    light: 'text-home-warm',
    thermostat: 'text-home-cool',
    camera: 'text-home-camera',
    lock: 'text-home-lock',
    speaker: 'text-home-speaker',
    fan: 'text-home-cool',
    tv: 'text-accent',
    coffee: 'text-home-warm',
  };
  return colors[type] || 'text-primary';
};

export function DevicesGrid({ devices, onDeviceToggle, onDeviceClick }: DevicesGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 px-6">
      {devices.map((device) => (
        <DeviceTile
          key={device.id}
          name={device.name}
          room={device.room}
          icon={getDeviceIcon(device.type)}
          isActive={device.isActive}
          status={device.status}
          accentColor={getAccentColor(device.type, device.isActive)}
          onToggle={() => onDeviceToggle(device.id)}
          onClick={() => onDeviceClick(device)}
        />
      ))}
    </div>
  );
}
