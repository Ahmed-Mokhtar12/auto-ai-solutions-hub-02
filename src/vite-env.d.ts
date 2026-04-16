/// <reference types="vite/client" />

interface VapiInstance {
  start(assistantId: string): Promise<void>;
  stop(): void;
  on(event: string, callback: (...args: any[]) => void): void;
  removeAllListeners(): void;
}

interface VapiConstructor {
  new (publicKey: string): VapiInstance;
}

interface Window {
  vapiPublicKey: string;
  assistantId: string;
  Vapi: VapiConstructor;
}
