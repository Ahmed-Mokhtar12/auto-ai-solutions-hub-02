import { useState, useRef, useCallback, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

type CallStatus = 'idle' | 'connecting' | 'active';

export function useVapi() {
  const [status, setStatus] = useState<CallStatus>('idle');
  const vapiRef = useRef<Vapi | null>(null);

  const getVapi = useCallback(() => {
    if (vapiRef.current) return vapiRef.current;
    const publicKey = window.vapiPublicKey;
    if (!publicKey) {
      console.error('[Vapi] Missing window.vapiPublicKey');
      return null;
    }
    const instance = new Vapi(publicKey);
    instance.on('call-start', () => {
      console.log('[Vapi] call-start');
      setStatus('active');
    });
    instance.on('call-end', () => {
      console.log('[Vapi] call-end');
      setStatus('idle');
    });
    instance.on('error', (e: unknown) => {
      console.error('[Vapi] error event', e);
      setStatus('idle');
    });
    vapiRef.current = instance;
    return instance;
  }, []);

  const toggleCall = useCallback(async () => {
    if (status === 'active' || status === 'connecting') {
      vapiRef.current?.stop();
      setStatus('idle');
      return;
    }
    const vapi = getVapi();
    if (!vapi) return;
    const assistantId = window.assistantId;
    if (!assistantId) {
      console.error('[Vapi] Missing window.assistantId');
      return;
    }
    setStatus('connecting');
    try {
      await vapi.start(assistantId);
    } catch (err) {
      console.error('[Vapi] start() failed', err);
      setStatus('idle');
    }
  }, [status, getVapi]);

  useEffect(() => {
    return () => {
      vapiRef.current?.stop();
      vapiRef.current?.removeAllListeners?.();
    };
  }, []);

  return { status, toggleCall };
}
