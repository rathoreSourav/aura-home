import React from 'react';
import { Sofa, Bed, UtensilsCrossed, Bath, Briefcase } from 'lucide-react';
import { RoomCard } from './RoomCard';

const rooms = [
  {
    id: 'living',
    name: 'Living Room',
    deviceCount: 8,
    activeCount: 3,
    gradient: 'from-orange-400 to-amber-500',
    icon: <Sofa className="w-full h-full" />,
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    deviceCount: 5,
    activeCount: 1,
    gradient: 'from-indigo-400 to-purple-500',
    icon: <Bed className="w-full h-full" />,
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    deviceCount: 6,
    activeCount: 2,
    gradient: 'from-emerald-400 to-teal-500',
    icon: <UtensilsCrossed className="w-full h-full" />,
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    deviceCount: 3,
    activeCount: 0,
    gradient: 'from-cyan-400 to-blue-500',
    icon: <Bath className="w-full h-full" />,
  },
  {
    id: 'office',
    name: 'Office',
    deviceCount: 4,
    activeCount: 2,
    gradient: 'from-slate-500 to-slate-600',
    icon: <Briefcase className="w-full h-full" />,
  },
];

interface RoomsSectionProps {
  onRoomSelect: (roomId: string) => void;
}

export function RoomsSection({ onRoomSelect }: RoomsSectionProps) {
  return (
    <section className="px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Rooms</h2>
        <button className="text-sm font-medium text-primary">See All</button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {rooms.slice(0, 4).map((room) => (
          <RoomCard
            key={room.id}
            name={room.name}
            deviceCount={room.deviceCount}
            activeCount={room.activeCount}
            gradient={`bg-gradient-to-br ${room.gradient}`}
            icon={room.icon}
            onClick={() => onRoomSelect(room.id)}
          />
        ))}
      </div>
    </section>
  );
}
