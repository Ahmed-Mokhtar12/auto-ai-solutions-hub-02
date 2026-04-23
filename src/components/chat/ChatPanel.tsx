import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage, generateMessageId } from '@/utils/messageUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMessageBatcher } from '@/hooks/chat/useMessageBatcher';
import ChatMessageBubble from './ChatMessageBubble';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (text: string, sender: 'user' | 'system', cta?: { label: string; url: string }) => {
    setMessages(prev => [...prev, { id: generateMessageId(), text, sender, cta }]);
  };

  const { enqueue, flush, isLoading, isBatching, showThinking } = useMessageBatcher({
    onResponse: (result) => addMessage(result.text, 'system', result.cta),
    onError: (msg) => addMessage(msg, 'system'),
  });

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showThinking]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    addMessage(trimmed, 'user');
    setMessage('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    enqueue(trimmed);
  };

  const handleClose = () => {
    if (message.trim() === '') flush();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
  };

  // Single loading-state precedence: API loading wins, otherwise the batching "Thinking..." indicator
  const showLoadingDots = isLoading;
  const showBatchThinking = !isLoading && isBatching && showThinking;

  return (
    <div
      role="dialog"
      aria-label="DigitLab AI Assistant chat"
      aria-modal="false"
      className={cn(
        'fixed z-50 flex flex-col',
        'bg-navy-900/95 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl',
        'transition-all duration-300 origin-bottom-right',
        isMobile
          ? 'bottom-[calc(15vh+5rem)] left-3 right-3 h-[min(70vh,600px)] max-h-[calc(100vh-15vh-7rem)]'
          : 'bottom-[calc(15vh+5rem)] right-6 w-[456px] h-[624px]',
        isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none',
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          <h3 className="text-foreground font-semibold text-sm tracking-wide">DigitLab AI Assistant</h3>
        </div>
        <button
          onClick={handleClose}
          className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chat-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3 opacity-60">
            <MessageCircle size={36} className="text-gold/50" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">
              Ask me anything about our AI solutions, services, or how we can help your business.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}

        {showLoadingDots && (
          <div className="mr-auto bg-navy-700/60 border border-gold/10 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] animate-fade-in">
            <div className="flex gap-1.5" aria-label="Assistant is typing">
              <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {showBatchThinking && (
          <div className="mr-auto animate-fade-in py-1 px-2" aria-label="Batching messages">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span className="text-sm mr-0.5">Thinking</span>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block w-2 h-2 rounded-full bg-muted-foreground/70"
                  style={{ animation: `thinking-dot 1.2s ease-in-out ${i * 0.25}s infinite` }}
                />
              ))}
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-gold/10">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={message}
            onChange={(e) => { setMessage(e.target.value); autoResize(e.target); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            aria-label="Type your message"
            className={cn(
              'flex-1 resize-none overflow-y-auto',
              'bg-navy-800/80 text-foreground rounded-xl border border-gold/10 chat-scrollbar',
              'px-3 py-2 text-sm placeholder:text-muted-foreground',
              'focus:outline-none focus:border-gold/30 transition-colors',
            )}
            style={{ minHeight: '38px', maxHeight: '100px' }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className={cn(
              'shrink-0 p-2.5 rounded-xl transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              message.trim()
                ? 'bg-gold text-navy-900 hover:bg-gold/90 scale-100'
                : 'bg-navy-700 text-muted-foreground scale-95',
            )}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
