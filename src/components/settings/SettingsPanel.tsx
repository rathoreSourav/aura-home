import React from 'react';
import { User, Bell, Shield, Wifi, HelpCircle, LogOut, ChevronRight, Moon, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  destructive?: boolean;
}

function SettingsItem({ icon, label, value, onClick, destructive }: SettingsItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/50 transition-colors",
        destructive && "text-destructive"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center",
        destructive ? "bg-destructive/10" : "bg-secondary"
      )}>
        {icon}
      </div>
      <span className="flex-1 text-left font-medium">{label}</span>
      {value && (
        <span className="text-sm text-muted-foreground">{value}</span>
      )}
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

export function SettingsPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 p-4 bg-card rounded-3xl shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">John Doe</h2>
            <p className="text-sm text-muted-foreground">john.doe@email.com</p>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Preferences
          </p>
        </div>
        
        <div className="bg-card mx-4 rounded-3xl overflow-hidden mb-6">
          <SettingsItem
            icon={<Bell className="w-5 h-5 text-muted-foreground" />}
            label="Notifications"
            value="On"
          />
          <SettingsItem
            icon={<Moon className="w-5 h-5 text-muted-foreground" />}
            label="Appearance"
            value="System"
          />
          <SettingsItem
            icon={<Smartphone className="w-5 h-5 text-muted-foreground" />}
            label="Connected Devices"
            value="12"
          />
        </div>

        <div className="px-6 py-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Security
          </p>
        </div>
        
        <div className="bg-card mx-4 rounded-3xl overflow-hidden mb-6">
          <SettingsItem
            icon={<Shield className="w-5 h-5 text-muted-foreground" />}
            label="Privacy & Security"
          />
          <SettingsItem
            icon={<Wifi className="w-5 h-5 text-muted-foreground" />}
            label="Network Settings"
          />
        </div>

        <div className="px-6 py-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Support
          </p>
        </div>
        
        <div className="bg-card mx-4 rounded-3xl overflow-hidden mb-6">
          <SettingsItem
            icon={<HelpCircle className="w-5 h-5 text-muted-foreground" />}
            label="Help & Support"
          />
          <SettingsItem
            icon={<LogOut className="w-5 h-5 text-destructive" />}
            label="Sign Out"
            destructive
          />
        </div>

        <div className="px-6 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            Home Hub v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
