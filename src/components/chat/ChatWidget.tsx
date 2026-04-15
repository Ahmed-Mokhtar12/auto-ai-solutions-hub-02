import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { useChatApi, BatchMeta } from '@/hooks/chat/useChatApi';
import { ChatMessage, generateMessageId } from '@/utils/messageUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { WEBHOOK_URL } from '@/hooks/chat/constants';

const DEBOUNCE_MS = 5_000;
const MAX_WAIT_MS = 15_000;

interface PendingMsg {
  text: string;
  timestamp: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isBatching, setIsBatching] = useState(false);

  const { sendChatMessage, isLoading } = useChatApi();
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Batching refs
  const pendingMessagesRef = useRef<PendingMsg[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const maxWaitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isFlushingRef = useRef(false);

  // Keep a stable ref to sendChatMessage so timers always call the latest version
  const sendChatMessageRef = useRef(sendChatMessage);
  sendChatMessageRef.current = sendChatMessage;

  const sessionIdRef = useRef(
    (() => {
      try { return localStorage.getItem('digitlab_chat_session_id') || crypto.randomUUID(); }
      catch { return crypto.randomUUID(); }
    })()
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const addMessage = useCallback((text: string, sender: 'user' | 'system') => {
    setMessages(prev => [...prev, { id: generateMessageId(), text, sender }]);
  }, []);

  // ── Flush logic (stable — no deps that change per render) ───
  const flushMessages = useCallback(async () => {
    if (isFlushingRef.current) return;
    const pending = pendingMessagesRef.current;
    if (pending.length === 0) return;

    isFlushingRef.current = true;
    if (debounceTimerRef.current) { clearTimeout(debounceTimerRef.current); debounceTimerRef.current = null; }
    if (maxWaitTimerRef.current) { clearTimeout(maxWaitTimerRef.current); maxWaitTimerRef.current = null; }
    setIsBatching(false);

    const joined = pending.map(m => m.text).join('\n---\n');
    const meta: BatchMeta = {
      batched: pending.length > 1,
      batched_count: pending.length,
      first_message_at: pending[0].timestamp,
      last_message_at: pending[pending.length - 1].timestamp,
    };

    try {
      const response = await sendChatMessageRef.current(joined, meta);
      pendingMessagesRef.current = [];
      addMessage(response, 'system');
    } catch {
      addMessage('Sorry, I encountered an error. Please try again.', 'system');
      if (pendingMessagesRef.current.length > 0) setIsBatching(true);
    } finally {
      isFlushingRef.current = false;
    }
  }, [addMessage]); // stable — addMessage has [] deps

  // Keep a stable ref so event listeners always call the latest flush
  const flushMessagesRef = useRef(flushMessages);
  flushMessagesRef.current = flushMessages;

  // Beacon fallback for beforeunload
  const flushBeacon = useCallback(() => {
    const pending = pendingMessagesRef.current;
    if (pending.length === 0 || isFlushingRef.current) return;
    const joined = pending.map(m => m.text).join('\n---\n');
    const body = JSON.stringify({
      session_id: sessionIdRef.current,
      message: joined,
      timestamp: new Date().toISOString(),
      batched: pending.length > 1,
      batched_count: pending.length,
      first_message_at: pending[0].timestamp,
      last_message_at: pending[pending.length - 1].timestamp,
    });
    navigator.sendBeacon(WEBHOOK_URL, new Blob([body], { type: 'application/json' }));
    pendingMessagesRef.current = [];
  }, []);

  // Register visibilitychange + beforeunload (stable deps — no timer clearing in cleanup)
  useEffect(() => {
    const onVisChange = () => { if (document.hidden) flushMessagesRef.current(); };
    const onBeforeUnload = () => flushBeacon();
    document.addEventListener('visibilitychange', onVisChange);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', onVisChange);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [flushBeacon]);

  // Cleanup timers on unmount only
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (maxWaitTimerRef.current) clearTimeout(maxWaitTimerRef.current);
    };
  }, []);

  // ── Handle send (buffer) ────────────────────────────────────
  const handleSend = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed) return;

    addMessage(trimmed, 'user');
    setMessage('');
    if (inputRef.current) inputRef.current.style.height = 'auto';

    const now = new Date().toISOString();
    pendingMessagesRef.current.push({ text: trimmed, timestamp: now });

    // Reset debounce
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => flushMessagesRef.current(), DEBOUNCE_MS);

    // Start max-wait on first buffered message
    if (pendingMessagesRef.current.length === 1) {
      if (maxWaitTimerRef.current) clearTimeout(maxWaitTimerRef.current);
      maxWaitTimerRef.current = setTimeout(() => flushMessagesRef.current(), MAX_WAIT_MS);
    }

    setIsBatching(true);
  }, [message, addMessage]);

  // ── Close chat (flush first) ─────────────────────────────────
  const handleClose = useCallback(() => {
    if (pendingMessagesRef.current.length > 0) flushMessages();
    setIsOpen(false);
  }, [flushMessages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      setRecordingDuration(0);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        addMessage('🎤 Voice note sent', 'user');
        addMessage('Voice notes are not yet supported. Please type your message.', 'system');
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingDuration(0);
      recordingIntervalRef.current = setInterval(() => setRecordingDuration(prev => prev + 1), 1000);
    } catch {
      addMessage('Microphone access denied.', 'system');
    }
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => isOpen ? handleClose() : setIsOpen(true)}
        className={cn(
          "fixed z-50 flex items-center justify-center rounded-full",
          "w-14 h-14 shadow-lg transition-all duration-300",
          "bg-navy-800 border border-gold/30 text-gold",
          "hover:scale-110 hover:shadow-gold/20 hover:shadow-xl",
          "bottom-[calc(10vh+1rem)] right-6",
          isOpen && "rotate-90 scale-95"
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed z-50 flex flex-col",
          "bg-navy-900/95 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl",
          "transition-all duration-300 origin-bottom-right",
          "bottom-[calc(10vh+5rem)] right-6",
          isMobile ? "left-4 right-4 w-auto max-h-[70vh]" : "w-[456px] h-[624px]",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <h3 className="text-foreground font-semibold text-sm tracking-wide">
              DigitLab AI Assistant
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chat-scrollbar">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3 opacity-60">
              <MessageCircle size={36} className="text-gold/50" />
              <p className="text-muted-foreground text-sm">
                Ask me anything about our AI solutions, services, or how we can help your business.
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap animate-fade-in",
                msg.sender === 'user'
                  ? "ml-auto bg-gold/15 text-foreground rounded-br-md"
                  : "mr-auto bg-navy-700/60 text-foreground border border-gold/10 rounded-bl-md"
              )}
            >
              {msg.text}
            </div>
          ))}

          {/* Batching indicator */}
          {isBatching && !isLoading && (
            <div className="flex items-center gap-2 mr-auto text-xs text-muted-foreground animate-fade-in py-1 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-pulse" />
              Waiting for more messages…
            </div>
          )}

          {isLoading && (
            <div className="mr-auto bg-navy-700/60 border border-gold/10 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] animate-fade-in">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="px-3 py-3 border-t border-gold/10">
          {isRecording && (
            <div className="flex items-center gap-2 px-2 pb-2 text-xs text-red-400">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Recording... {recordingDuration}s
            </div>
          )}
          <div className="flex items-end gap-2">
            <button
              onClick={toggleRecording}
              className={cn(
                "shrink-0 p-2 transition-colors",
                isRecording ? "text-red-400 hover:text-red-300" : "text-muted-foreground hover:text-gold"
              )}
              aria-label={isRecording ? 'Stop recording' : 'Record voice note'}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <textarea
              ref={inputRef}
              rows={1}
              value={message}
              onChange={(e) => { setMessage(e.target.value); autoResize(e.target); }}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className={cn(
                "flex-1 resize-none overflow-y-auto",
                "bg-navy-800/80 text-foreground rounded-xl border border-gold/10 chat-scrollbar",
                "px-3 py-2 text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:border-gold/30 transition-colors"
              )}
              style={{ minHeight: '38px', maxHeight: '100px' }}
            />

            <button
              onClick={handleSend}
              disabled={isLoading || !message.trim()}
              className={cn(
                "shrink-0 p-2.5 rounded-xl transition-all duration-200",
                message.trim()
                  ? "bg-gold text-navy-900 hover:bg-gold/90 scale-100"
                  : "bg-navy-700 text-muted-foreground scale-95"
              )}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
