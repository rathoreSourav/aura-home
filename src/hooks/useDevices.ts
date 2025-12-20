import { useState, useCallback } from 'react';

export interface Device {
  id: string;
  name: string;
  room: string;
  type: 'light' | 'thermostat' | 'camera' | 'lock' | 'speaker' | 'fan' | 'tv' | 'coffee';
  isActive: boolean;
  status?: string;
  brightness?: number;
  color?: string;
  temperature?: number;
  targetTemp?: number;
  humidity?: number;
  mode?: 'heat' | 'cool' | 'auto' | 'off';
  hasMotion?: boolean;
  isRecording?: boolean;
  lastMotion?: string;
  isLocked?: boolean;
  volume?: number;
}

const initialDevices: Device[] = [
  { id: '1', name: 'Living Room Light', room: 'Living Room', type: 'light', isActive: true, status: '80%', brightness: 80, color: '#FFA726' },
  { id: '2', name: 'Thermostat', room: 'Living Room', type: 'thermostat', isActive: true, status: '72°F', temperature: 72, targetTemp: 72, humidity: 45, mode: 'cool' },
  { id: '3', name: 'Front Door Camera', room: 'Entrance', type: 'camera', isActive: true, status: 'Recording', hasMotion: false, isRecording: true },
  { id: '4', name: 'Smart Lock', room: 'Entrance', type: 'lock', isActive: true, status: 'Locked', isLocked: true },
  { id: '5', name: 'Bedroom Light', room: 'Bedroom', type: 'light', isActive: false, brightness: 0, color: '#FFFDE7' },
  { id: '6', name: 'HomePod', room: 'Living Room', type: 'speaker', isActive: true, status: 'Playing', volume: 50 },
  { id: '7', name: 'Ceiling Fan', room: 'Bedroom', type: 'fan', isActive: false },
  { id: '8', name: 'Apple TV', room: 'Living Room', type: 'tv', isActive: false },
  { id: '9', name: 'Backyard Camera', room: 'Backyard', type: 'camera', isActive: true, status: 'Live', hasMotion: true, isRecording: true, lastMotion: '2 min ago' },
  { id: '10', name: 'Kitchen Light', room: 'Kitchen', type: 'light', isActive: true, status: '100%', brightness: 100, color: '#FFFDE7' },
  { id: '11', name: 'Coffee Maker', room: 'Kitchen', type: 'coffee', isActive: false },
  { id: '12', name: 'Office Light', room: 'Office', type: 'light', isActive: true, status: '60%', brightness: 60, color: '#81D4FA' },
];

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);

  const toggleDevice = useCallback((id: string) => {
    setDevices(prev => prev.map(device => {
      if (device.id === id) {
        const isActive = !device.isActive;
        let status = device.status;
        
        if (device.type === 'light') {
          status = isActive ? `${device.brightness || 100}%` : 'Off';
        } else if (device.type === 'lock') {
          status = isActive ? 'Locked' : 'Unlocked';
        }
        
        return { ...device, isActive, status };
      }
      return device;
    }));
  }, []);

  const updateDevice = useCallback((id: string, updates: Partial<Device>) => {
    setDevices(prev => prev.map(device => {
      if (device.id === id) {
        const updated = { ...device, ...updates };
        
        if (updated.type === 'light' && updates.brightness !== undefined) {
          updated.status = updated.isActive ? `${updates.brightness}%` : 'Off';
        }
        if (updated.type === 'thermostat' && updates.targetTemp !== undefined) {
          updated.status = `${updates.targetTemp}°F`;
        }
        
        return updated;
      }
      return device;
    }));
  }, []);

  const getDevicesByRoom = useCallback((room: string) => {
    return devices.filter(device => device.room === room);
  }, [devices]);

  const getDevicesByType = useCallback((type: Device['type']) => {
    return devices.filter(device => device.type === type);
  }, [devices]);

  return {
    devices,
    toggleDevice,
    updateDevice,
    getDevicesByRoom,
    getDevicesByType,
  };
}
