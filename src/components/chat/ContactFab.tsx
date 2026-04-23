import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVapi } from '@/hooks/useVapi';
import { WHATSAPP_URL } from '@/lib/constants';

interface ContactFabProps {
  /** Open the chat panel (mounted by parent) */
  onOpenChat: () => void;
  /** True when the chat panel is currently open — collapses the menu */
  isChatOpen: boolean;
}

/**
 * Mobile-only expandable FAB. One gold "Contact" button that fans out into
 * Chat / WhatsApp / Voice mini-FABs. Tap outside or pick an action to collapse.
 */
const ContactFab: React.FC<ContactFabProps> = ({ onOpenChat, isChatOpen }) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { status: callStatus, toggleCall } = useVapi();

  // Force-collapse when chat is open (the X on the chat panel handles closing)
  useEffect(() => {
    if (isChatOpen) setExpanded(false);
  }, [isChatOpen]);

  // Tap outside to close
  useEffect(() => {
    if (!expanded) return;
    const onPointer = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpanded(false); };
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [expanded]);

  const handleChat = () => {
    setExpanded(false);
    onOpenChat();
  };

  const handleCall = () => {
    setExpanded(false);
    toggleCall();
  };

  // Mini-FAB shared classes
  const miniBtn = cn(
    'flex items-center justify-center w-12 h-12 rounded-full shadow-lg',
    'bg-navy-800 border border-gold/30',
    'transition-all duration-300',
    'hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  );

  // Stagger animation: each item slides up + fades in when expanded
  const itemStyle = (index: number): React.CSSProperties => ({
    transform: expanded ? `translateY(-${(index + 1) * 56 + 8}px)` : 'translateY(0)',
    opacity: expanded ? 1 : 0,
    pointerEvents: expanded ? 'auto' : 'none',
    transitionDelay: expanded ? `${index * 50}ms` : `${(2 - index) * 30}ms`,
  });

  return (
    <div
      ref={containerRef}
      className="fixed z-50 bottom-[calc(15vh+1rem)] right-4"
      aria-label="Contact options"
    >
      {/* Mini FABs (absolute, animate up from main button) */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setExpanded(false)}
        className={cn(miniBtn, 'absolute bottom-0 right-1 text-green-500')}
        style={{ ...itemStyle(0), transitionProperty: 'transform, opacity' }}
        aria-label="Chat on WhatsApp"
        tabIndex={expanded ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <button
        onClick={handleCall}
        className={cn(
          miniBtn,
          'absolute bottom-0 right-1',
          callStatus === 'active' ? 'text-green-500 ring-2 ring-green-500/40' : callStatus === 'connecting' ? 'text-yellow-400 animate-pulse' : 'text-gold',
        )}
        style={{ ...itemStyle(1), transitionProperty: 'transform, opacity' }}
        aria-label={callStatus === 'idle' ? 'Start voice call' : 'End voice call'}
        tabIndex={expanded ? 0 : -1}
      >
        <Phone size={18} />
      </button>

      <button
        onClick={handleChat}
        className={cn(miniBtn, 'absolute bottom-0 right-1 text-gold')}
        style={{ ...itemStyle(2), transitionProperty: 'transform, opacity' }}
        aria-label="Open chat"
        tabIndex={expanded ? 0 : -1}
      >
        <MessageCircle size={18} />
      </button>

      {/* Main toggle */}
      <button
        onClick={() => setExpanded(v => !v)}
        className={cn(
          'relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg',
          'bg-navy-800 border border-gold/30 text-gold',
          'transition-all duration-300',
          'hover:scale-110 hover:shadow-gold/20 hover:shadow-xl',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          expanded && 'rotate-45',
        )}
        aria-label={expanded ? 'Close contact options' : 'Open contact options'}
        aria-expanded={expanded}
      >
        {expanded ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ContactFab;
