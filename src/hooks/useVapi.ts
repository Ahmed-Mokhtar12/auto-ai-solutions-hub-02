import { useState, useRef, useCallback, useEffect } from 'react';

type CallStatus = 'idle' | 'connecting' | 'active';

export function useVapi() {
  const [status, setStatus] = useState<CallStatus>('idle');
  const vapiRef = useRef<VapiInstance | null>(null);

  const getVapi = useCallback(() => {
    if (vapiRef.current) return vapiRef.current;
    if (!window.Vapi || !window.vapiPublicKey) return null;
    const instance = new window.Vapi(window.vapiPublicKey);
    instance.on('call-start', () => setStatus('active'));
    instance.on('call-end', () => setStatus('idle'));
    instance.on('error', () => setStatus('idle'));
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
    setStatus('connecting');
    try {
      await vapi.start(window.assistantId);
    } catch {
      setStatus('idle');
    }
  }, [status, getVapi]);

  useEffect(() => {
    return () => {
      vapiRef.current?.stop();
      vapiRef.current?.removeAllListeners();
    };
  }, []);

  return { status, toggleCall };
}
