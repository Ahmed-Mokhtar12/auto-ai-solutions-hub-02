
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
      
      // Create thin horizontal streaky clouds like in the reference image
      for (let i = 0; i < 8; i++) {
        const cloud = {
          x: Math.random() * canvas.width * 1.5,
          y: Math.random() * canvas.height * 0.5 + canvas.height * 0.15,
          width: 200 + Math.random() * 300,
          height: 4 + Math.random() * 8,
          opacity: 0.6 + Math.random() * 0.4,
          speed: 0.02 + Math.random() * 0.03,
          segments: []
        };
        
        // Create multiple segments for each cloud to make them look streaky
        const numSegments = 3 + Math.floor(Math.random() * 4);
        for (let j = 0; j < numSegments; j++) {
          cloud.segments.push({
            x: j * (cloud.width / numSegments) + Math.random() * 20 - 10,
            y: Math.random() * 6 - 3,
            width: (cloud.width / numSegments) * (0.7 + Math.random() * 0.6),
            height: cloud.height * (0.5 + Math.random() * 1)
          });
        }
        
        cloudsRef.current.push(cloud);
      }
      
      // Add some very thin wispy clouds higher up
      for (let i = 0; i < 6; i++) {
        const cloud = {
          x: Math.random() * canvas.width * 1.8,
          y: Math.random() * canvas.height * 0.3 + canvas.height * 0.1,
          width: 150 + Math.random() * 250,
          height: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.3,
          speed: 0.01 + Math.random() * 0.02,
          segments: []
        };
        
        const numSegments = 2 + Math.floor(Math.random() * 3);
        for (let j = 0; j < numSegments; j++) {
          cloud.segments.push({
            x: j * (cloud.width / numSegments) + Math.random() * 15 - 7,
            y: Math.random() * 4 - 2,
            width: (cloud.width / numSegments) * (0.8 + Math.random() * 0.4),
            height: cloud.height * (0.6 + Math.random() * 0.8)
          });
        }
        
        cloudsRef.current.push(cloud);
      }
    };
    
    const drawCloud = (cloud: typeof cloudsRef.current[0]) => {
      context.save();
      context.globalAlpha = cloud.opacity;
      context.fillStyle = '#ffffff';
      
      // Draw each segment of the streaky cloud
      cloud.segments.forEach(segment => {
        context.beginPath();
        // Create thin horizontal streaks
        context.ellipse(
          cloud.x + segment.x, 
          cloud.y + segment.y, 
          segment.width * 0.5, 
          segment.height * 0.3, 
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
      
      // Create the vibrant blue sky gradient matching the reference image
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Vibrant blue colors from the reference image
      skyGradient.addColorStop(0, '#1B5AA0');      // Deep vibrant blue at top
      skyGradient.addColorStop(0.2, '#2B6BB0');    // Rich blue
      skyGradient.addColorStop(0.4, '#3B7BC0');    // Medium blue
      skyGradient.addColorStop(0.6, '#4B8BD0');    // Lighter blue
      skyGradient.addColorStop(0.8, '#5B9BE0');    // Even lighter blue
      skyGradient.addColorStop(1, '#6BABF0');      // Light blue at horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw clouds
      cloudsRef.current.forEach((cloud, index) => {
        // Very slow movement
        cloud.x += cloud.speed * 0.5;
        
        // Wrap around when cloud goes off screen
        if (cloud.x - cloud.width > canvas.width) {
          cloud.x = -cloud.width * 1.2;
          cloud.y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
        }
        
        // Very subtle opacity variation
        const baseOpacity = 0.7;
        cloud.opacity = baseOpacity + Math.sin(timeRef.current * 0.2 + index * 0.3) * 0.1;
        
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
