import React, { useState } from 'react';
import { 
  X, Plus, Clock, MapPin, Zap, Play, Lightbulb, 
  Thermometer, Lock, Video, Speaker, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Routine, RoutineAction } from '@/hooks/useRoutines';

interface RoutineEditorProps {
  routine?: Routine;
  onSave: (routine: Omit<Routine, 'id'>) => void;
  onClose: () => void;
}

const triggerTypes = [
  { id: 'manual', icon: Play, label: 'Manual', description: 'Run with a tap' },
  { id: 'scheduled', icon: Clock, label: 'Scheduled', description: 'Set a time' },
  { id: 'location', icon: MapPin, label: 'Location', description: 'Arrive or leave' },
  { id: 'event', icon: Zap, label: 'Event', description: 'Motion, door open, etc.' },
];

const colorOptions = [
  'from-amber-400 to-orange-500',
  'from-indigo-500 to-purple-600',
  'from-emerald-400 to-teal-500',
  'from-rose-500 to-pink-600',
  'from-blue-500 to-cyan-500',
  'from-slate-500 to-slate-700',
];

const iconOptions = ['sunrise', 'moon', 'log-out', 'home', 'tv', 'brain', 'eye'];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const availableActions = [
  { deviceId: '1', deviceName: 'Living Room Light', icon: Lightbulb, actions: ['turn_on', 'turn_off', 'dim'] },
  { deviceId: '5', deviceName: 'Bedroom Light', icon: Lightbulb, actions: ['turn_on', 'turn_off', 'dim'] },
  { deviceId: '10', deviceName: 'Kitchen Light', icon: Lightbulb, actions: ['turn_on', 'turn_off', 'dim'] },
  { deviceId: '2', deviceName: 'Thermostat', icon: Thermometer, actions: ['set_temp'] },
  { deviceId: '4', deviceName: 'Smart Lock', icon: Lock, actions: ['lock', 'unlock'] },
  { deviceId: '3', deviceName: 'Front Door Camera', icon: Video, actions: ['arm', 'disarm', 'record'] },
  { deviceId: '6', deviceName: 'HomePod', icon: Speaker, actions: ['turn_on', 'turn_off', 'set_volume'] },
];

export function RoutineEditor({ routine, onSave, onClose }: RoutineEditorProps) {
  const [name, setName] = useState(routine?.name || '');
  const [selectedIcon, setSelectedIcon] = useState(routine?.icon || 'sunrise');
  const [selectedColor, setSelectedColor] = useState(routine?.color || colorOptions[0]);
  const [triggerType, setTriggerType] = useState<'manual' | 'scheduled' | 'location' | 'event'>(
    routine?.trigger.type || 'manual'
  );
  const [time, setTime] = useState(routine?.trigger.time || '07:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(routine?.trigger.days || daysOfWeek);
  const [location, setLocation] = useState<'arrive' | 'leave'>(routine?.trigger.location || 'arrive');
  const [actions, setActions] = useState<RoutineAction[]>(routine?.actions || []);
  const [step, setStep] = useState(1);

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const addAction = (device: typeof availableActions[0], action: string) => {
    setActions(prev => [...prev, {
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      action,
    }]);
  };

  const removeAction = (index: number) => {
    setActions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      name,
      icon: selectedIcon,
      color: selectedColor,
      isActive: true,
      trigger: {
        type: triggerType,
        ...(triggerType === 'scheduled' && { time, days: selectedDays }),
        ...(triggerType === 'location' && { location }),
        ...(triggerType === 'event' && { event: 'motion_detected' }),
      },
      actions,
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[2rem] p-6 pb-10 max-h-[90vh] overflow-y-auto animate-slide-up shadow-large">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {routine ? 'Edit Routine' : 'New Routine'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "flex-1 h-1 rounded-full transition-colors",
                s <= step ? "bg-primary" : "bg-secondary"
              )}
            />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Routine Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Good Morning"
                className="w-full px-4 py-3 bg-secondary rounded-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Icon
              </label>
              <div className="flex gap-2 flex-wrap">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                      selectedIcon === icon 
                        ? "bg-primary text-primary-foreground scale-110" 
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    <span className="capitalize text-xs">{icon.slice(0, 2)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      `w-10 h-10 rounded-full bg-gradient-to-br ${color} transition-all`,
                      selectedColor === color && "ring-2 ring-offset-2 ring-primary scale-110"
                    )}
                  />
                ))}
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => setStep(2)}
              disabled={!name.trim()}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Trigger */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                When should this run?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {triggerTypes.map((trigger) => {
                  const Icon = trigger.icon;
                  return (
                    <button
                      key={trigger.id}
                      onClick={() => setTriggerType(trigger.id as any)}
                      className={cn(
                        "p-4 rounded-2xl text-left transition-all",
                        triggerType === trigger.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      )}
                    >
                      <Icon className="w-5 h-5 mb-2" />
                      <p className="font-medium">{trigger.label}</p>
                      <p className={cn(
                        "text-xs mt-0.5",
                        triggerType === trigger.id ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {trigger.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {triggerType === 'scheduled' && (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary rounded-2xl text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Days
                  </label>
                  <div className="flex gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-sm font-medium transition-all",
                          selectedDays.includes(day)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        )}
                      >
                        {day.slice(0, 1)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {triggerType === 'location' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLocation('arrive')}
                  className={cn(
                    "p-4 rounded-2xl text-left transition-all",
                    location === 'arrive'
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  <p className="font-medium">When I arrive</p>
                  <p className={cn(
                    "text-xs mt-0.5",
                    location === 'arrive' ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    At home location
                  </p>
                </button>
                <button
                  onClick={() => setLocation('leave')}
                  className={cn(
                    "p-4 rounded-2xl text-left transition-all",
                    location === 'leave'
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  <p className="font-medium">When I leave</p>
                  <p className={cn(
                    "text-xs mt-0.5",
                    location === 'leave' ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    From home location
                  </p>
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Actions */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Actions ({actions.length})
              </label>
              
              {actions.length > 0 && (
                <div className="space-y-2 mb-4">
                  {actions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary rounded-2xl px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">{action.deviceName}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {action.action.replace('_', ' ')}
                          {action.value !== undefined && ` → ${action.value}`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeAction(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                {availableActions.map((device) => {
                  const Icon = device.icon;
                  return (
                    <div
                      key={device.deviceId}
                      className="bg-card border border-border rounded-2xl p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-foreground">{device.deviceName}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {device.actions.map((action) => (
                          <button
                            key={action}
                            onClick={() => addAction(device, action)}
                            className="px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors capitalize"
                          >
                            {action.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleSave}
                disabled={actions.length === 0}
              >
                <Check className="w-4 h-4 mr-2" />
                Save Routine
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
