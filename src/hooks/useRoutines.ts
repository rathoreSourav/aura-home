import { useState, useCallback } from 'react';

export interface RoutineAction {
  deviceId: string;
  deviceName: string;
  action: string;
  value?: string | number | boolean;
}

export interface Routine {
  id: string;
  name: string;
  icon: string;
  color: string;
  isActive: boolean;
  trigger: {
    type: 'manual' | 'scheduled' | 'event' | 'location';
    time?: string;
    days?: string[];
    event?: string;
    location?: 'arrive' | 'leave';
  };
  actions: RoutineAction[];
  lastRun?: Date;
}

const initialRoutines: Routine[] = [
  {
    id: '1',
    name: 'Good Morning',
    icon: 'sunrise',
    color: 'from-amber-400 to-orange-500',
    isActive: true,
    trigger: {
      type: 'scheduled',
      time: '07:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    actions: [
      { deviceId: '1', deviceName: 'Living Room Light', action: 'turn_on', value: 80 },
      { deviceId: '10', deviceName: 'Kitchen Light', action: 'turn_on', value: 100 },
      { deviceId: '2', deviceName: 'Thermostat', action: 'set_temp', value: 72 },
      { deviceId: '11', deviceName: 'Coffee Maker', action: 'turn_on' },
    ],
    lastRun: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    name: 'Good Night',
    icon: 'moon',
    color: 'from-indigo-500 to-purple-600',
    isActive: true,
    trigger: {
      type: 'scheduled',
      time: '22:30',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    actions: [
      { deviceId: '1', deviceName: 'Living Room Light', action: 'turn_off' },
      { deviceId: '10', deviceName: 'Kitchen Light', action: 'turn_off' },
      { deviceId: '5', deviceName: 'Bedroom Light', action: 'dim', value: 20 },
      { deviceId: '2', deviceName: 'Thermostat', action: 'set_temp', value: 68 },
      { deviceId: '4', deviceName: 'Smart Lock', action: 'lock' },
    ],
  },
  {
    id: '3',
    name: 'Away Mode',
    icon: 'log-out',
    color: 'from-slate-500 to-slate-700',
    isActive: true,
    trigger: {
      type: 'location',
      location: 'leave',
    },
    actions: [
      { deviceId: 'all-lights', deviceName: 'All Lights', action: 'turn_off' },
      { deviceId: '2', deviceName: 'Thermostat', action: 'set_temp', value: 65 },
      { deviceId: '4', deviceName: 'Smart Lock', action: 'lock' },
      { deviceId: '3', deviceName: 'Front Door Camera', action: 'arm' },
      { deviceId: '9', deviceName: 'Backyard Camera', action: 'arm' },
    ],
  },
  {
    id: '4',
    name: 'I\'m Home',
    icon: 'home',
    color: 'from-emerald-400 to-teal-500',
    isActive: true,
    trigger: {
      type: 'location',
      location: 'arrive',
    },
    actions: [
      { deviceId: '1', deviceName: 'Living Room Light', action: 'turn_on', value: 70 },
      { deviceId: '2', deviceName: 'Thermostat', action: 'set_temp', value: 72 },
      { deviceId: '4', deviceName: 'Smart Lock', action: 'unlock' },
    ],
  },
  {
    id: '5',
    name: 'Movie Night',
    icon: 'tv',
    color: 'from-rose-500 to-pink-600',
    isActive: true,
    trigger: {
      type: 'manual',
    },
    actions: [
      { deviceId: '1', deviceName: 'Living Room Light', action: 'dim', value: 15 },
      { deviceId: '8', deviceName: 'Apple TV', action: 'turn_on' },
      { deviceId: '6', deviceName: 'HomePod', action: 'set_volume', value: 60 },
    ],
  },
  {
    id: '6',
    name: 'Focus Time',
    icon: 'brain',
    color: 'from-blue-500 to-cyan-500',
    isActive: false,
    trigger: {
      type: 'manual',
    },
    actions: [
      { deviceId: '12', deviceName: 'Office Light', action: 'turn_on', value: 100 },
      { deviceId: '6', deviceName: 'HomePod', action: 'turn_off' },
      { deviceId: '8', deviceName: 'Apple TV', action: 'turn_off' },
    ],
  },
  {
    id: '7',
    name: 'Motion Alert',
    icon: 'eye',
    color: 'from-red-500 to-orange-500',
    isActive: true,
    trigger: {
      type: 'event',
      event: 'motion_detected',
    },
    actions: [
      { deviceId: '3', deviceName: 'Front Door Camera', action: 'record' },
      { deviceId: 'notification', deviceName: 'Phone', action: 'notify' },
    ],
  },
];

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);

  const toggleRoutine = useCallback((id: string) => {
    setRoutines(prev => prev.map(routine =>
      routine.id === id ? { ...routine, isActive: !routine.isActive } : routine
    ));
  }, []);

  const runRoutine = useCallback((id: string) => {
    setRoutines(prev => prev.map(routine =>
      routine.id === id ? { ...routine, lastRun: new Date() } : routine
    ));
    // In a real app, this would trigger the actual device actions
  }, []);

  const addRoutine = useCallback((routine: Omit<Routine, 'id'>) => {
    const newRoutine: Routine = {
      ...routine,
      id: Date.now().toString(),
    };
    setRoutines(prev => [...prev, newRoutine]);
  }, []);

  const updateRoutine = useCallback((id: string, updates: Partial<Routine>) => {
    setRoutines(prev => prev.map(routine =>
      routine.id === id ? { ...routine, ...updates } : routine
    ));
  }, []);

  const deleteRoutine = useCallback((id: string) => {
    setRoutines(prev => prev.filter(routine => routine.id !== id));
  }, []);

  return {
    routines,
    toggleRoutine,
    runRoutine,
    addRoutine,
    updateRoutine,
    deleteRoutine,
  };
}
