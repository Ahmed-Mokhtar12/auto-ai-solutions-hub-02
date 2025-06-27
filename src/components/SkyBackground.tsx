
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
    stretchX: number;
    stretchY: number;
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
      const numClouds = 15;
      
      for (let i = 0; i < numClouds; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.5,
          y: Math.random() * canvas.height * 0.7 + canvas.height * 0.1,
          width: 200 + Math.random() * 300,
          height: 40 + Math.random() * 60,
          opacity: 0.4 + Math.random() * 0.6,
          speed: 0.1 + Math.random() * 0.2,
          scale: 0.6 + Math.random() * 0.8,
          stretchX: 1.5 + Math.random() * 2,
          stretchY: 0.3 + Math.random() * 0.4
        });
      }
    };
    
    const drawCloud = (cloud: typeof cloudsRef.current[0]) => {
      context.save();
      context.globalAlpha = cloud.opacity;
      context.fillStyle = '#ffffff';
      
      const centerX = cloud.x;
      const centerY = cloud.y;
      const baseWidth = cloud.width * cloud.scale * cloud.stretchX;
      const baseHeight = cloud.height * cloud.scale * cloud.stretchY;
      
      // Create very wispy, stretched horizontal clouds like in the image
      context.beginPath();
      
      // Main horizontal cloud body - very stretched
      context.ellipse(centerX, centerY, baseWidth * 0.4, baseHeight * 0.25, 0, 0, Math.PI * 2);
      context.ellipse(centerX - baseWidth * 0.3, centerY + baseHeight * 0.1, baseWidth * 0.35, baseHeight * 0.2, 0, 0, Math.PI * 2);
      context.ellipse(centerX + baseWidth * 0.3, centerY - baseHeight * 0.05, baseWidth * 0.3, baseHeight * 0.18, 0, 0, Math.PI * 2);
      
      // Additional wispy extensions
      context.ellipse(centerX - baseWidth * 0.5, centerY, baseWidth * 0.2, baseHeight * 0.15, 0, 0, Math.PI * 2);
      context.ellipse(centerX + baseWidth * 0.45, centerY + baseHeight * 0.08, baseWidth * 0.25, baseHeight * 0.12, 0, 0, Math.PI * 2);
      
      // Very thin wispy parts
      context.ellipse(centerX - baseWidth * 0.1, centerY - baseHeight * 0.2, baseWidth * 0.15, baseHeight * 0.08, 0, 0, Math.PI * 2);
      context.ellipse(centerX + baseWidth * 0.2, centerY + baseHeight * 0.15, baseWidth * 0.18, baseHeight * 0.06, 0, 0, Math.PI * 2);
      
      context.fill();
      context.restore();
    };
    
    const animate = () => {
      timeRef.current += 0.003;
      
      // Exact sky gradient to match the uploaded image
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Sky colors matching the reference image exactly
      skyGradient.addColorStop(0, '#4A90E2'); // Medium blue at top
      skyGradient.addColorStop(0.3, '#6BB6FF'); // Brighter blue
      skyGradient.addColorStop(0.6, '#87CEEB'); // Light sky blue
      skyGradient.addColorStop(0.85, '#B8E0FF'); // Very light blue
      skyGradient.addColorStop(1, '#E6F3FF'); // Almost white at bottom
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw clouds
      cloudsRef.current.forEach((cloud, index) => {
        // Very slow cloud movement
        cloud.x += cloud.speed * 0.5;
        
        // Wrap around when cloud goes off screen
        if (cloud.x - cloud.width * cloud.stretchX > canvas.width) {
          cloud.x = -cloud.width * cloud.stretchX * 2;
          cloud.y = Math.random() * canvas.height * 0.7 + canvas.height * 0.1;
        }
        
        // Very subtle opacity variation
        const baseOpacity = 0.4 + Math.random() * 0.6;
        cloud.opacity = baseOpacity + Math.sin(timeRef.current * 0.5 + index) * 0.05;
        
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
