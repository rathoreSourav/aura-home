import React from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';

export function Header() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  
  const WeatherIcon = currentHour < 6 || currentHour > 18 ? Moon : currentHour > 6 && currentHour < 18 ? Sun : Cloud;

  return (
    <header className="px-6 pt-14 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {greeting}
          </p>
          <h1 className="text-2xl font-semibold text-foreground mt-0.5">
            My Home
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-2xl">
            <WeatherIcon className="w-5 h-5 text-home-warm" />
            <span className="text-sm font-medium text-foreground">72°F</span>
          </div>
        </div>
      </div>
    </header>
  );
}
