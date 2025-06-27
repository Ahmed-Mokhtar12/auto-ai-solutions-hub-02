
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
  density: number;
  type: 'cumulus' | 'stratus' | 'cirrus';
  windOffset: number;
  verticalDrift: number;
  time: number;
  rotation: number;
  shadowIntensity: number;
}

const SkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    const getCloudType = (): 'cumulus' | 'stratus' | 'cirrus' => {
      const rand = Math.random();
      if (rand < 0.5) return 'cumulus';
      if (rand < 0.8) return 'stratus';
      return 'cirrus';
    };

    const initClouds = () => {
      cloudsRef.current = [];
      const cloudCount = 12;
      
      for (let i = 0; i < cloudCount; i++) {
        const cloudType = getCloudType();
        const layer = Math.floor(Math.random() * 4);
        const baseY = 50 + (layer * 80) + Math.random() * 60;
        
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 2 - canvas.width * 0.5,
          y: baseY,
          baseY: baseY,
          size: cloudType === 'cumulus' ? 60 + Math.random() * 120 : 
                cloudType === 'stratus' ? 100 + Math.random() * 180 : 
                40 + Math.random() * 80,
          speed: (0.1 + Math.random() * 0.3) * (1 - layer * 0.2),
          opacity: Math.max(0.3, 0.9 - layer * 0.15),
          layer: layer,
          fluffiness: 0.7 + Math.random() * 0.3,
          density: 0.6 + Math.random() * 0.4,
          type: cloudType,
          windOffset: Math.random() * Math.PI * 2,
          verticalDrift: 0.5 + Math.random() * 1.5,
          time: Math.random() * 1000,
          rotation: (Math.random() - 0.5) * 0.1,
          shadowIntensity: 0.2 + Math.random() * 0.3
        });
      }
      
      // Sort by layer for proper depth rendering
      cloudsRef.current.sort((a, b) => b.layer - a.layer);
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initClouds();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const drawCloud = (cloud: Cloud, context: CanvasRenderingContext2D, globalTime: number) => {
      const { x, y, size, opacity, layer, fluffiness, density, type, shadowIntensity } = cloud;
      
      // Atmospheric perspective
      const distance = layer / 4;
      const atmosphericOpacity = opacity * (1 - distance * 0.3);
      const atmosphericSize = size * (1 - distance * 0.1);
      const atmosphericContrast = 1 - distance * 0.4;
      
      context.save();
      context.globalAlpha = atmosphericOpacity;
      
      // Apply slight rotation for more natural look
      context.translate(x, y);
      context.rotate(cloud.rotation);
      context.translate(-x, -y);
      
      if (type === 'cumulus') {
        drawCumulusCloud(context, x, y, atmosphericSize, fluffiness, density, atmosphericContrast, shadowIntensity);
      } else if (type === 'stratus') {
        drawStratusCloud(context, x, y, atmosphericSize, fluffiness, density, atmosphericContrast);
      } else {
        drawCirrusCloud(context, x, y, atmosphericSize, fluffiness, density, atmosphericContrast, globalTime + cloud.time);
      }
      
      context.restore();
    };

    const drawCumulusCloud = (
      context: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      fluffiness: number, 
      density: number,
      contrast: number,
      shadowIntensity: number
    ) => {
      // More natural cloud gradient with sun lighting
      const gradient = context.createRadialGradient(
        x - size * 0.2, y - size * 0.3, 0,
        x, y, size * 0.8
      );
      
      const highlight = `rgba(${255 * contrast}, ${255 * contrast}, ${255 * contrast}, 1)`;
      const midtone = `rgba(${248 * contrast}, ${250 * contrast}, ${252 * contrast}, 0.95)`;
      const shadow = `rgba(${220 * contrast}, ${225 * contrast}, ${235 * contrast}, 0.8)`;
      const darkShadow = `rgba(${180 * contrast}, ${190 * contrast}, ${210 * contrast}, ${0.6 * shadowIntensity})`;
      
      gradient.addColorStop(0, highlight);
      gradient.addColorStop(0.2, midtone);
      gradient.addColorStop(0.6, shadow);
      gradient.addColorStop(1, darkShadow);
      
      // Create more organic cloud shape
      const puffs = [
        { offsetX: 0, offsetY: -size * 0.15, scale: 1.2 * fluffiness },
        { offsetX: size * 0.4, offsetY: -size * 0.05, scale: 1.0 * fluffiness },
        { offsetX: -size * 0.35, offsetY: 0, scale: 1.1 * fluffiness },
        { offsetX: size * 0.2, offsetY: -size * 0.25, scale: 0.9 * fluffiness },
        { offsetX: -size * 0.25, offsetY: -size * 0.2, scale: 0.8 * fluffiness },
        { offsetX: size * 0.45, offsetY: size * 0.1, scale: 0.7 * fluffiness },
        { offsetX: -size * 0.4, offsetY: size * 0.15, scale: 0.75 * fluffiness },
        { offsetX: size * 0.1, offsetY: size * 0.2, scale: 0.6 * fluffiness },
        { offsetX: -size * 0.1, offsetY: size * 0.25, scale: 0.5 * fluffiness }
      ];
      
      context.fillStyle = gradient;
      
      puffs.forEach((puff) => {
        context.beginPath();
        context.arc(
          x + puff.offsetX,
          y + puff.offsetY,
          (size / 2.5) * puff.scale * density,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      // Add realistic bottom shadow
      const shadowGradient = context.createRadialGradient(
        x, y + size * 0.3, 0,
        x, y + size * 0.3, size * 0.6
      );
      shadowGradient.addColorStop(0, `rgba(160, 170, 190, ${0.4 * shadowIntensity})`);
      shadowGradient.addColorStop(0.7, `rgba(140, 150, 180, ${0.2 * shadowIntensity})`);
      shadowGradient.addColorStop(1, 'rgba(140, 150, 180, 0)');
      
      context.fillStyle = shadowGradient;
      context.beginPath();
      context.ellipse(x, y + size * 0.35, size * 0.8, size * 0.2, 0, 0, Math.PI * 2);
      context.fill();
    };

    const drawStratusCloud = (
      context: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      fluffiness: number, 
      density: number,
      contrast: number
    ) => {
      const gradient = context.createLinearGradient(
        x - size * 0.8, y - size * 0.2,
        x + size * 0.8, y + size * 0.3
      );
      
      gradient.addColorStop(0, `rgba(${255 * contrast}, ${255 * contrast}, ${255 * contrast}, 0.1)`);
      gradient.addColorStop(0.3, `rgba(${245 * contrast}, ${248 * contrast}, ${252 * contrast}, 0.8)`);
      gradient.addColorStop(0.7, `rgba(${230 * contrast}, ${235 * contrast}, ${245 * contrast}, 0.6)`);
      gradient.addColorStop(1, `rgba(${210 * contrast}, ${220 * contrast}, ${235 * contrast}, 0.2)`);
      
      context.fillStyle = gradient;
      
      // Create layered, stretched appearance
      for (let i = 0; i < 4; i++) {
        const offsetY = (i - 1.5) * size * 0.08;
        const scaleX = 1.2 + i * 0.1;
        const scaleY = 0.4 - i * 0.05;
        const layerOpacity = 0.8 - i * 0.15;
        
        context.save();
        context.globalAlpha *= layerOpacity;
        
        context.beginPath();
        context.ellipse(
          x, y + offsetY,
          size * scaleX * density,
          size * scaleY * fluffiness,
          0, 0, Math.PI * 2
        );
        context.fill();
        
        context.restore();
      }
    };

    const drawCirrusCloud = (
      context: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      fluffiness: number, 
      density: number,
      contrast: number,
      animationTime: number
    ) => {
      context.strokeStyle = `rgba(${255 * contrast}, ${255 * contrast}, ${255 * contrast}, ${0.6 * density})`;
      context.lineWidth = Math.max(1, size * 0.015);
      context.lineCap = 'round';
      
      // Create wispy, animated streaks
      for (let i = 0; i < 12; i++) {
        const streak = i / 12;
        const timeOffset = animationTime * 0.001 + streak * Math.PI;
        
        const startX = x - size * 0.7 + streak * size * 1.4;
        const startY = y - size * 0.3 + Math.sin(timeOffset) * size * 0.1;
        const endX = startX + size * 0.6 + Math.sin(timeOffset * 0.7) * size * 0.3;
        const endY = startY + Math.cos(timeOffset * 0.5) * size * 0.2;
        
        const opacity = (0.3 + Math.sin(timeOffset * 0.3) * 0.2) * density * fluffiness;
        context.strokeStyle = `rgba(${255 * contrast}, ${255 * contrast}, ${255 * contrast}, ${opacity})`;
        
        context.beginPath();
        context.moveTo(startX, startY);
        
        const controlX = startX + (endX - startX) * 0.5 + Math.sin(timeOffset * 1.3) * size * 0.2;
        const controlY = startY + (endY - startY) * 0.5 + Math.cos(timeOffset * 1.1) * size * 0.15;
        
        context.quadraticCurveTo(controlX, controlY, endX, endY);
        context.stroke();
      }
    };
    
    const animate = () => {
      timeRef.current += 0.016;
      
      // Dynamic sky gradient based on time
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      const timeVariation = Math.sin(timeRef.current * 0.1) * 0.1;
      const r1 = Math.floor(74 + timeVariation * 20);
      const g1 = Math.floor(144 + timeVariation * 30);
      const b1 = Math.floor(226 + timeVariation * 20);
      
      skyGradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
      skyGradient.addColorStop(0.15, `rgb(${r1 + 20}, ${g1 + 30}, ${b1 + 15})`);
      skyGradient.addColorStop(0.3, `rgb(${r1 + 45}, ${g1 + 45}, ${b1 + 10})`);
      skyGradient.addColorStop(0.5, '#B8E6FF');
      skyGradient.addColorStop(0.7, '#D4F1FF');
      skyGradient.addColorStop(0.85, '#E8F7FF');
      skyGradient.addColorStop(1, '#F5FCFF');
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Atmospheric haze with subtle animation
      const hazeGradient = context.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
      const hazeIntensity = 0.15 + Math.sin(timeRef.current * 0.05) * 0.05;
      hazeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hazeGradient.addColorStop(0.5, `rgba(248, 252, 255, ${hazeIntensity})`);
      hazeGradient.addColorStop(1, `rgba(240, 248, 255, ${hazeIntensity + 0.1})`);
      
      context.fillStyle = hazeGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animate clouds with more natural movement
      cloudsRef.current.forEach(cloud => {
        cloud.time += 0.016;
        
        // Wind effect with turbulence
        const windForce = Math.sin(cloud.time * 0.02 + cloud.windOffset) * 0.5;
        cloud.x += cloud.speed + windForce * 0.1;
        
        // Natural vertical drift
        const verticalWave = Math.sin(cloud.time * 0.01 + cloud.windOffset) * cloud.verticalDrift;
        const turbulence = Math.sin(cloud.time * 0.03 + cloud.windOffset * 2) * 0.3;
        cloud.y = cloud.baseY + verticalWave + turbulence;
        
        // Subtle size variation for breathing effect
        const breathingEffect = 1 + Math.sin(cloud.time * 0.008) * 0.05;
        const currentSize = cloud.size * breathingEffect;
        
        drawCloud({ ...cloud, size: currentSize }, context, timeRef.current);
        
        // Reset cloud position when off screen
        if (cloud.x - cloud.size > canvas.width + 200) {
          cloud.x = -cloud.size - Math.random() * 400;
          cloud.baseY = 50 + (cloud.layer * 80) + Math.random() * 60;
          cloud.y = cloud.baseY;
          cloud.windOffset = Math.random() * Math.PI * 2;
          cloud.type = getCloudType();
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
