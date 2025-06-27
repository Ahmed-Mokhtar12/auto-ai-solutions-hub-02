import React, { useEffect, useRef } from 'react';

interface Jet {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  active: boolean;
  angle: number;
}

const SkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const jetRef = useRef<Jet>({
    x: -100,
    y: 0,
    speed: 1.5,
    size: 1,
    opacity: 0.8,
    active: false,
    angle: 0
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const drawSun = (sunX: number, sunY: number) => {
      context.save();
      
      // Sun outer glow - doubled from 80 to 160
      const sunGlow = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 160);
      sunGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      sunGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      sunGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = sunGlow;
      context.beginPath();
      context.arc(sunX, sunY, 160, 0, Math.PI * 2);
      context.fill();
      
      // Sun core - doubled from 25 to 50
      const sunCore = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 50);
      sunCore.addColorStop(0, '#ffffff');
      sunCore.addColorStop(0.7, '#ffffff');
      sunCore.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      
      context.fillStyle = sunCore;
      context.beginPath();
      context.arc(sunX, sunY, 50, 0, Math.PI * 2);
      context.fill();
      
      context.restore();
    };
    
    const drawJet = (jet: Jet) => {
      if (!jet.active) return;
      
      context.save();
      context.translate(jet.x, jet.y);
      context.rotate(jet.angle);
      context.globalAlpha = jet.opacity;
      
      const jetLength = 20 * jet.size;
      const jetWidth = 4 * jet.size;
      
      // Jet body (main fuselage)
      context.fillStyle = '#C0C0C0';
      context.fillRect(-jetLength/2, -jetWidth/2, jetLength, jetWidth);
      
      // Jet nose (pointed front)
      context.fillStyle = '#A0A0A0';
      context.beginPath();
      context.moveTo(jetLength/2, 0);
      context.lineTo(jetLength/2 - 6 * jet.size, -jetWidth/2);
      context.lineTo(jetLength/2 - 6 * jet.size, jetWidth/2);
      context.closePath();
      context.fill();
      
      // Wings
      context.fillStyle = '#B0B0B0';
      context.fillRect(-jetLength/4, -jetWidth * 1.5, jetLength/2, jetWidth/2);
      context.fillRect(-jetLength/4, jetWidth, jetLength/2, jetWidth/2);
      
      // Engine trail (subtle white trail)
      context.fillStyle = 'rgba(255, 255, 255, 0.3)';
      context.fillRect(-jetLength/2 - 8 * jet.size, -jetWidth/4, 8 * jet.size, jetWidth/2);
      
      context.restore();
    };
    
    const triggerJet = () => {
      if (!jetRef.current.active) {
        const jet = jetRef.current;
        jet.x = -100;
        jet.y = canvas.height * (0.2 + Math.random() * 0.4); // Random height in upper-middle area
        jet.speed = 1.2 + Math.random() * 0.8; // Random speed
        jet.size = 0.8 + Math.random() * 0.4; // Random size
        jet.opacity = 0.6 + Math.random() * 0.2; // Random opacity
        jet.angle = (Math.random() - 0.5) * 0.2; // Slight angle variation
        jet.active = true;
      }
    };
    
    // Trigger jet at random intervals
    const jetInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to trigger
        triggerJet();
      }
    }, 8000 + Math.random() * 12000); // 8-20 seconds interval
    
    const animate = () => {
      // Create a sky gradient with varying blur effects
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      
      // Different shades of blue with varying intensities for blur effect
      skyGradient.addColorStop(0, '#4A90E2');      // Deeper blue at top
      skyGradient.addColorStop(0.2, '#5BA3F5');    // Medium blue
      skyGradient.addColorStop(0.4, '#7BB8F7');    // Lighter blue
      skyGradient.addColorStop(0.6, '#95C9F9');    // Even lighter
      skyGradient.addColorStop(0.8, '#B5DAFB');    // Very light blue
      skyGradient.addColorStop(1, '#D0E8FD');      // Lightest blue at horizon
      
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle blur effects with multiple gradients
      // Top blur area
      const topBlur = context.createRadialGradient(canvas.width / 2, 0, 0, canvas.width / 2, canvas.height * 0.3, canvas.width);
      topBlur.addColorStop(0, 'rgba(74, 144, 226, 0.1)');
      topBlur.addColorStop(0.5, 'rgba(74, 144, 226, 0.05)');
      topBlur.addColorStop(1, 'rgba(74, 144, 226, 0)');
      
      context.fillStyle = topBlur;
      context.fillRect(0, 0, canvas.width, canvas.height * 0.4);
      
      // Middle blur area
      const middleBlur = context.createRadialGradient(canvas.width / 3, canvas.height * 0.4, 0, canvas.width / 2, canvas.height * 0.6, canvas.width * 0.8);
      middleBlur.addColorStop(0, 'rgba(123, 184, 247, 0.08)');
      middleBlur.addColorStop(0.6, 'rgba(123, 184, 247, 0.04)');
      middleBlur.addColorStop(1, 'rgba(123, 184, 247, 0)');
      
      context.fillStyle = middleBlur;
      context.fillRect(0, canvas.width * 0.3, canvas.width, canvas.height * 0.4);
      
      // Bottom blur area
      const bottomBlur = context.createRadialGradient(canvas.width * 0.7, canvas.height, 0, canvas.width / 2, canvas.height * 0.8, canvas.width);
      bottomBlur.addColorStop(0, 'rgba(208, 232, 253, 0.12)');
      bottomBlur.addColorStop(0.4, 'rgba(208, 232, 253, 0.06)');
      bottomBlur.addColorStop(1, 'rgba(208, 232, 253, 0)');
      
      context.fillStyle = bottomBlur;
      context.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
      
      // Position sun at the right corner with half visible - adjusted position for larger sun
      const sunX = canvas.width + 25;  // Increased offset for larger sun
      const sunY = -25;  // Increased negative Y for larger sun
      
      // Draw the sun (no rays)
      drawSun(sunX, sunY);
      
      // Update and draw jet
      const jet = jetRef.current;
      if (jet.active) {
        jet.x += jet.speed;
        
        // Reset jet when it goes off screen
        if (jet.x > canvas.width + 100) {
          jet.active = false;
        }
        
        drawJet(jet);
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(jetInterval);
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
