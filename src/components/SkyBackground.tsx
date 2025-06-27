
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
      const numRays = 24;
      const maxRayLength = Math.max(canvas.width, canvas.height) * 1.2;
      
      context.save();
      
      // Create radial gradient for sun rays
      const rayGradient = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, maxRayLength);
      rayGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      rayGradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.6)');
      rayGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
      rayGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
      rayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      // Draw sun rays
      for (let i = 0; i < numRays; i++) {
        const angle = (i * 2 * Math.PI) / numRays + timeRef.current * 0.03;
        const rayWidth = 35 + Math.sin(angle * 2) * 12;
        
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
        context.globalAlpha = 0.5 + Math.sin(timeRef.current * 0.2 + i) * 0.2;
        context.fill();
        
        context.restore();
      }
      
      context.restore();
    };
    
    const drawSun = (sunX: number, sunY: number) => {
      context.save();
      
      // Sun outer glow
      const sunGlow = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 120);
      sunGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      sunGlow.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      sunGlow.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
      sunGlow.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = sunGlow;
      context.beginPath();
      context.arc(sunX, sunY, 120, 0, Math.PI * 2);
      context.fill();
      
      // Sun core
      const sunCore = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 35);
      sunCore.addColorStop(0, '#ffffff');
      sunCore.addColorStop(0.6, '#ffffff');
      sunCore.addColorStop(1, 'rgba(255, 255, 255, 0.98)');
      
      context.fillStyle = sunCore;
      context.beginPath();
      context.arc(sunX, sunY, 35, 0, Math.PI * 2);
      context.fill();
      
      context.restore();
    };
    
    const animate = () => {
      timeRef.current += 0.002;
      
      // Create softer, more uniform sky gradient like the reference
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Softer, more uniform blue sky colors matching the reference
      skyGradient.addColorStop(0, '#87CEEB');      // Sky blue at top
      skyGradient.addColorStop(0.3, '#96D4E8');    // Slightly lighter
      skyGradient.addColorStop(0.6, '#A8DBEC');    // Light sky blue
      skyGradient.addColorStop(0.8, '#B8E2F0');    // Very light blue
      skyGradient.addColorStop(1, '#C8E9F4');      // Lightest blue at horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Position sun more centered horizontally and in upper portion like the reference
      const sunX = canvas.width * 0.55;   // More centered horizontally
      const sunY = canvas.height * 0.2;   // Upper portion of the sky
      
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
