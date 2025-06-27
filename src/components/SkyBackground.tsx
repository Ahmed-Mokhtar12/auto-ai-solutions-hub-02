
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
    segments: Array<{ x: number; y: number; width: number; height: number; }>;
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
      
      // Create very thin horizontal streaky clouds like in the reference image
      for (let i = 0; i < 5; i++) {
        const cloud = {
          x: Math.random() * canvas.width * 1.8,
          y: Math.random() * canvas.height * 0.4 + canvas.height * 0.15,
          width: 300 + Math.random() * 400,
          height: 2 + Math.random() * 4,
          opacity: 0.4 + Math.random() * 0.3,
          speed: 0.015 + Math.random() * 0.02,
          segments: []
        };
        
        // Create thin streaky segments
        const numSegments = 2 + Math.floor(Math.random() * 3);
        for (let j = 0; j < numSegments; j++) {
          cloud.segments.push({
            x: j * (cloud.width / numSegments) + Math.random() * 30 - 15,
            y: Math.random() * 3 - 1.5,
            width: (cloud.width / numSegments) * (0.6 + Math.random() * 0.8),
            height: cloud.height * (0.4 + Math.random() * 0.4)
          });
        }
        
        cloudsRef.current.push(cloud);
      }
      
      // Add some very thin wispy high clouds
      for (let i = 0; i < 4; i++) {
        const cloud = {
          x: Math.random() * canvas.width * 2,
          y: Math.random() * canvas.height * 0.25 + canvas.height * 0.08,
          width: 200 + Math.random() * 350,
          height: 1 + Math.random() * 2,
          opacity: 0.25 + Math.random() * 0.25,
          speed: 0.008 + Math.random() * 0.015,
          segments: []
        };
        
        const numSegments = 1 + Math.floor(Math.random() * 2);
        for (let j = 0; j < numSegments; j++) {
          cloud.segments.push({
            x: j * (cloud.width / numSegments) + Math.random() * 20 - 10,
            y: Math.random() * 2 - 1,
            width: (cloud.width / numSegments) * (0.7 + Math.random() * 0.6),
            height: cloud.height * (0.5 + Math.random() * 0.5)
          });
        }
        
        cloudsRef.current.push(cloud);
      }
    };
    
    const drawCloud = (cloud: typeof cloudsRef.current[0]) => {
      context.save();
      context.globalAlpha = cloud.opacity;
      context.fillStyle = '#ffffff';
      context.shadowColor = 'rgba(255, 255, 255, 0.3)';
      context.shadowBlur = 1;
      
      // Draw very thin horizontal streaks
      cloud.segments.forEach(segment => {
        context.beginPath();
        // Create extremely thin horizontal streaks
        context.ellipse(
          cloud.x + segment.x, 
          cloud.y + segment.y, 
          segment.width * 0.5, 
          segment.height * 0.15, // Much thinner
          0, 
          0, 
          Math.PI * 2
        );
        context.fill();
      });
      
      context.restore();
    };
    
    const animate = () => {
      timeRef.current += 0.001;
      
      // Create vibrant blue sky gradient matching the reference image
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Rich, vibrant blue colors like in the reference
      skyGradient.addColorStop(0, '#2563eb');      // Rich blue at top
      skyGradient.addColorStop(0.3, '#3b82f6');    // Vibrant blue
      skyGradient.addColorStop(0.6, '#60a5fa');    // Medium blue
      skyGradient.addColorStop(0.85, '#93c5fd');   // Light blue
      skyGradient.addColorStop(1, '#bfdbfe');      // Very light blue at horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw clouds
      cloudsRef.current.forEach((cloud, index) => {
        // Very slow movement
        cloud.x += cloud.speed * 0.3;
        
        // Wrap around when cloud goes off screen
        if (cloud.x - cloud.width > canvas.width) {
          cloud.x = -cloud.width * 1.5;
          cloud.y = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
        }
        
        // Very subtle opacity variation
        const baseOpacity = cloud.opacity;
        cloud.opacity = baseOpacity + Math.sin(timeRef.current * 0.15 + index * 0.4) * 0.05;
        
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
