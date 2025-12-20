import React from 'react';
import { 
  Sunrise, Moon, LogOut, Home, Tv, Brain, Eye, 
  Play, Clock, MapPin, Zap, MoreVertical, Power
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Routine } from '@/hooks/useRoutines';

interface RoutineCardProps {
  routine: Routine;
  onToggle: () => void;
  onRun: () => void;
  onEdit?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  sunrise: <Sunrise className="w-full h-full" />,
  moon: <Moon className="w-full h-full" />,
  'log-out': <LogOut className="w-full h-full" />,
  home: <Home className="w-full h-full" />,
  tv: <Tv className="w-full h-full" />,
  brain: <Brain className="w-full h-full" />,
  eye: <Eye className="w-full h-full" />,
};

const getTriggerInfo = (routine: Routine) => {
  switch (routine.trigger.type) {
    case 'scheduled':
      const days = routine.trigger.days?.join(', ') || 'Every day';
      return {
        icon: <Clock className="w-3.5 h-3.5" />,
        text: `${routine.trigger.time} · ${days}`,
      };
    case 'location':
      return {
        icon: <MapPin className="w-3.5 h-3.5" />,
        text: routine.trigger.location === 'arrive' ? 'When I arrive home' : 'When I leave home',
      };
    case 'event':
      return {
        icon: <Zap className="w-3.5 h-3.5" />,
        text: routine.trigger.event?.replace('_', ' ') || 'Event trigger',
      };
    default:
      return {
        icon: <Play className="w-3.5 h-3.5" />,
        text: 'Manual',
      };
  }
};

const formatLastRun = (date?: Date) => {
  if (!date) return null;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (hours < 1) return 'Just ran';
  if (hours < 24) return `Ran ${hours}h ago`;
  if (days === 1) return 'Ran yesterday';
  return `Ran ${days} days ago`;
};

export function RoutineCard({ routine, onToggle, onRun, onEdit }: RoutineCardProps) {
  const triggerInfo = getTriggerInfo(routine);
  const lastRunText = formatLastRun(routine.lastRun);

  return (
    <div className={cn(
      "relative rounded-3xl p-5 transition-all duration-300",
      routine.isActive 
        ? `bg-gradient-to-br ${routine.color} text-white shadow-lg`
        : "bg-card border border-border"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center",
          routine.isActive ? "bg-white/20 backdrop-blur-sm" : "bg-secondary"
        )}>
          <div className={cn(
            "w-6 h-6",
            routine.isActive ? "text-white" : "text-muted-foreground"
          )}>
            {iconMap[routine.icon] || <Zap className="w-full h-full" />}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={routine.isActive ? "glass" : "ghost"}
            size="icon"
            className={cn(
              "h-8 w-8",
              routine.isActive && "bg-white/20 hover:bg-white/30 text-white"
            )}
            onClick={onEdit}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={cn(
          "font-semibold text-lg",
          routine.isActive ? "text-white" : "text-foreground"
        )}>
          {routine.name}
        </h3>
        
        <div className={cn(
          "flex items-center gap-1.5 mt-1",
          routine.isActive ? "text-white/80" : "text-muted-foreground"
        )}>
          {triggerInfo.icon}
          <span className="text-sm">{triggerInfo.text}</span>
        </div>
        
        {lastRunText && (
          <p className={cn(
            "text-xs mt-2",
            routine.isActive ? "text-white/60" : "text-muted-foreground/60"
          )}>
            {lastRunText}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {routine.trigger.type === 'manual' && (
          <Button
            variant={routine.isActive ? "glass" : "secondary"}
            size="sm"
            className={cn(
              "flex-1",
              routine.isActive && "bg-white/20 hover:bg-white/30 text-white border-0"
            )}
            onClick={onRun}
          >
            <Play className="w-4 h-4 mr-1.5" />
            Run Now
          </Button>
        )}
        
        <Button
          variant={routine.isActive ? "glass" : "secondary"}
          size="icon"
          className={cn(
            "h-9 w-9",
            routine.isActive 
              ? "bg-white/20 hover:bg-white/30 text-white border-0" 
              : ""
          )}
          onClick={onToggle}
        >
          <Power className={cn(
            "w-4 h-4",
            !routine.isActive && "text-muted-foreground"
          )} />
        </Button>
      </div>

      {/* Action count badge */}
      <div className={cn(
        "absolute top-4 right-14 px-2 py-0.5 rounded-full text-xs font-medium",
        routine.isActive 
          ? "bg-white/20 text-white" 
          : "bg-secondary text-muted-foreground"
      )}>
        {routine.actions.length} actions
      </div>
    </div>
  );
}
