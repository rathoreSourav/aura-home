import React from 'react';
import { Video, AlertTriangle, Lock, Bell, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'motion' | 'security' | 'system' | 'device';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  deviceId?: string;
  hasVideo?: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
  onDismiss: (id: string) => void;
  onViewCamera?: (deviceId: string) => void;
}

const getAlertIcon = (type: string) => {
  const icons: Record<string, React.ReactNode> = {
    motion: <Video className="w-5 h-5" />,
    security: <Lock className="w-5 h-5" />,
    system: <AlertTriangle className="w-5 h-5" />,
    device: <Bell className="w-5 h-5" />,
  };
  return icons[type] || <Bell className="w-5 h-5" />;
};

const getAlertColor = (type: string) => {
  const colors: Record<string, string> = {
    motion: 'bg-home-camera/10 text-home-camera',
    security: 'bg-destructive/10 text-destructive',
    system: 'bg-home-warm/10 text-home-warm',
    device: 'bg-accent/10 text-accent',
  };
  return colors[type] || 'bg-secondary text-secondary-foreground';
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

export function AlertsPanel({ alerts, onAlertClick, onDismiss, onViewCamera }: AlertsPanelProps) {
  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Alerts</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          {alerts.length > 0 && (
            <Button variant="ghost" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 rounded-3xl bg-home-success/10 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-home-success" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">No alerts</h2>
            <p className="text-muted-foreground text-sm">
              Everything is running smoothly
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "px-6 py-4 hover:bg-secondary/50 transition-colors cursor-pointer",
                  !alert.isRead && "bg-primary/5"
                )}
                onClick={() => onAlertClick(alert)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0",
                    getAlertColor(alert.type)
                  )}>
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-foreground truncate">{alert.title}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatTime(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {alert.message}
                    </p>
                    
                    {alert.hasVideo && alert.deviceId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-8 px-3 text-home-camera"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewCamera?.(alert.deviceId!);
                        }}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        View Recording
                      </Button>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDismiss(alert.id);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
