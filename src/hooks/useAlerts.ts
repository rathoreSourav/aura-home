import { useState, useCallback } from 'react';

export interface Alert {
  id: string;
  type: 'motion' | 'security' | 'system' | 'device';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  deviceId?: string;
  hasVideo?: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'motion',
    title: 'Motion Detected',
    message: 'Movement detected at Front Door Camera',
    timestamp: new Date(Date.now() - 120000),
    isRead: false,
    deviceId: '3',
    hasVideo: true,
  },
  {
    id: '2',
    type: 'motion',
    title: 'Motion Detected',
    message: 'Movement detected at Backyard Camera',
    timestamp: new Date(Date.now() - 180000),
    isRead: false,
    deviceId: '9',
    hasVideo: true,
  },
  {
    id: '3',
    type: 'security',
    title: 'Door Unlocked',
    message: 'Front door was unlocked remotely',
    timestamp: new Date(Date.now() - 3600000),
    isRead: true,
    deviceId: '4',
  },
  {
    id: '4',
    type: 'device',
    title: 'Device Offline',
    message: 'Bedroom Light is not responding',
    timestamp: new Date(Date.now() - 7200000),
    isRead: true,
  },
];

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const addAlert = useCallback((alert: Omit<Alert, 'id' | 'timestamp' | 'isRead'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };
    setAlerts(prev => [newAlert, ...prev]);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  }, []);

  const markAllAsRead = useCallback(() => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  }, []);

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return {
    alerts,
    addAlert,
    dismissAlert,
    markAsRead,
    markAllAsRead,
    unreadCount,
  };
}
