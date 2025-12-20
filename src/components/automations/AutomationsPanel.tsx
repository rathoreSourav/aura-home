import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoutineCard } from './RoutineCard';
import { RoutineEditor } from './RoutineEditor';
import type { Routine } from '@/hooks/useRoutines';
import { useToast } from '@/hooks/use-toast';

interface AutomationsPanelProps {
  routines: Routine[];
  onToggle: (id: string) => void;
  onRun: (id: string) => void;
  onAdd: (routine: Omit<Routine, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Routine>) => void;
  onDelete: (id: string) => void;
}

export function AutomationsPanel({
  routines,
  onToggle,
  onRun,
  onAdd,
  onUpdate,
  onDelete,
}: AutomationsPanelProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | undefined>();
  const { toast } = useToast();

  const activeRoutines = routines.filter(r => r.isActive);
  const scheduledRoutines = routines.filter(r => r.trigger.type === 'scheduled');
  const manualRoutines = routines.filter(r => r.trigger.type === 'manual');
  const automatedRoutines = routines.filter(r => 
    r.trigger.type === 'location' || r.trigger.type === 'event'
  );

  const handleRun = (id: string) => {
    onRun(id);
    const routine = routines.find(r => r.id === id);
    toast({
      title: "Routine Running",
      description: `${routine?.name} is now running.`,
    });
  };

  const handleSave = (routine: Omit<Routine, 'id'>) => {
    if (editingRoutine) {
      onUpdate(editingRoutine.id, routine);
      toast({
        title: "Routine Updated",
        description: `${routine.name} has been updated.`,
      });
    } else {
      onAdd(routine);
      toast({
        title: "Routine Created",
        description: `${routine.name} has been added to your automations.`,
      });
    }
    setShowEditor(false);
    setEditingRoutine(undefined);
  };

  const handleEdit = (routine: Routine) => {
    setEditingRoutine(routine);
    setShowEditor(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Automations</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeRoutines.length} of {routines.length} active
            </p>
          </div>
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
            onClick={() => {
              setEditingRoutine(undefined);
              setShowEditor(true);
            }}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-8">
        {/* Quick Actions - Manual Routines */}
        {manualRoutines.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {manualRoutines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  onToggle={() => onToggle(routine.id)}
                  onRun={() => handleRun(routine.id)}
                  onEdit={() => handleEdit(routine)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Scheduled Routines */}
        {scheduledRoutines.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Scheduled
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {scheduledRoutines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  onToggle={() => onToggle(routine.id)}
                  onRun={() => handleRun(routine.id)}
                  onEdit={() => handleEdit(routine)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Automated Routines (Location & Event) */}
        {automatedRoutines.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Automated
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {automatedRoutines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  onToggle={() => onToggle(routine.id)}
                  onRun={() => handleRun(routine.id)}
                  onEdit={() => handleEdit(routine)}
                />
              ))}
            </div>
          </section>
        )}

        {routines.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center px-8">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">No Automations</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Create routines to automate your smart home
            </p>
            <Button onClick={() => setShowEditor(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Routine
            </Button>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <RoutineEditor
          routine={editingRoutine}
          onSave={handleSave}
          onClose={() => {
            setShowEditor(false);
            setEditingRoutine(undefined);
          }}
        />
      )}
    </div>
  );
}
