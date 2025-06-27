
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import SkyBackground from './SkyBackground';
import NightBackground from './NightBackground';

const DynamicBackground: React.FC = () => {
  const { isDayMode } = useTheme();

  return (
    <>
      {isDayMode ? <SkyBackground /> : <NightBackground />}
    </>
  );
};

export default DynamicBackground;
