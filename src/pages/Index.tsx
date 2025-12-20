import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Header } from '@/components/home/Header';
import { QuickActions } from '@/components/home/QuickActions';
import { RoomsSection } from '@/components/home/RoomsSection';
import { DevicesGrid } from '@/components/devices/DevicesGrid';
import { LightControl } from '@/components/devices/LightControl';
import { ThermostatControl } from '@/components/devices/ThermostatControl';
import { CameraView } from '@/components/devices/CameraView';
import { ChatInterface } from '@/components/assistant/ChatInterface';
import { AlertsPanel } from '@/components/alerts/AlertsPanel';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { useDevices, Device } from '@/hooks/useDevices';
import { useAlerts } from '@/hooks/useAlerts';
import { useChat } from '@/hooks/useChat';

type TabType = 'home' | 'devices' | 'assistant' | 'alerts' | 'settings';
type ControlPanel = 'light' | 'thermostat' | 'camera' | null;

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeScene, setActiveScene] = useState('home');
  const [controlPanel, setControlPanel] = useState<ControlPanel>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const { devices, toggleDevice, updateDevice } = useDevices();
  const { alerts, dismissAlert, markAsRead } = useAlerts();
  const { messages, isLoading, sendMessage } = useChat();

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    if (device.type === 'light') {
      setControlPanel('light');
    } else if (device.type === 'thermostat') {
      setControlPanel('thermostat');
    } else if (device.type === 'camera') {
      setControlPanel('camera');
    }
  };

  const handleClosePanel = () => {
    setControlPanel(null);
    setSelectedDevice(null);
  };

  const handleViewCamera = (deviceId: string) => {
    const camera = devices.find(d => d.id === deviceId);
    if (camera) {
      setSelectedDevice(camera);
      setControlPanel('camera');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Header />
            <QuickActions activeScene={activeScene} onSceneChange={setActiveScene} />
            <RoomsSection onRoomSelect={(room) => console.log('Selected room:', room)} />
            
            {/* Favorite Devices */}
            <section className="py-4">
              <div className="flex items-center justify-between px-6 mb-4">
                <h2 className="text-lg font-semibold text-foreground">Favorites</h2>
                <button className="text-sm font-medium text-primary">Edit</button>
              </div>
              <DevicesGrid
                devices={devices.slice(0, 4)}
                onDeviceToggle={toggleDevice}
                onDeviceClick={handleDeviceClick}
              />
            </section>
          </>
        );
      
      case 'devices':
        return (
          <>
            <div className="px-6 pt-14 pb-4">
              <h1 className="text-2xl font-semibold text-foreground">All Devices</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {devices.filter(d => d.isActive).length} of {devices.length} active
              </p>
            </div>
            <DevicesGrid
              devices={devices}
              onDeviceToggle={toggleDevice}
              onDeviceClick={handleDeviceClick}
            />
          </>
        );
      
      case 'assistant':
        return (
          <ChatInterface
            messages={messages}
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        );
      
      case 'alerts':
        return (
          <AlertsPanel
            alerts={alerts}
            onAlertClick={(alert) => markAsRead(alert.id)}
            onDismiss={dismissAlert}
            onViewCamera={handleViewCamera}
          />
        );
      
      case 'settings':
        return <SettingsPanel />;
      
      default:
        return null;
    }
  };

  return (
    <>
      <AppShell activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabType)}>
        {renderContent()}
      </AppShell>

      {/* Light Control Panel */}
      {controlPanel === 'light' && selectedDevice && (
        <LightControl
          device={{
            id: selectedDevice.id,
            name: selectedDevice.name,
            room: selectedDevice.room,
            brightness: selectedDevice.brightness || 100,
            color: selectedDevice.color || '#FFA726',
            isOn: selectedDevice.isActive,
          }}
          onClose={handleClosePanel}
          onBrightnessChange={(value) => updateDevice(selectedDevice.id, { brightness: value })}
          onColorChange={(color) => updateDevice(selectedDevice.id, { color })}
          onToggle={() => toggleDevice(selectedDevice.id)}
        />
      )}

      {/* Thermostat Control Panel */}
      {controlPanel === 'thermostat' && selectedDevice && (
        <ThermostatControl
          device={{
            id: selectedDevice.id,
            name: selectedDevice.name,
            room: selectedDevice.room,
            temperature: selectedDevice.temperature || 72,
            targetTemp: selectedDevice.targetTemp || 72,
            humidity: selectedDevice.humidity || 45,
            mode: selectedDevice.mode || 'auto',
            isOn: selectedDevice.isActive,
          }}
          onClose={handleClosePanel}
          onTempChange={(temp) => updateDevice(selectedDevice.id, { targetTemp: temp })}
          onModeChange={(mode) => updateDevice(selectedDevice.id, { mode })}
        />
      )}

      {/* Camera View */}
      {controlPanel === 'camera' && selectedDevice && (
        <CameraView
          device={{
            id: selectedDevice.id,
            name: selectedDevice.name,
            room: selectedDevice.room,
            hasMotion: selectedDevice.hasMotion || false,
            isRecording: selectedDevice.isRecording || false,
            lastMotion: selectedDevice.lastMotion,
          }}
          onClose={handleClosePanel}
        />
      )}
    </>
  );
}
