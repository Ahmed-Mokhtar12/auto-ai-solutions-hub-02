import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/utils/messageUtils';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => (
  <div className="flex flex-col gap-2 animate-fade-in">
    <div
      className={cn(
        'max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
        message.sender === 'user'
          ? 'ml-auto bg-gold/15 text-foreground rounded-br-md'
          : 'mr-auto bg-navy-700/60 text-foreground border border-gold/10 rounded-bl-md',
      )}
    >
      {message.text}
    </div>
    {message.sender === 'system' && message.cta && (
      <a
        href={message.cta.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'mr-auto inline-flex items-center gap-2 max-w-[85%]',
          'bg-gold text-navy-900 font-semibold text-sm',
          'rounded-full px-5 py-2.5 shadow-lg shadow-gold/20',
          'hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        <span>{message.cta.label}</span>
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    )}
  </div>
);

export default ChatMessageBubble;
