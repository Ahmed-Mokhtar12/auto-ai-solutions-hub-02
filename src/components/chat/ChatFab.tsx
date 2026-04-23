import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatFabProps {
  isOpen: boolean;
  onClick: () => void;
  /** Override default fixed positioning (used inside ContactFab stack) */
  className?: string;
  /** Hide the hover tooltip (e.g. inside the mobile expandable stack) */
  showTooltip?: boolean;
}

const ChatFab: React.FC<ChatFabProps> = ({ isOpen, onClick, className, showTooltip = true }) => (
  <div className={cn('group', className ?? 'fixed z-50 bottom-[calc(15vh+1rem)] right-6')}>
    {showTooltip && (
      <span
        className={cn(
          'pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded-md',
          'bg-card/90 backdrop-blur-sm border border-border text-foreground font-semibold text-xs',
          'whitespace-nowrap shadow-lg transition-all duration-200',
          isOpen ? 'opacity-0' : 'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
        )}
      >
        Chat with us
      </span>
    )}
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-full',
        'w-14 h-14 shadow-lg transition-all duration-300',
        'bg-navy-800 border border-gold/30 text-gold',
        'hover:scale-110 hover:shadow-gold/20 hover:shadow-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isOpen && 'rotate-90 scale-95',
      )}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  </div>
);

export default ChatFab;
