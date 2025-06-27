
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
    type: 'main' | 'wispy' | 'small';
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
      
      // Main large clouds (like in the image)
      for (let i = 0; i < 8; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.2,
          y: Math.random() * canvas.height * 0.4 + canvas.height * 0.2,
          width: 150 + Math.random() * 200,
          height: 30 + Math.random() * 40,
          opacity: 0.8 + Math.random() * 0.2,
          speed: 0.05 + Math.random() * 0.1,
          type: 'main'
        });
      }
      
      // Wispy thin clouds
      for (let i = 0; i < 12; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.3,
          y: Math.random() * canvas.height * 0.5 + canvas.height * 0.15,
          width: 100 + Math.random() * 150,
          height: 8 + Math.random() * 15,
          opacity: 0.4 + Math.random() * 0.4,
          speed: 0.03 + Math.random() * 0.07,
          type: 'wispy'
        });
      }
      
      // Small scattered clouds
      for (let i = 0; i < 15; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.4,
          y: Math.random() * canvas.height * 0.6 + canvas.height * 0.1,
          width: 40 + Math.random() * 80,
          height: 15 + Math.random() * 25,
          opacity: 0.3 + Math.random() * 0.5,
          speed: 0.02 + Math.random() * 0.05,
          type: 'small'
        });
      }
    };
    
    const drawCloud = (cloud: typeof cloudsRef.current[0]) => {
      context.save();
      context.globalAlpha = cloud.opacity;
      context.fillStyle = '#ffffff';
      
      const centerX = cloud.x;
      const centerY = cloud.y;
      
      if (cloud.type === 'main') {
        // Large main clouds with realistic shape
        context.beginPath();
        context.ellipse(centerX, centerY, cloud.width * 0.3, cloud.height * 0.6, 0, 0, Math.PI * 2);
        context.ellipse(centerX - cloud.width * 0.2, centerY + cloud.height * 0.1, cloud.width * 0.25, cloud.height * 0.5, 0, 0, Math.PI * 2);
        context.ellipse(centerX + cloud.width * 0.15, centerY - cloud.height * 0.1, cloud.width * 0.2, cloud.height * 0.4, 0, 0, Math.PI * 2);
        context.ellipse(centerX - cloud.width * 0.1, centerY - cloud.height * 0.2, cloud.width * 0.15, cloud.height * 0.3, 0, 0, Math.PI * 2);
        context.fill();
      } else if (cloud.type === 'wispy') {
        // Very thin wispy clouds
        context.beginPath();
        context.ellipse(centerX, centerY, cloud.width * 0.4, cloud.height * 0.3, 0, 0, Math.PI * 2);
        context.ellipse(centerX + cloud.width * 0.2, centerY, cloud.width * 0.3, cloud.height * 0.2, 0, 0, Math.PI * 2);
        context.fill();
      } else {
        // Small scattered clouds
        context.beginPath();
        context.ellipse(centerX, centerY, cloud.width * 0.2, cloud.height * 0.4, 0, 0, Math.PI * 2);
        context.ellipse(centerX + cloud.width * 0.1, centerY, cloud.width * 0.15, cloud.height * 0.3, 0, 0, Math.PI * 2);
        context.fill();
      }
      
      context.restore();
    };
    
    const animate = () => {
      timeRef.current += 0.002;
      
      // Exact gradient to match the reference image
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Colors from the reference image - deep blue at top transitioning to very light blue/white at bottom
      skyGradient.addColorStop(0, '#1e6ba8');      // Deep blue at very top
      skyGradient.addColorStop(0.15, '#2b7bc4');   // Medium blue
      skyGradient.addColorStop(0.35, '#4a9de0');   // Lighter blue
      skyGradient.addColorStop(0.55, '#7bb8ea');   // Much lighter blue
      skyGradient.addColorStop(0.75, '#a8d1f0');   // Very light blue
      skyGradient.addColorStop(0.9, '#d0e7f7');    // Almost white with hint of blue
      skyGradient.addColorStop(1, '#e8f4fb');      // Very light blue-white at bottom
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw clouds
      cloudsRef.current.forEach((cloud, index) => {
        // Very slow natural movement
        cloud.x += cloud.speed * 0.3;
        
        // Wrap around when cloud goes off screen
        if (cloud.x - cloud.width > canvas.width) {
          cloud.x = -cloud.width * 1.5;
          cloud.y = Math.random() * canvas.height * 0.6 + canvas.height * 0.1;
        }
        
        // Very subtle opacity variation for natural look
        const baseOpacity = cloud.type === 'main' ? 0.9 : cloud.type === 'wispy' ? 0.6 : 0.4;
        cloud.opacity = baseOpacity + Math.sin(timeRef.current * 0.3 + index * 0.5) * 0.1;
        
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
