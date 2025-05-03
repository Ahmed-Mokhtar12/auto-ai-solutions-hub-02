
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
  angle: number; // Adding angle for more natural trajectories
  tail: number; // Varying tail lengths
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
      for (let i = 0; i < 3; i++) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height / 3, // Start in top third of screen
          length: 60 + Math.random() * 120, // Longer tails
          speed: 2 + Math.random() * 4, // Varying speeds
          opacity: 0,
          active: false,
          angle: Math.PI / 4 + (Math.random() * Math.PI / 4), // Diagonal trajectory (45-90 degrees)
          tail: 0.5 + Math.random() * 0.5 // Tail width variation
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
        star.opacity = 0.8 + Math.random() * 0.2; // Slightly varying opacities
        star.x = Math.random() * canvas.width * 0.8; // Keep away from right edge
        star.y = Math.random() * (canvas.height / 4); // Start in top quarter for longer visible paths
        star.angle = Math.PI / 4 + (Math.random() * Math.PI / 4); // Random angle between 45-90 degrees
        star.tail = 0.5 + Math.random() * 0.5; // Random tail width
      }
    };
    
    // Set interval to trigger shooting stars every 8-15 seconds (slightly more frequent)
    const shootingStarInterval = setInterval(() => {
      triggerShootingStar();
    }, 8000 + Math.random() * 7000);
    
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
          // Create gradient for the tail
          const gradient = context.createLinearGradient(
            star.x, star.y, 
            star.x + Math.cos(star.angle) * star.length, 
            star.y + Math.sin(star.angle) * star.length
          );
          
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          context.strokeStyle = gradient;
          context.lineWidth = 1 + star.tail;
          context.beginPath();
          context.moveTo(star.x, star.y);
          context.lineTo(
            star.x + Math.cos(star.angle) * star.length, 
            star.y + Math.sin(star.angle) * star.length
          );
          context.stroke();
          
          // Add a small glow at the head
          context.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          context.beginPath();
          context.arc(star.x, star.y, 1 + star.tail, 0, Math.PI * 2);
          context.fill();
          
          // Move shooting star along its angle
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          
          // Fade out gradually - slower fade
          star.opacity -= 0.008;
          
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
