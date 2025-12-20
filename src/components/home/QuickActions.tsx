import React from 'react';
import { Moon, Sun, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
  { id: 'away', icon: LogOut, label: 'Away', color: 'text-muted-foreground' },
  { id: 'home', icon: Home, label: 'Home', color: 'text-home-success' },
  { id: 'morning', icon: Sun, label: 'Morning', color: 'text-home-warm' },
  { id: 'night', icon: Moon, label: 'Night', color: 'text-home-cool' },
];

interface QuickActionsProps {
  activeScene: string;
  onSceneChange: (scene: string) => void;
}

export function QuickActions({ activeScene, onSceneChange }: QuickActionsProps) {
  return (
    <section className="px-6 py-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Scenes</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          const isActive = activeScene === action.id;
          
          return (
            <Button
              key={action.id}
              variant={isActive ? "deviceActive" : "device"}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => onSceneChange(action.id)}
            >
              <Icon className={`w-6 h-6 ${isActive ? action.color : 'text-muted-foreground'}`} />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
}
