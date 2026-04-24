
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useElementVisibility } from '@/hooks/useElementVisibility';

interface HoverVisibleContainerProps {
  children: React.ReactNode;
  className?: string;
  autoHideDelay?: number;
  showIndicator?: boolean;
  initialVisibility?: boolean;
}

const HoverVisibleContainer: React.FC<HoverVisibleContainerProps> = ({
  children,
  className,
  autoHideDelay = 2000,
  showIndicator = false,
  initialVisibility = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useScrollReveal, setUseScrollReveal] = useState(false);

  const {
    isVisible,
    setIsVisible,
    handleMouseEnter,
    handleMouseLeave,
    cleanup
  } = useElementVisibility({
    autoHideDelay,
    initialVisibility
  });

  useEffect(() => {
    const touchQuery = window.matchMedia('(max-width: 1023px)');
    const updateRevealMode = () => setUseScrollReveal(touchQuery.matches);

    updateRevealMode();
    touchQuery.addEventListener('change', updateRevealMode);

    return () => touchQuery.removeEventListener('change', updateRevealMode);
  }, []);

  useEffect(() => {
    if (!useScrollReveal) {
      setIsVisible(initialVisibility);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [initialVisibility, setIsVisible, useScrollReveal]);

  // Clean up on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative transition-all duration-700 ease-out",
        className
      )}
      onMouseEnter={useScrollReveal ? undefined : handleMouseEnter}
      onMouseLeave={useScrollReveal ? undefined : handleMouseLeave}
    >
      <div
        className={cn(
          "transition-all duration-700 ease-out",
          isVisible 
            ? "opacity-100 transform scale-100" 
            : "opacity-0 transform scale-95 pointer-events-none"
        )}
      >
        {children}
      </div>

      {!isVisible && showIndicator && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gold opacity-30 rounded-t-lg" />
      )}
    </div>
  );
};

export default HoverVisibleContainer;
