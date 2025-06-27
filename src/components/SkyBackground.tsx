
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
      timeRef.current += 0.002;
      
      // Clear and bright light blue daytime sky gradient
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      const timeVariation = Math.sin(timeRef.current * 0.1) * 0.03;
      const r1 = Math.floor(135 + timeVariation * 10);
      const g1 = Math.floor(206 + timeVariation * 15);
      const b1 = Math.floor(250 + timeVariation * 5);
      
      skyGradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
      skyGradient.addColorStop(0.3, `rgb(${r1 + 15}, ${g1 + 20}, ${b1})`);
      skyGradient.addColorStop(0.7, '#E8F4FD');
      skyGradient.addColorStop(1, '#F5FAFF');
      
      context.fillStyle = skyGradient;
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
