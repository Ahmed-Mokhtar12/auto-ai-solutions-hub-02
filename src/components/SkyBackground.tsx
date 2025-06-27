
import React, { useEffect, useRef } from 'react';

interface Cloud {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  layer: number;
  fluffiness: number;
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

    // Initialize clouds with more realistic properties
    const initClouds = () => {
      cloudsRef.current = [];
      const cloudCount = 12;
      
      for (let i = 0; i < cloudCount; i++) {
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.5,
          y: 50 + Math.random() * (canvas.height * 0.5),
          size: 60 + Math.random() * 120,
          speed: 0.1 + Math.random() * 0.4,
          opacity: 0.4 + Math.random() * 0.5,
          layer: Math.floor(Math.random() * 3),
          fluffiness: 0.7 + Math.random() * 0.3
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
    
    // Draw a more realistic cloud
    const drawCloud = (cloud: Cloud, context: CanvasRenderingContext2D) => {
      const { x, y, size, opacity, layer, fluffiness } = cloud;
      
      // Adjust properties based on layer for depth
      const layerOpacity = opacity * (1 - layer * 0.15);
      const layerSize = size * (1 - layer * 0.1);
      
      context.save();
      context.globalAlpha = layerOpacity;
      
      // Create more realistic cloud with gradient and shadows
      const gradient = context.createRadialGradient(
        x, y - layerSize * 0.1, 0,
        x, y, layerSize * 0.8
      );
      
      // More realistic cloud colors
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.3, '#F8F8FF');
      gradient.addColorStop(0.7, '#F0F0F0');
      gradient.addColorStop(1, '#E8E8E8');
      
      context.fillStyle = gradient;
      
      // Create cloud with more natural, irregular shape
      const circles = [
        // Main body
        { offsetX: 0, offsetY: 0, scale: 1 * fluffiness },
        { offsetX: layerSize * 0.4, offsetY: layerSize * 0.05, scale: 0.85 * fluffiness },
        { offsetX: -layerSize * 0.35, offsetY: layerSize * 0.1, scale: 0.9 * fluffiness },
        { offsetX: layerSize * 0.2, offsetY: -layerSize * 0.15, scale: 0.75 * fluffiness },
        { offsetX: -layerSize * 0.25, offsetY: -layerSize * 0.1, scale: 0.65 * fluffiness },
        // Additional puffs for more realistic shape
        { offsetX: layerSize * 0.5, offsetY: layerSize * 0.2, scale: 0.6 * fluffiness },
        { offsetX: -layerSize * 0.4, offsetY: layerSize * 0.25, scale: 0.55 * fluffiness },
        { offsetX: layerSize * 0.1, offsetY: layerSize * 0.3, scale: 0.5 * fluffiness },
      ];
      
      // Draw cloud base with soft edges
      circles.forEach((circle) => {
        const circleGradient = context.createRadialGradient(
          x + circle.offsetX, y + circle.offsetY, 0,
          x + circle.offsetX, y + circle.offsetY, (layerSize / 2) * circle.scale
        );
        
        circleGradient.addColorStop(0, '#FFFFFF');
        circleGradient.addColorStop(0.6, '#F5F5F5');
        circleGradient.addColorStop(1, 'rgba(240, 240, 240, 0.3)');
        
        context.fillStyle = circleGradient;
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
      
      // Add subtle shadow/depth to bottom of cloud
      context.globalAlpha = layerOpacity * 0.3;
      const shadowGradient = context.createLinearGradient(
        x, y + layerSize * 0.3, 
        x, y + layerSize * 0.6
      );
      shadowGradient.addColorStop(0, 'rgba(200, 200, 200, 0.4)');
      shadowGradient.addColorStop(1, 'rgba(180, 180, 180, 0.1)');
      
      context.fillStyle = shadowGradient;
      context.beginPath();
      context.ellipse(x, y + layerSize * 0.4, layerSize * 0.6, layerSize * 0.2, 0, 0, Math.PI * 2);
      context.fill();
      
      context.restore();
    };
    
    // Animation loop
    const animate = () => {
      // Create more realistic sky gradient
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // More natural sky colors throughout the day
      gradient.addColorStop(0, '#4A90E2');
      gradient.addColorStop(0.15, '#5BA0F2');
      gradient.addColorStop(0.35, '#87CEEB');
      gradient.addColorStop(0.55, '#B8E6FF');
      gradient.addColorStop(0.75, '#E0F4FF');
      gradient.addColorStop(0.9, '#F0F8FF');
      gradient.addColorStop(1, '#FAFCFF');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle atmospheric haze near horizon
      const hazeGradient = context.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
      hazeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hazeGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      hazeGradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      
      context.fillStyle = hazeGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and animate clouds
      cloudsRef.current.forEach(cloud => {
        drawCloud(cloud, context);
        
        // Move cloud with slight vertical drift
        cloud.x += cloud.speed;
        cloud.y += (Math.sin(cloud.x * 0.001) * 0.1);
        
        // Reset cloud if it moves off screen
        if (cloud.x - cloud.size > canvas.width) {
          cloud.x = -cloud.size - Math.random() * 200;
          cloud.y = 50 + Math.random() * (canvas.height * 0.5);
          cloud.fluffiness = 0.7 + Math.random() * 0.3;
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
