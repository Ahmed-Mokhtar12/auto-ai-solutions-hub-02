
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
    
    const drawSunRays = (sunX: number, sunY: number) => {
      const numRays = 16;
      const maxRayLength = Math.max(canvas.width, canvas.height) * 0.8;
      
      context.save();
      
      // Create radial gradient for sun rays
      const rayGradient = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, maxRayLength);
      rayGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      rayGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.4)');
      rayGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      rayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      // Draw sun rays
      for (let i = 0; i < numRays; i++) {
        const angle = (i * 2 * Math.PI) / numRays + timeRef.current * 0.05;
        const rayWidth = 25 + Math.sin(angle * 2) * 8;
        
        context.save();
        context.translate(sunX, sunY);
        context.rotate(angle);
        
        // Create ray shape
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(maxRayLength, -rayWidth / 2);
        context.lineTo(maxRayLength, rayWidth / 2);
        context.closePath();
        
        context.fillStyle = rayGradient;
        context.globalAlpha = 0.4 + Math.sin(timeRef.current * 0.3 + i) * 0.15;
        context.fill();
        
        context.restore();
      }
      
      context.restore();
    };
    
    const drawSun = (sunX: number, sunY: number) => {
      context.save();
      
      // Sun outer glow
      const sunGlow = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 100);
      sunGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      sunGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      sunGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = sunGlow;
      context.beginPath();
      context.arc(sunX, sunY, 100, 0, Math.PI * 2);
      context.fill();
      
      // Sun core
      const sunCore = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 30);
      sunCore.addColorStop(0, '#ffffff');
      sunCore.addColorStop(0.7, '#fffef8');
      sunCore.addColorStop(1, 'rgba(255, 254, 248, 0.95)');
      
      context.fillStyle = sunCore;
      context.beginPath();
      context.arc(sunX, sunY, 30, 0, Math.PI * 2);
      context.fill();
      
      context.restore();
    };
    
    const animate = () => {
      timeRef.current += 0.003;
      
      // Create bright, vibrant sky gradient
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Bright, saturated blue sky colors
      skyGradient.addColorStop(0, '#1e90ff');      // Dodger blue at top
      skyGradient.addColorStop(0.3, '#4169e1');    // Royal blue
      skyGradient.addColorStop(0.6, '#6495ed');    // Cornflower blue
      skyGradient.addColorStop(0.8, '#87ceeb');    // Sky blue
      skyGradient.addColorStop(1, '#b0e0e6');      // Powder blue at horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Position sun higher up and more towards center-right, like in the reference
      const sunX = canvas.width * 0.7;   // Slightly less to the right
      const sunY = canvas.height * 0.15;  // Much higher up in the sky
      
      // Draw sun rays first (behind the sun)
      drawSunRays(sunX, sunY);
      
      // Draw the sun
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
