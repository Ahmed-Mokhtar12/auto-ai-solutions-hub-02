
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;
  angle: number;
  tail: number;
  headSize: number; // Adding variable head size
  color: string; // Adding subtle color variation
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const frameRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Initialize stars
    const initStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000);
      starsRef.current = [];
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random(),
          speed: 0.05 + Math.random() * 0.1
        });
      }
    };
    
    // Initialize shooting stars
    const initShootingStars = () => {
      shootingStarsRef.current = [];
      // Reduced to just 2 shooting stars to make them feel more special
      for (let i = 0; i < 2; i++) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height / 3, // Start in top third of screen
          length: 70 + Math.random() * 150, // Even longer tails for more dramatic effect
          speed: 1.8 + Math.random() * 3.5, // Slightly slower for more majestic movement
          opacity: 0,
          active: false,
          angle: Math.PI / 6 + (Math.random() * Math.PI / 3), // More varied angles (30-90 degrees)
          tail: 0.4 + Math.random() * 0.8, // More varied tail width
          headSize: 1.2 + Math.random() * 1.5, // Variable head size
          color: `hsl(${200 + Math.random() * 60}, 100%, 90%)` // Subtle blue-white variation
        });
      }
    };
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize elements when resizing
      initStars();
      initShootingStars();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Trigger a shooting star randomly
    const triggerShootingStar = () => {
      const inactiveStars = shootingStarsRef.current.filter(star => !star.active);
      if (inactiveStars.length > 0) {
        const randomIndex = Math.floor(Math.random() * inactiveStars.length);
        const star = inactiveStars[randomIndex];
        star.active = true;
        star.opacity = 0.7 + Math.random() * 0.3; // Varied opacities
        star.x = Math.random() * canvas.width * 0.7; // Start position adjustment
        star.y = Math.random() * (canvas.height / 4); // Start in top quarter
        star.angle = Math.PI / 6 + (Math.random() * Math.PI / 3); // Random angle between 30-90 degrees
        star.tail = 0.4 + Math.random() * 0.8; // Random tail width
        star.headSize = 1.2 + Math.random() * 1.5; // Random head size
        star.color = `hsl(${200 + Math.random() * 60}, 100%, ${85 + Math.random() * 15}%)`; // Subtle color variation
      }
    };
    
    // Set interval to trigger shooting stars much less frequently (15-45 seconds)
    const shootingStarInterval = setInterval(() => {
      triggerShootingStar();
    }, 15000 + Math.random() * 30000); // Random interval between 15-45 seconds
    
    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      starsRef.current.forEach(star => {
        context.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
        
        // Twinkle effect
        star.opacity += Math.random() * 0.02 - 0.01;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        // Slow movement effect
        star.y += star.speed;
        
        // Reset position if star moves off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Draw shooting stars
      shootingStarsRef.current.forEach(star => {
        if (star.active) {
          // Calculate end point of the shooting star
          const endX = star.x + Math.cos(star.angle) * star.length;
          const endY = star.y + Math.sin(star.angle) * star.length;
          
          // Create gradient for the tail with custom color
          const gradient = context.createLinearGradient(
            star.x, star.y, 
            endX, endY
          );
          
          gradient.addColorStop(0, star.color.replace('90%)', `${star.opacity * 100}%)`));
          gradient.addColorStop(0.1, star.color.replace('90%)', `${star.opacity * 80}%)`));
          gradient.addColorStop(0.6, `rgba(255, 255, 255, ${star.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          // Draw the tail with slight curve
          context.strokeStyle = gradient;
          context.lineWidth = 1 + star.tail;
          context.beginPath();
          context.moveTo(star.x, star.y);
          
          // Add a slight arc for more natural movement
          const controlX = star.x + Math.cos(star.angle) * (star.length * 0.5);
          const controlY = star.y + Math.sin(star.angle) * (star.length * 0.5) + (Math.random() * 5 - 2.5);
          context.quadraticCurveTo(controlX, controlY, endX, endY);
          context.stroke();
          
          // Add a glow at the head
          const gradient2 = context.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.headSize * 4
          );
          gradient2.addColorStop(0, star.color.replace('90%)', `${star.opacity * 100}%)`));
          gradient2.addColorStop(0.5, star.color.replace('90%)', `${star.opacity * 30}%)`));
          gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          context.fillStyle = gradient2;
          context.beginPath();
          context.arc(star.x, star.y, star.headSize * 2, 0, Math.PI * 2);
          context.fill();
          
          // Brighter core
          context.fillStyle = star.color.replace('90%)', '100%)');
          context.beginPath();
          context.arc(star.x, star.y, star.headSize, 0, Math.PI * 2);
          context.fill();
          
          // Move shooting star along its angle
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          
          // Fade out gradually - very slow fade
          star.opacity -= 0.005; // Slower fade-out for longer lasting effect
          
          // Reset if it moves off screen or fades out
          if (star.opacity <= 0 || star.x < 0 || star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
          }
        }
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    initStars();
    initShootingStars();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(shootingStarInterval);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 bg-navy-900"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default StarryBackground;
