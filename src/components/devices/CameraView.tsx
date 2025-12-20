import React, { useState } from 'react';
import { X, Video, Mic, MicOff, Volume2, VolumeX, Maximize2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CameraViewProps {
  device: {
    id: string;
    name: string;
    room: string;
    hasMotion: boolean;
    isRecording: boolean;
    lastMotion?: string;
  };
  onClose: () => void;
  isFullscreen?: boolean;
}

export function CameraView({ device, onClose, isFullscreen = false }: CameraViewProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);

  return (
    <div className={cn(
      "fixed inset-0 bg-black z-50 animate-fade-in",
      isFullscreen ? "" : "bg-background/80 backdrop-blur-sm"
    )}>
      <div className={cn(
        "bg-black rounded-t-[2rem] overflow-hidden animate-slide-up",
        isFullscreen ? "h-full rounded-none" : "absolute bottom-0 left-0 right-0 h-[85vh]"
      )}>
        {/* Video Feed */}
        <div className="relative h-full">
          {/* Simulated video feed - replace with actual stream */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <Video className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Live View</p>
              <p className="text-sm text-muted-foreground/50">{device.name}</p>
            </div>
          </div>

          {/* Motion Alert Overlay */}
          {device.hasMotion && (
            <div className="absolute top-20 left-4 right-4 bg-destructive/90 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 animate-pulse">
              <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
              <div>
                <p className="text-sm font-semibold text-destructive-foreground">Motion Detected</p>
                <p className="text-xs text-destructive-foreground/80">{device.lastMotion || 'Just now'}</p>
              </div>
            </div>
          )}

          {/* Header Overlay */}
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{device.name}</h2>
                <p className="text-sm text-white/70">{device.room}</p>
              </div>
              <Button variant="glass" size="icon" onClick={onClose}>
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>

          {/* Recording Indicator */}
          {device.isRecording && (
            <div className="absolute top-24 right-6 flex items-center gap-2 bg-destructive/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-medium text-white">REC</span>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="glass"
                size="iconLg"
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? (
                  <Mic className="w-5 h-5 text-white" />
                ) : (
                  <MicOff className="w-5 h-5 text-white/50" />
                )}
              </Button>
              
              <Button
                variant="glass"
                size="iconLg"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white/50" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </Button>
              
              <Button variant="glass" size="iconLg">
                <Maximize2 className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
