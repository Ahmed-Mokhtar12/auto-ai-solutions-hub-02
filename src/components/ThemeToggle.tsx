
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { isDayMode, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Moon className="h-4 w-4 text-gray-400" />
      <Switch
        checked={isDayMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle day/night mode"
      />
      <Sun className="h-4 w-4 text-yellow-400" />
    </div>
  );
};

export default ThemeToggle;
