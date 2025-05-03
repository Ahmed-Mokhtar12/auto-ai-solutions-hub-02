
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
  const galaxyRef = useRef<{x: number, y: number, size: number}>({x: 0, y: 0, size: 0});
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

    // Initialize galaxy
    const initGalaxy = () => {
      // Position galaxy in the top right quadrant
      galaxyRef.current = {
        x: canvas.width * 0.75,
        y: canvas.height * 0.25,
        size: Math.min(canvas.width, canvas.height) * 0.2 // Galaxy size relative to canvas
      };
    };
    
    // Initialize shooting stars
    const initShootingStars = () => {
      shootingStarsRef.current = [];
      for (let i = 0; i < 5; i++) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height / 3, // Start in top third of screen
          length: 50 + Math.random() * 100,
          speed: 5 + Math.random() * 10,
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
      initGalaxy();
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
    
    // Set interval to trigger shooting stars every few seconds
    const shootingStarInterval = setInterval(() => {
      triggerShootingStar();
    }, 2000 + Math.random() * 4000); // Random interval between 2-6 seconds
    
    // Draw galaxy
    const drawGalaxy = (context: CanvasRenderingContext2D) => {
      const { x, y, size } = galaxyRef.current;
      
      // Create a radial gradient for the galaxy
      const gradient = context.createRadialGradient(x, y, size * 0.1, x, y, size);
      gradient.addColorStop(0, 'rgba(180, 180, 255, 0.5)');
      gradient.addColorStop(0.3, 'rgba(120, 120, 220, 0.3)');
      gradient.addColorStop(0.6, 'rgba(80, 80, 180, 0.2)');
      gradient.addColorStop(1, 'rgba(40, 40, 100, 0)');
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
      
      // Add some brighter spots in the galaxy
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * size * 0.8;
        const spotX = x + Math.cos(angle) * distance;
        const spotY = y + Math.sin(angle) * distance;
        const spotSize = 1 + Math.random() * 2;
        const spotOpacity = 0.2 + Math.random() * 0.7;
        
        context.fillStyle = `rgba(220, 220, 255, ${spotOpacity})`;
        context.beginPath();
        context.arc(spotX, spotY, spotSize, 0, Math.PI * 2);
        context.fill();
      }
    };
    
    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw galaxy
      drawGalaxy(context);
      
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
          
          // Move shooting star
          star.x += star.speed;
          star.y += star.speed;
          
          // Fade out gradually
          star.opacity -= 0.02;
          
          // Reset if it moves off screen or fades out
          if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
          }
        }
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    initStars();
    initGalaxy();
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
