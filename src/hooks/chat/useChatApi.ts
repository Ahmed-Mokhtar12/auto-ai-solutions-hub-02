
import { useState, useRef } from 'react';
import { validateChatMessage } from '@/utils/inputSanitizer';
import { WEBHOOK_URL } from './constants';

export interface BatchMeta {
  batched: boolean;
  batched_count: number;
  first_message_at: string;
  last_message_at: string;
}

export interface ChatApiResult {
  text: string;
  cta?: { label: string; url: string };
}

interface ChatApiHook {
  sendChatMessage: (message: string, meta?: BatchMeta) => Promise<ChatApiResult>;
  isLoading: boolean;
  error: string | null;
  sessionId: string;
}

const isObj = (v: unknown): v is Record<string, any> =>
  typeof v === 'object' && v !== null;

const extractText = (c: any): string | null => {
  if (!isObj(c)) return null;
  if (typeof c.message === 'string') return c.message;
  if (typeof c.text === 'string') return c.text;
  if (isObj(c.reply) && typeof c.reply.message === 'string') return c.reply.message;
  if (isObj(c.output) && typeof c.output.message === 'string') return c.output.message;
  return null;
};

export const parseWebhookResponse = (data: any): ChatApiResult => {
  const containers: any[] = [data];
  if (isObj(data)) {
    if (data.output !== undefined) containers.push(data.output);
    if (data.reply !== undefined) containers.push(data.reply);
    if (data.data !== undefined) containers.push(data.data);
  }

  for (const c of containers) {
    if (!isObj(c)) continue;
    if (c.type === 'booking_cta' && isObj(c.button)) {
      const url = c.button.url;
      if (typeof url === 'string' && /^https?:\/\//i.test(url)) {
        const labelRaw = c.button.label;
        const label =
          typeof labelRaw === 'string' && labelRaw.trim()
            ? labelRaw.trim()
            : 'Book a Demo';
        const text =
          extractText(c) ??
          extractText(data) ??
          '';
        return { text, cta: { label, url } };
      }
    }
  }

  // Plain-text fallbacks (existing behavior)
  if (typeof data === 'string') return { text: data };
  if (isObj(data)) {
    const text =
      (typeof data.reply === 'string' && data.reply) ||
      (typeof data.output === 'string' && data.output) ||
      (typeof data.message === 'string' && data.message) ||
      extractText(data) ||
      'Sorry, I could not process your request at the moment.';
    return { text };
  }
  return { text: 'Sorry, I could not process your request at the moment.' };
};

const STORAGE_KEY = 'digitlab_chat_session_id';
const TIMESTAMP_KEY = 'digitlab_chat_session_ts';
const SESSION_TTL_MS = 60 * 60 * 1000; // 60 minutes

const getOrCreateSessionId = (): string => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    const lastActivity = localStorage.getItem(TIMESTAMP_KEY);
    if (existing && lastActivity) {
      const elapsed = Date.now() - Number(lastActivity);
      if (elapsed < SESSION_TTL_MS) return existing;
    }
  } catch { /* localStorage unavailable */ }

  const id = crypto.randomUUID();
  try {
    localStorage.setItem(STORAGE_KEY, id);
    localStorage.setItem(TIMESTAMP_KEY, String(Date.now()));
  } catch { /* write failed */ }
  return id;
};

const touchSession = () => {
  try { localStorage.setItem(TIMESTAMP_KEY, String(Date.now())); } catch { /* ignore */ }
};

export const useChatApi = (): ChatApiHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>(getOrCreateSessionId());

  const sendChatMessage = async (message: string, meta?: BatchMeta): Promise<ChatApiResult> => {
    const validation = validateChatMessage(message);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid message');
    }

    setIsLoading(true);
    setError(null);

    try {
      const body: Record<string, unknown> = {
        session_id: sessionIdRef.current,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      if (meta) {
        body.batched = meta.batched;
        body.batched_count = meta.batched_count;
        body.first_message_at = meta.first_message_at;
        body.last_message_at = meta.last_message_at;
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      touchSession();

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        // Try to parse text as JSON in case content-type is wrong
        try {
          const parsed = JSON.parse(text);
          return parseWebhookResponse(parsed);
        } catch {
          if (text) return { text };
          throw new Error('Unexpected response format from webhook');
        }
      }

      const data = await response.json();
      return parseWebhookResponse(data);
    } catch (err: any) {
      const errorMessage = 'Unable to connect to chat service. Please try again later.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendChatMessage, isLoading, error, sessionId: sessionIdRef.current };
};
