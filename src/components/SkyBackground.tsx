
import React, { useEffect, useRef } from 'react';

const SkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const animate = () => {
      timeRef.current += 0.008;
      
      // Light blue daytime sky gradient
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      const timeVariation = Math.sin(timeRef.current * 0.05) * 0.05;
      const r1 = Math.floor(135 + timeVariation * 15);
      const g1 = Math.floor(206 + timeVariation * 20);
      const b1 = Math.floor(250 + timeVariation * 5);
      
      skyGradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
      skyGradient.addColorStop(0.2, `rgb(${r1 + 10}, ${g1 + 15}, ${b1})`);
      skyGradient.addColorStop(0.4, `rgb(${r1 + 25}, ${g1 + 20}, ${b1})`);
      skyGradient.addColorStop(0.6, '#E6F3FF');
      skyGradient.addColorStop(0.8, '#F0F8FF');
      skyGradient.addColorStop(1, '#F8FCFF');
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Subtle atmospheric haze at the bottom
      const hazeGradient = context.createLinearGradient(0, canvas.height * 0.8, 0, canvas.height);
      const hazeIntensity = 0.08 + Math.sin(timeRef.current * 0.03) * 0.02;
      hazeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hazeGradient.addColorStop(0.6, `rgba(250, 253, 255, ${hazeIntensity})`);
      hazeGradient.addColorStop(1, `rgba(245, 250, 255, ${hazeIntensity + 0.05})`);
      
      context.fillStyle = hazeGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default SkyBackground;
