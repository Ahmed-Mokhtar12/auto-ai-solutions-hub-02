
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
    
    // Initialize shooting stars - reduced to just 2 stars
    const initShootingStars = () => {
      shootingStarsRef.current = [];
      for (let i = 0; i < 2; i++) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height / 3, // Start in top third of screen
          length: 50 + Math.random() * 100,
          speed: 3 + Math.random() * 5, // Slower speed
          opacity: 0,
          active: false
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
        star.opacity = 1;
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * (canvas.height / 3);
      }
    };
    
    // Set interval to trigger shooting stars every 10-20 seconds
    const shootingStarInterval = setInterval(() => {
      triggerShootingStar();
    }, 10000 + Math.random() * 10000); // Random interval between 10-20 seconds
    
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
          context.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(star.x, star.y);
          context.lineTo(star.x + star.length, star.y + star.length);
          context.stroke();
          
          // Move shooting star - slower movement
          star.x += star.speed;
          star.y += star.speed;
          
          // Fade out gradually - slower fade
          star.opacity -= 0.01;
          
          // Reset if it moves off screen or fades out
          if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
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
