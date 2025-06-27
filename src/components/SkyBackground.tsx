
import React, { useEffect, useRef } from 'react';

interface Cloud {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  layer: number;
  fluffiness: number;
  baseY: number;
  density: number; // Cloud density for more realistic appearance
  type: 'cumulus' | 'stratus' | 'cirrus'; // Different cloud types
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

    // Get random cloud type for natural variation
    const getCloudType = (): 'cumulus' | 'stratus' | 'cirrus' => {
      const rand = Math.random();
      if (rand < 0.6) return 'cumulus'; // Most common
      if (rand < 0.85) return 'stratus';
      return 'cirrus';
    };

    // Initialize clouds with natural properties
    const initClouds = () => {
      cloudsRef.current = [];
      const cloudCount = 8; // Fewer clouds for more realistic sky
      
      for (let i = 0; i < cloudCount; i++) {
        const cloudType = getCloudType();
        const baseY = 20 + Math.random() * (canvas.height * 0.4); // Higher in sky
        
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 1.8,
          y: baseY,
          baseY: baseY,
          size: cloudType === 'cumulus' ? 80 + Math.random() * 140 : 
                cloudType === 'stratus' ? 120 + Math.random() * 200 : 
                60 + Math.random() * 100,
          speed: 0.01 + Math.random() * 0.03, // Very slow, natural speed
          opacity: cloudType === 'cumulus' ? 0.8 + Math.random() * 0.2 :
                   cloudType === 'stratus' ? 0.6 + Math.random() * 0.3 :
                   0.3 + Math.random() * 0.4,
          layer: Math.floor(Math.random() * 3),
          fluffiness: cloudType === 'cumulus' ? 0.8 + Math.random() * 0.2 :
                      cloudType === 'stratus' ? 0.4 + Math.random() * 0.3 :
                      0.6 + Math.random() * 0.3,
          density: 0.7 + Math.random() * 0.3,
          type: cloudType
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
    
    // Draw realistic clouds based on type
    const drawCloud = (cloud: Cloud, context: CanvasRenderingContext2D) => {
      const { x, y, size, opacity, layer, fluffiness, density, type } = cloud;
      
      // Adjust properties for atmospheric perspective
      const layerOpacity = opacity * (1 - layer * 0.12);
      const layerSize = size * (1 - layer * 0.08);
      
      context.save();
      context.globalAlpha = layerOpacity;
      
      if (type === 'cumulus') {
        drawCumulusCloud(context, x, y, layerSize, fluffiness, density);
      } else if (type === 'stratus') {
        drawStratusCloud(context, x, y, layerSize, fluffiness, density);
      } else {
        drawCirrusCloud(context, x, y, layerSize, fluffiness, density);
      }
      
      context.restore();
    };

    // Draw puffy cumulus clouds
    const drawCumulusCloud = (context: CanvasRenderingContext2D, x: number, y: number, size: number, fluffiness: number, density: number) => {
      // Natural cloud gradient
      const gradient = context.createRadialGradient(
        x, y - size * 0.15, 0,
        x, y + size * 0.1, size * 0.9
      );
      
      // More natural cloud colors - bright white on top, shadowed bottom
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.3, '#FAFAFA');
      gradient.addColorStop(0.6, '#F0F0F0');
      gradient.addColorStop(0.8, '#E8E8E8');
      gradient.addColorStop(1, '#D0D0D0');
      
      // Create irregular, natural cloud shape
      const puffs = [
        { offsetX: 0, offsetY: -size * 0.1, scale: 1.1 * fluffiness },
        { offsetX: size * 0.35, offsetY: 0, scale: 0.9 * fluffiness },
        { offsetX: -size * 0.3, offsetY: size * 0.05, scale: 0.95 * fluffiness },
        { offsetX: size * 0.15, offsetY: -size * 0.2, scale: 0.8 * fluffiness },
        { offsetX: -size * 0.2, offsetY: -size * 0.15, scale: 0.7 * fluffiness },
        { offsetX: size * 0.4, offsetY: size * 0.15, scale: 0.6 * fluffiness },
        { offsetX: -size * 0.35, offsetY: size * 0.2, scale: 0.65 * fluffiness },
      ];
      
      context.fillStyle = gradient;
      
      puffs.forEach((puff) => {
        context.beginPath();
        context.arc(
          x + puff.offsetX,
          y + puff.offsetY,
          (size / 2.2) * puff.scale * density,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      // Add shadow to bottom of cloud
      const shadowGradient = context.createLinearGradient(
        x, y + size * 0.2,
        x, y + size * 0.5
      );
      shadowGradient.addColorStop(0, 'rgba(180, 180, 180, 0.3)');
      shadowGradient.addColorStop(1, 'rgba(160, 160, 160, 0.1)');
      
      context.fillStyle = shadowGradient;
      context.beginPath();
      context.ellipse(x, y + size * 0.3, size * 0.7, size * 0.15, 0, 0, Math.PI * 2);
      context.fill();
    };

    // Draw stretched stratus clouds
    const drawStratusCloud = (context: CanvasRenderingContext2D, x: number, y: number, size: number, fluffiness: number, density: number) => {
      const gradient = context.createLinearGradient(
        x - size, y - size * 0.3,
        x + size, y + size * 0.3
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(0.2, '#F8F8F8');
      gradient.addColorStop(0.5, '#F0F0F0');
      gradient.addColorStop(0.8, '#E8E8E8');
      gradient.addColorStop(1, 'rgba(220, 220, 220, 0.3)');
      
      context.fillStyle = gradient;
      
      // Create stretched, layered appearance
      for (let i = 0; i < 3; i++) {
        const offsetY = (i - 1) * size * 0.1;
        const scaleX = 1 + i * 0.1;
        const scaleY = 0.6 - i * 0.1;
        
        context.beginPath();
        context.ellipse(
          x, y + offsetY,
          size * scaleX * density,
          size * scaleY * fluffiness,
          0, 0, Math.PI * 2
        );
        context.fill();
      }
    };

    // Draw wispy cirrus clouds
    const drawCirrusCloud = (context: CanvasRenderingContext2D, x: number, y: number, size: number, fluffiness: number, density: number) => {
      context.strokeStyle = `rgba(255, 255, 255, ${0.4 * density})`;
      context.lineWidth = size * 0.02;
      context.lineCap = 'round';
      
      // Create wispy, streaky patterns
      for (let i = 0; i < 8; i++) {
        const startX = x - size * 0.6 + Math.random() * size * 1.2;
        const startY = y - size * 0.2 + Math.random() * size * 0.4;
        const endX = startX + size * 0.8 + Math.random() * size * 0.4;
        const endY = startY + (Math.random() - 0.5) * size * 0.3;
        
        context.beginPath();
        context.moveTo(startX, startY);
        
        // Create curved, natural streaks
        const controlX = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * size * 0.3;
        const controlY = startY + (endY - startY) * 0.5 + (Math.random() - 0.5) * size * 0.2;
        
        context.quadraticCurveTo(controlX, controlY, endX, endY);
        context.stroke();
      }
    };
    
    // Animation loop
    const animate = () => {
      // Create natural sky gradient - like real daytime sky
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Natural daytime sky colors
      skyGradient.addColorStop(0, '#4A90E2');    // Deep blue at zenith
      skyGradient.addColorStop(0.1, '#5BA3F5');  // Medium blue
      skyGradient.addColorStop(0.25, '#7BB9F7'); // Lighter blue
      skyGradient.addColorStop(0.4, '#96D0FA');  // Sky blue
      skyGradient.addColorStop(0.6, '#B8E6FF');  // Very light blue
      skyGradient.addColorStop(0.75, '#D4F1FF'); // Almost white blue
      skyGradient.addColorStop(0.9, '#E8F7FF');  // Near horizon
      skyGradient.addColorStop(1, '#F5FCFF');    // Horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add very subtle atmospheric haze near horizon
      const hazeGradient = context.createLinearGradient(0, canvas.height * 0.75, 0, canvas.height);
      hazeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hazeGradient.addColorStop(0.7, 'rgba(248, 252, 255, 0.15)');
      hazeGradient.addColorStop(1, 'rgba(240, 248, 255, 0.25)');
      
      context.fillStyle = hazeGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and animate clouds naturally
      cloudsRef.current.forEach(cloud => {
        drawCloud(cloud, context);
        
        // Very slow horizontal movement
        cloud.x += cloud.speed;
        
        // Extremely subtle vertical drift
        const driftAmount = Math.sin((cloud.x * 0.0003) + (Date.now() * 0.00005)) * 0.5;
        cloud.y = cloud.baseY + driftAmount;
        
        // Reset cloud when off screen
        if (cloud.x - cloud.size > canvas.width) {
          cloud.x = -cloud.size - Math.random() * 300;
          const newBaseY = 20 + Math.random() * (canvas.height * 0.4);
          cloud.baseY = newBaseY;
          cloud.y = newBaseY;
          cloud.type = getCloudType();
          cloud.fluffiness = cloud.type === 'cumulus' ? 0.8 + Math.random() * 0.2 :
                            cloud.type === 'stratus' ? 0.4 + Math.random() * 0.3 :
                            0.6 + Math.random() * 0.3;
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
