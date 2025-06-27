import React, { useEffect, useRef } from 'react';

const SkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const drawSun = (sunX: number, sunY: number) => {
      context.save();
      
      // Sun outer glow
      const sunGlow = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 80);
      sunGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      sunGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      sunGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = sunGlow;
      context.beginPath();
      context.arc(sunX, sunY, 80, 0, Math.PI * 2);
      context.fill();
      
      // Sun core
      const sunCore = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 25);
      sunCore.addColorStop(0, '#ffffff');
      sunCore.addColorStop(0.7, '#ffffff');
      sunCore.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      
      context.fillStyle = sunCore;
      context.beginPath();
      context.arc(sunX, sunY, 25, 0, Math.PI * 2);
      context.fill();
      
      context.restore();
    };
    
    const animate = () => {
      // Create a sky gradient with varying blur effects
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Different shades of blue with varying intensities for blur effect
      skyGradient.addColorStop(0, '#4A90E2');      // Deeper blue at top
      skyGradient.addColorStop(0.2, '#5BA3F5');    // Medium blue
      skyGradient.addColorStop(0.4, '#7BB8F7');    // Lighter blue
      skyGradient.addColorStop(0.6, '#95C9F9');    // Even lighter
      skyGradient.addColorStop(0.8, '#B5DAFB');    // Very light blue
      skyGradient.addColorStop(1, '#D0E8FD');      // Lightest blue at horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle blur effects with multiple gradients
      // Top blur area
      const topBlur = context.createRadialGradient(canvas.width / 2, 0, 0, canvas.width / 2, canvas.height * 0.3, canvas.width);
      topBlur.addColorStop(0, 'rgba(74, 144, 226, 0.1)');
      topBlur.addColorStop(0.5, 'rgba(74, 144, 226, 0.05)');
      topBlur.addColorStop(1, 'rgba(74, 144, 226, 0)');
      
      context.fillStyle = topBlur;
      context.fillRect(0, 0, canvas.width, canvas.height * 0.4);
      
      // Middle blur area
      const middleBlur = context.createRadialGradient(canvas.width / 3, canvas.height * 0.4, 0, canvas.width / 2, canvas.height * 0.6, canvas.width * 0.8);
      middleBlur.addColorStop(0, 'rgba(123, 184, 247, 0.08)');
      middleBlur.addColorStop(0.6, 'rgba(123, 184, 247, 0.04)');
      middleBlur.addColorStop(1, 'rgba(123, 184, 247, 0)');
      
      context.fillStyle = middleBlur;
      context.fillRect(0, canvas.width * 0.3, canvas.width, canvas.height * 0.4);
      
      // Bottom blur area
      const bottomBlur = context.createRadialGradient(canvas.width * 0.7, canvas.height, 0, canvas.width / 2, canvas.height * 0.8, canvas.width);
      bottomBlur.addColorStop(0, 'rgba(208, 232, 253, 0.12)');
      bottomBlur.addColorStop(0.4, 'rgba(208, 232, 253, 0.06)');
      bottomBlur.addColorStop(1, 'rgba(208, 232, 253, 0)');
      
      context.fillStyle = bottomBlur;
      context.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
      
      // Position sun at very top border with half visible
      const sunX = canvas.width * 0.85;   // 85% from left (right side)
      const sunY = -12;  // Negative Y to position half the sun above screen edge
      
      // Draw the sun (no rays)
      drawSun(sunX, sunY);
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
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
