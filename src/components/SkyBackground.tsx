
import React, { useEffect, useRef } from 'react';

const SkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const cloudsRef = useRef<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
    speed: number;
    scale: number;
  }>>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeClouds();
    };
    
    const initializeClouds = () => {
      cloudsRef.current = [];
      const numClouds = 12;
      
      for (let i = 0; i < numClouds; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.5,
          y: Math.random() * canvas.height * 0.6 + canvas.height * 0.1,
          width: 150 + Math.random() * 200,
          height: 60 + Math.random() * 80,
          opacity: 0.6 + Math.random() * 0.4,
          speed: 0.2 + Math.random() * 0.3,
          scale: 0.8 + Math.random() * 0.4
        });
      }
    };
    
    const drawCloud = (cloud: typeof cloudsRef.current[0]) => {
      context.save();
      context.globalAlpha = cloud.opacity;
      context.fillStyle = '#ffffff';
      
      const centerX = cloud.x;
      const centerY = cloud.y;
      const baseWidth = cloud.width * cloud.scale;
      const baseHeight = cloud.height * cloud.scale;
      
      // Create cloud with multiple overlapping circles for natural look
      context.beginPath();
      
      // Main cloud body
      context.arc(centerX, centerY, baseWidth * 0.3, 0, Math.PI * 2);
      context.arc(centerX - baseWidth * 0.2, centerY + baseHeight * 0.1, baseWidth * 0.25, 0, Math.PI * 2);
      context.arc(centerX + baseWidth * 0.2, centerY + baseHeight * 0.1, baseWidth * 0.25, 0, Math.PI * 2);
      context.arc(centerX - baseWidth * 0.1, centerY - baseHeight * 0.15, baseWidth * 0.2, 0, Math.PI * 2);
      context.arc(centerX + baseWidth * 0.1, centerY - baseHeight * 0.15, baseWidth * 0.2, 0, Math.PI * 2);
      
      // Additional wispy parts
      context.arc(centerX - baseWidth * 0.35, centerY, baseWidth * 0.15, 0, Math.PI * 2);
      context.arc(centerX + baseWidth * 0.35, centerY, baseWidth * 0.15, 0, Math.PI * 2);
      
      context.fill();
      context.restore();
    };
    
    const animate = () => {
      timeRef.current += 0.005;
      
      // Create realistic sky gradient - bright blue at top transitioning to lighter at bottom
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Top: Deep blue sky
      skyGradient.addColorStop(0, '#1e3a8a'); // Deep blue
      skyGradient.addColorStop(0.2, '#3b82f6'); // Bright blue
      skyGradient.addColorStop(0.4, '#60a5fa'); // Medium blue
      skyGradient.addColorStop(0.7, '#93c5fd'); // Light blue
      skyGradient.addColorStop(0.85, '#dbeafe'); // Very light blue
      skyGradient.addColorStop(1, '#f0f9ff'); // Almost white at horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw clouds
      cloudsRef.current.forEach((cloud, index) => {
        // Move clouds slowly across the sky
        cloud.x += cloud.speed;
        
        // Wrap around when cloud goes off screen
        if (cloud.x - cloud.width > canvas.width) {
          cloud.x = -cloud.width * 2;
          cloud.y = Math.random() * canvas.height * 0.6 + canvas.height * 0.1;
        }
        
        // Subtle opacity animation for natural movement
        const baseOpacity = 0.6 + Math.random() * 0.4;
        cloud.opacity = baseOpacity + Math.sin(timeRef.current + index) * 0.1;
        
        drawCloud(cloud);
      });
      
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
