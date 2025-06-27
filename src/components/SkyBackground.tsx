
import React, { useEffect, useRef } from 'react';

interface Cloud {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  layer: number;
}

const SkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const frameRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    // Initialize clouds
    const initClouds = () => {
      cloudsRef.current = [];
      const cloudCount = 8;
      
      for (let i = 0; i < cloudCount; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.6, // Keep clouds in upper portion
          size: 40 + Math.random() * 80,
          speed: 0.2 + Math.random() * 0.3,
          opacity: 0.3 + Math.random() * 0.4,
          layer: Math.floor(Math.random() * 3) // 0, 1, or 2 for depth
        });
      }
    };
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initClouds();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Draw a single cloud
    const drawCloud = (cloud: Cloud, context: CanvasRenderingContext2D) => {
      const { x, y, size, opacity, layer } = cloud;
      
      // Adjust opacity and size based on layer for depth effect
      const layerOpacity = opacity * (1 - layer * 0.2);
      const layerSize = size * (1 - layer * 0.1);
      
      context.save();
      context.globalAlpha = layerOpacity;
      context.fillStyle = '#FFFFFF';
      
      // Draw cloud as multiple overlapping circles
      const circles = [
        { offsetX: 0, offsetY: 0, scale: 1 },
        { offsetX: layerSize * 0.3, offsetY: layerSize * 0.1, scale: 0.8 },
        { offsetX: -layerSize * 0.2, offsetY: layerSize * 0.15, scale: 0.9 },
        { offsetX: layerSize * 0.1, offsetY: -layerSize * 0.1, scale: 0.7 },
        { offsetX: -layerSize * 0.3, offsetY: -layerSize * 0.05, scale: 0.6 }
      ];
      
      circles.forEach(circle => {
        context.beginPath();
        context.arc(
          x + circle.offsetX,
          y + circle.offsetY,
          (layerSize / 2) * circle.scale,
          0,
          Math.PI * 2
        );
        context.fill();
      });
      
      context.restore();
    };
    
    // Animation loop
    const animate = () => {
      // Create sky gradient
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB'); // Sky blue at top
      gradient.addColorStop(0.3, '#B0E0E6'); // Powder blue
      gradient.addColorStop(0.7, '#E0F6FF'); // Very light blue
      gradient.addColorStop(1, '#F0F8FF'); // Alice blue at bottom
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and animate clouds
      cloudsRef.current.forEach(cloud => {
        drawCloud(cloud, context);
        
        // Move cloud
        cloud.x += cloud.speed;
        
        // Reset cloud if it moves off screen
        if (cloud.x - cloud.size > canvas.width) {
          cloud.x = -cloud.size;
          cloud.y = Math.random() * canvas.height * 0.6;
        }
      });
      
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
