
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string; // Added color property for stars
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;
  angle: number;
  tailWidth: number;
  headSize: number;
  color: string;
  trailSegments: { x: number; y: number }[];
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const frameRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    // Get a random natural star color
    const getStarColor = () => {
      // Natural star colors based on their temperature
      // Blue/white (hottest), white, yellow, orange, blue (coolest)
      const starColors = [
        '#FFFFFF', // White
        '#F5F3CE', // Pale yellow-white
        '#FFE87C', // Yellow
        '#FFA500', // Orange
        '#B3E5FC', // Light blue
        '#81D4FA', // Sky blue
        '#E1BEE7', // Light purple (some stars appear this way)
      ];
      
      // Most stars appear white, so we'll make white more common
      if (Math.random() < 0.7) {
        return '#FFFFFF';
      }
      
      return starColors[Math.floor(Math.random() * starColors.length)];
    };
    
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
          speed: 0.01 + Math.random() * 0.03,
          color: getStarColor() // Assign color to each star
        });
      }
    };
    
    // Initialize meteors
    const initMeteors = () => {
      meteorsRef.current = [];
      // Just 2 meteors to make them rare and special
      for (let i = 0; i < 2; i++) {
        meteorsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height / 4, // Start in top quarter of screen
          length: 80 + Math.random() * 170, // Longer trails for dramatic effect
          speed: 0.8 + Math.random() * 1.5, // Slower for more natural movement
          opacity: 0,
          active: false,
          angle: Math.PI / 6 + (Math.random() * Math.PI / 3), // Angled trajectory (30-90 degrees)
          tailWidth: 2 + Math.random() * 3.5,
          headSize: 2 + Math.random() * 2.5,
          color: getMeteorColor(),
          trailSegments: [] // Store trail segments for realistic fading effect
        });
      }
    };
    
    // Get a random meteor color with weighted probabilities - only white and light blue
    const getMeteorColor = () => {
      const colors = [
        { value: '#FFFFFF', weight: 70 },  // White (most common)
        { value: '#B3E5FC', weight: 20 },  // Light blue
        { value: '#81D4FA', weight: 10 },  // Sky blue
      ];
      
      const totalWeight = colors.reduce((acc, color) => acc + color.weight, 0);
      let random = Math.random() * totalWeight;
      
      for (const color of colors) {
        if (random < color.weight) {
          return color.value;
        }
        random -= color.weight;
      }
      
      return colors[0].value; // Default fallback to white
    };
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize elements when resizing
      initStars();
      initMeteors();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Trigger a meteor
    const triggerMeteor = () => {
      const inactiveMeteors = meteorsRef.current.filter(meteor => !meteor.active);
      if (inactiveMeteors.length > 0) {
        const randomIndex = Math.floor(Math.random() * inactiveMeteors.length);
        const meteor = inactiveMeteors[randomIndex];
        
        // Starting position - vary across width but near the top
        meteor.x = Math.random() * canvas.width * 0.8;
        meteor.y = -10 - Math.random() * 50; // Start above viewport for more natural entry
        
        // Randomize characteristics for variety
        meteor.active = true;
        meteor.opacity = 0.7 + Math.random() * 0.3;
        meteor.angle = Math.PI / 4 + (Math.random() * Math.PI / 2.5); // Steeper angle (45-80 degrees)
        meteor.tailWidth = 1 + Math.random() * 3;
        meteor.headSize = 1.5 + Math.random() * 2;
        meteor.speed = 0.8 + Math.random() * 1.2; // Slower for more majestic movement
        meteor.color = getMeteorColor();
        meteor.trailSegments = []; // Clear old trail
        
        // Initialize first trail segment
        meteor.trailSegments.push({
          x: meteor.x,
          y: meteor.y
        });
      }
    };
    
    // Set interval for meteor triggers - much less frequently 
    const meteorInterval = setInterval(() => {
      if (Math.random() > 0.2) { // 80% chance to trigger on interval
        triggerMeteor();
      }
    }, 15000 + Math.random() * 30000); // 15-45 seconds interval
    
    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with slight twinkling
      starsRef.current.forEach(star => {
        context.fillStyle = `${star.color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`;
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
        
        // Subtle twinkling effect
        star.opacity += Math.random() * 0.02 - 0.01;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        // Slow drift effect
        star.y += star.speed;
        
        // Reset if off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.color = getStarColor(); // New color when recycling star
        }
      });
      
      // Draw meteors
      meteorsRef.current.forEach(meteor => {
        if (meteor.active) {
          // Add current position to trail segments (limited number for performance)
          if (meteor.trailSegments.length > 20) {
            meteor.trailSegments.shift(); // Remove oldest segment
          }
          
          meteor.trailSegments.push({
            x: meteor.x,
            y: meteor.y
          });
          
          // Draw meteor head (bright circle)
          context.fillStyle = meteor.color;
          context.beginPath();
          context.arc(meteor.x, meteor.y, meteor.headSize, 0, Math.PI * 2);
          context.fill();
          
          // Draw glow around meteor head
          const headGlow = context.createRadialGradient(
            meteor.x, meteor.y, 0,
            meteor.x, meteor.y, meteor.headSize * 3
          );
          headGlow.addColorStop(0, `${meteor.color}`);
          headGlow.addColorStop(0.5, `${meteor.color}88`);
          headGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          context.fillStyle = headGlow;
          context.beginPath();
          context.arc(meteor.x, meteor.y, meteor.headSize * 3, 0, Math.PI * 2);
          context.fill();
          
          // Draw trail with segments for more natural fadeout
          if (meteor.trailSegments.length > 1) {
            for (let i = 1; i < meteor.trailSegments.length; i++) {
              const currentSegment = meteor.trailSegments[i];
              const prevSegment = meteor.trailSegments[i - 1];
              
              // Calculate segment opacity - fades out toward end of trail
              const segmentOpacity = (meteor.opacity * (i / meteor.trailSegments.length));
              const segmentWidth = meteor.tailWidth * (i / meteor.trailSegments.length);
              
              // Draw trail segment with gradient
              const gradient = context.createLinearGradient(
                prevSegment.x, prevSegment.y,
                currentSegment.x, currentSegment.y
              );
              
              const baseColor = meteor.color.toLowerCase();
              
              gradient.addColorStop(0, `${baseColor}${Math.floor(segmentOpacity * 255).toString(16).padStart(2, '0')}`);
              gradient.addColorStop(1, `${baseColor}00`);
              
              context.strokeStyle = gradient;
              context.lineWidth = segmentWidth;
              context.lineCap = 'round';
              context.beginPath();
              context.moveTo(prevSegment.x, prevSegment.y);
              context.lineTo(currentSegment.x, currentSegment.y);
              context.stroke();
            }
          }
          
          // Move meteor
          meteor.x += Math.cos(meteor.angle) * meteor.speed;
          meteor.y += Math.sin(meteor.angle) * meteor.speed;
          
          // Very subtle fade for long-lasting effect
          meteor.opacity -= 0.003;
          
          // Reset if it moves off screen or fades out
          if (meteor.opacity <= 0 || 
              meteor.x < -100 || 
              meteor.x > canvas.width + 100 || 
              meteor.y > canvas.height + 100) {
            meteor.active = false;
          }
        }
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    initStars();
    initMeteors();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(meteorInterval);
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
