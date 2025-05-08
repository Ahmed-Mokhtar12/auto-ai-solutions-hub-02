
import React, { useEffect } from 'react';
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
  const {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
    cleanup
  } = useElementVisibility({
    autoHideDelay,
    initialVisibility
  });

  // Clean up on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <div 
      className={cn(
        "relative transition-all duration-300",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "transition-all duration-300",
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
