import { useCallback, useEffect, useRef, useState } from 'react';
import { useChatApi, BatchMeta, ChatApiResult } from '@/hooks/chat/useChatApi';
import { WEBHOOK_URL } from '@/hooks/chat/constants';

const DEBOUNCE_MS = 7_000;
const MAX_WAIT_MS = 15_000;
const THINKING_DELAY_MS = 3_000;

interface PendingMsg {
  text: string;
  timestamp: string;
}

interface UseMessageBatcherOptions {
  onResponse: (result: ChatApiResult) => void;
  onError: (message: string) => void;
}

export interface MessageBatcher {
  enqueue: (text: string) => void;
  flush: () => Promise<void>;
  isLoading: boolean;
  isBatching: boolean;
  showThinking: boolean;
}

/**
 * Buffers user messages and flushes them to the chat API as a single batched
 * request after a debounce window (or a max-wait ceiling). Also handles
 * visibility/beforeunload flushes via sendBeacon so messages aren't lost.
 */
export function useMessageBatcher({ onResponse, onError }: UseMessageBatcherOptions): MessageBatcher {
  const { sendChatMessage, isLoading, sessionId } = useChatApi();
  const [isBatching, setIsBatching] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  const pendingRef = useRef<PendingMsg[]>([]);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxWaitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFlushingRef = useRef(false);

  // Stable refs so timers always call the latest function
  const sendRef = useRef(sendChatMessage);
  sendRef.current = sendChatMessage;
  const sessionIdRef = useRef(sessionId);
  sessionIdRef.current = sessionId;
  const onResponseRef = useRef(onResponse);
  onResponseRef.current = onResponse;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const clearAllTimers = useCallback(() => {
    if (debounceTimerRef.current) { clearTimeout(debounceTimerRef.current); debounceTimerRef.current = null; }
    if (maxWaitTimerRef.current) { clearTimeout(maxWaitTimerRef.current); maxWaitTimerRef.current = null; }
    if (thinkingTimerRef.current) { clearTimeout(thinkingTimerRef.current); thinkingTimerRef.current = null; }
  }, []);

  const flush = useCallback(async () => {
    if (isFlushingRef.current) return;
    const pending = pendingRef.current;
    if (pending.length === 0) return;

    isFlushingRef.current = true;
    clearAllTimers();
    setIsBatching(false);
    setShowThinking(false);

    const joined = pending.map(m => m.text).join('\n---\n');
    const meta: BatchMeta = {
      batched: pending.length > 1,
      batched_count: pending.length,
      first_message_at: pending[0].timestamp,
      last_message_at: pending[pending.length - 1].timestamp,
    };

    try {
      const response = await sendRef.current(joined, meta);
      pendingRef.current = [];
      onResponseRef.current(response);
    } catch {
      onErrorRef.current('Sorry, I encountered an error. Please try again.');
      if (pendingRef.current.length > 0) setIsBatching(true);
    } finally {
      isFlushingRef.current = false;
    }
  }, [clearAllTimers]);

  const flushRef = useRef(flush);
  flushRef.current = flush;

  const enqueue = useCallback((text: string) => {
    const now = new Date().toISOString();
    pendingRef.current.push({ text, timestamp: now });

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => flushRef.current(), DEBOUNCE_MS);

    if (pendingRef.current.length === 1) {
      if (maxWaitTimerRef.current) clearTimeout(maxWaitTimerRef.current);
      maxWaitTimerRef.current = setTimeout(() => flushRef.current(), MAX_WAIT_MS);
    }

    setIsBatching(true);
    setShowThinking(false);
    if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    thinkingTimerRef.current = setTimeout(() => setShowThinking(true), THINKING_DELAY_MS);
  }, []);

  // Beacon fallback for tab close
  useEffect(() => {
    const flushBeacon = () => {
      const pending = pendingRef.current;
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
      pendingRef.current = [];
    };

    const onVisChange = () => { if (document.hidden) flushRef.current(); };
    const onBeforeUnload = () => flushBeacon();
    document.addEventListener('visibilitychange', onVisChange);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', onVisChange);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  // Cleanup timers on unmount
  useEffect(() => () => clearAllTimers(), [clearAllTimers]);

  return { enqueue, flush, isLoading, isBatching, showThinking };
}
