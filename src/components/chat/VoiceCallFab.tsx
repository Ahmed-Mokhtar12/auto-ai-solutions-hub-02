import React from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVapi } from '@/hooks/useVapi';

interface VoiceCallFabProps {
  className?: string;
  showTooltip?: boolean;
}

const VoiceCallFab: React.FC<VoiceCallFabProps> = ({ className, showTooltip = true }) => {
  const { status, toggleCall } = useVapi();

  const tooltip = status === 'idle' ? 'Voice call' : status === 'connecting' ? 'Connecting...' : 'End call';
  const ariaLabel = status === 'idle' ? 'Start voice call' : 'End voice call';

  return (
    <div className={cn('group', className ?? 'fixed z-50 bottom-[calc(15vh+9rem)] right-6')}>
      {showTooltip && (
        <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded-md bg-card/90 backdrop-blur-sm border border-border text-foreground font-semibold text-xs whitespace-nowrap shadow-lg opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          {tooltip}
        </span>
      )}
      <button
        onClick={toggleCall}
        className={cn(
          'relative flex items-center justify-center rounded-full',
          'w-14 h-14 shadow-lg transition-all duration-300',
          'bg-navy-800 border border-gold/30',
          'hover:scale-110 hover:shadow-xl',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          status === 'active'
            ? 'text-green-500 hover:shadow-green-500/20 ring-2 ring-green-500/40'
            : status === 'connecting'
              ? 'text-yellow-400 hover:shadow-yellow-400/20 animate-pulse'
              : 'text-gold hover:shadow-gold/20',
        )}
        aria-label={ariaLabel}
      >
        {status === 'idle' ? <Phone size={22} /> : <PhoneOff size={22} />}
        {status === 'active' && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default VoiceCallFab;
