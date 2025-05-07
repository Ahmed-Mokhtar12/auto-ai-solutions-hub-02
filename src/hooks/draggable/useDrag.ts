
import { useState, useEffect, useCallback } from 'react';
import { Position } from './types';

export function useDrag(
  initialPosition: Position = {
    x: window.innerWidth / 2 - 200,   // Centered horizontally
    y: window.innerHeight - 200       // 2cm (~75px) above footer
  },
  elementSize: { width: number; height: number } = { width: 400, height: 60 }
) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const maxX = window.innerWidth - elementSize.width;
    const maxY = window.innerHeight - elementSize.height;

    const newX = Math.max(0, Math.min(clientX, maxX));
    const newY = Math.max(0, Math.min(clientY, maxY));

    setPosition({ x: newX, y: newY });
  }, [elementSize]);

  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Adjust to center the drag around cursor/touch point
    const offsetX = elementSize.width / 2;
    const offsetY = elementSize.height / 2;

    updatePosition(clientX - offsetX, clientY - offsetY);
  }, [isDragging, updatePosition, elementSize]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove as any);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove as any);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove as any);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging,
    handleMouseDown: (e: React.MouseEvent | React.TouchEvent) =>
      handleMouseDown(e.nativeEvent)
  };
}
