
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
      const cloudCount = 8; // Reduced for more realistic look
      
      for (let i = 0; i < cloudCount; i++) {
        const cloudType = getCloudType();
        const layer = Math.floor(Math.random() * 3);
        const baseY = 80 + (layer * 120) + Math.random() * 80;
        
        cloudsRef.current.push({
          x: Math.random() * canvas.width * 2 - canvas.width * 0.5,
          y: baseY,
          baseY: baseY,
          size: cloudType === 'cumulus' ? 80 + Math.random() * 140 : 
                cloudType === 'stratus' ? 120 + Math.random() * 200 : 
                60 + Math.random() * 100,
          speed: (0.02 + Math.random() * 0.08) * (1 - layer * 0.3), // Much slower speed
          opacity: Math.max(0.4, 0.8 - layer * 0.12),
          layer: layer,
          fluffiness: 0.8 + Math.random() * 0.2,
          density: 0.7 + Math.random() * 0.3,
          type: cloudType,
          windOffset: Math.random() * Math.PI * 2,
          verticalDrift: 0.2 + Math.random() * 0.6, // Slower vertical movement
          time: Math.random() * 1000,
          rotation: (Math.random() - 0.5) * 0.05,
          shadowIntensity: 0.15 + Math.random() * 0.25
        });
      }
      
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
      
      const distance = layer / 3;
      const atmosphericOpacity = opacity * (1 - distance * 0.25);
      const atmosphericSize = size * (1 - distance * 0.08);
      const atmosphericContrast = 1 - distance * 0.3;
      
      context.save();
      context.globalAlpha = atmosphericOpacity;
      
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
      // Lighter, more realistic cloud gradient
      const gradient = context.createRadialGradient(
        x - size * 0.3, y - size * 0.4, 0,
        x, y, size * 0.9
      );
      
      const highlight = `rgba(${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, 0.95)`;
      const midtone = `rgba(${Math.floor(250 * contrast)}, ${Math.floor(252 * contrast)}, ${Math.floor(255 * contrast)}, 0.9)`;
      const shadow = `rgba(${Math.floor(235 * contrast)}, ${Math.floor(240 * contrast)}, ${Math.floor(250 * contrast)}, 0.7)`;
      const darkShadow = `rgba(${Math.floor(200 * contrast)}, ${Math.floor(210 * contrast)}, ${Math.floor(230 * contrast)}, ${0.4 * shadowIntensity})`;
      
      gradient.addColorStop(0, highlight);
      gradient.addColorStop(0.3, midtone);
      gradient.addColorStop(0.7, shadow);
      gradient.addColorStop(1, darkShadow);
      
      const puffs = [
        { offsetX: 0, offsetY: -size * 0.12, scale: 1.1 * fluffiness },
        { offsetX: size * 0.35, offsetY: -size * 0.08, scale: 0.9 * fluffiness },
        { offsetX: -size * 0.3, offsetY: 0, scale: 1.0 * fluffiness },
        { offsetX: size * 0.25, offsetY: -size * 0.2, scale: 0.8 * fluffiness },
        { offsetX: -size * 0.2, offsetY: -size * 0.15, scale: 0.75 * fluffiness },
        { offsetX: size * 0.4, offsetY: size * 0.08, scale: 0.65 * fluffiness },
        { offsetX: -size * 0.35, offsetY: size * 0.12, scale: 0.7 * fluffiness }
      ];
      
      context.fillStyle = gradient;
      
      puffs.forEach((puff) => {
        context.beginPath();
        context.arc(
          x + puff.offsetX,
          y + puff.offsetY,
          (size / 2.8) * puff.scale * density,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      // Subtle bottom shadow
      const shadowGradient = context.createRadialGradient(
        x, y + size * 0.25, 0,
        x, y + size * 0.25, size * 0.5
      );
      shadowGradient.addColorStop(0, `rgba(180, 190, 210, ${0.3 * shadowIntensity})`);
      shadowGradient.addColorStop(1, 'rgba(180, 190, 210, 0)');
      
      context.fillStyle = shadowGradient;
      context.beginPath();
      context.ellipse(x, y + size * 0.3, size * 0.7, size * 0.15, 0, 0, Math.PI * 2);
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
        x - size * 0.9, y - size * 0.15,
        x + size * 0.9, y + size * 0.25
      );
      
      gradient.addColorStop(0, `rgba(${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, 0.2)`);
      gradient.addColorStop(0.4, `rgba(${Math.floor(248 * contrast)}, ${Math.floor(250 * contrast)}, ${Math.floor(255 * contrast)}, 0.7)`);
      gradient.addColorStop(0.8, `rgba(${Math.floor(240 * contrast)}, ${Math.floor(245 * contrast)}, ${Math.floor(252 * contrast)}, 0.5)`);
      gradient.addColorStop(1, `rgba(${Math.floor(230 * contrast)}, ${Math.floor(235 * contrast)}, ${Math.floor(248 * contrast)}, 0.3)`);
      
      context.fillStyle = gradient;
      
      for (let i = 0; i < 3; i++) {
        const offsetY = (i - 1) * size * 0.06;
        const scaleX = 1.3 + i * 0.1;
        const scaleY = 0.35 - i * 0.03;
        const layerOpacity = 0.7 - i * 0.1;
        
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
      context.strokeStyle = `rgba(${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, ${0.5 * density})`;
      context.lineWidth = Math.max(0.8, size * 0.012);
      context.lineCap = 'round';
      
      for (let i = 0; i < 8; i++) {
        const streak = i / 8;
        const timeOffset = animationTime * 0.0005 + streak * Math.PI; // Slower animation
        
        const startX = x - size * 0.6 + streak * size * 1.2;
        const startY = y - size * 0.25 + Math.sin(timeOffset) * size * 0.08;
        const endX = startX + size * 0.5 + Math.sin(timeOffset * 0.6) * size * 0.25;
        const endY = startY + Math.cos(timeOffset * 0.4) * size * 0.15;
        
        const opacity = (0.4 + Math.sin(timeOffset * 0.2) * 0.15) * density * fluffiness;
        context.strokeStyle = `rgba(${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, ${Math.floor(255 * contrast)}, ${opacity})`;
        
        context.beginPath();
        context.moveTo(startX, startY);
        
        const controlX = startX + (endX - startX) * 0.5 + Math.sin(timeOffset * 1.1) * size * 0.15;
        const controlY = startY + (endY - startY) * 0.5 + Math.cos(timeOffset * 0.9) * size * 0.1;
        
        context.quadraticCurveTo(controlX, controlY, endX, endY);
        context.stroke();
      }
    };
    
    const animate = () => {
      timeRef.current += 0.008; // Slower time progression
      
      // Light blue daytime sky gradient
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      const timeVariation = Math.sin(timeRef.current * 0.05) * 0.05; // Slower variation
      const r1 = Math.floor(135 + timeVariation * 15); // Light blue base
      const g1 = Math.floor(206 + timeVariation * 20);
      const b1 = Math.floor(250 + timeVariation * 5);
      
      skyGradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
      skyGradient.addColorStop(0.2, `rgb(${r1 + 10}, ${g1 + 15}, ${b1})`);
      skyGradient.addColorStop(0.4, `rgb(${r1 + 25}, ${g1 + 20}, ${b1})`);
      skyGradient.addColorStop(0.6, '#E6F3FF');
      skyGradient.addColorStop(0.8, '#F0F8FF');
      skyGradient.addColorStop(1, '#F8FCFF');
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Subtle atmospheric haze
      const hazeGradient = context.createLinearGradient(0, canvas.height * 0.8, 0, canvas.height);
      const hazeIntensity = 0.08 + Math.sin(timeRef.current * 0.03) * 0.02;
      hazeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      hazeGradient.addColorStop(0.6, `rgba(250, 253, 255, ${hazeIntensity})`);
      hazeGradient.addColorStop(1, `rgba(245, 250, 255, ${hazeIntensity + 0.05})`);
      
      context.fillStyle = hazeGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animate clouds with much slower movement
      cloudsRef.current.forEach(cloud => {
        cloud.time += 0.008; // Slower time progression
        
        // Gentle wind effect
        const windForce = Math.sin(cloud.time * 0.01 + cloud.windOffset) * 0.2;
        cloud.x += cloud.speed + windForce * 0.05;
        
        // Subtle vertical drift
        const verticalWave = Math.sin(cloud.time * 0.005 + cloud.windOffset) * cloud.verticalDrift;
        const turbulence = Math.sin(cloud.time * 0.015 + cloud.windOffset * 2) * 0.15;
        cloud.y = cloud.baseY + verticalWave + turbulence;
        
        // Very subtle size variation
        const breathingEffect = 1 + Math.sin(cloud.time * 0.004) * 0.02;
        const currentSize = cloud.size * breathingEffect;
        
        drawCloud({ ...cloud, size: currentSize }, context, timeRef.current);
        
        // Reset cloud position when off screen
        if (cloud.x - cloud.size > canvas.width + 300) {
          cloud.x = -cloud.size - Math.random() * 600;
          cloud.baseY = 80 + (cloud.layer * 120) + Math.random() * 80;
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
