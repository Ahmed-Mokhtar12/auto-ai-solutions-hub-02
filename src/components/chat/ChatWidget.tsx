import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatFab from './ChatFab';
import WhatsAppFab from './WhatsAppFab';
import VoiceCallFab from './VoiceCallFab';
import ContactFab from './ContactFab';
import ChatPanel from './ChatPanel';

/**
 * Orchestrator for the floating chat experience.
 * - Desktop: 3 stacked FABs (Voice, WhatsApp, Chat) + chat panel.
 * - Mobile: Single ContactFab that expands into the 3 actions + chat panel.
 */
const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <ContactFab onOpenChat={() => setIsOpen(true)} isChatOpen={isOpen} />
      ) : (
        <>
          <VoiceCallFab />
          <WhatsAppFab />
          <ChatFab isOpen={isOpen} onClick={() => setIsOpen(v => !v)} />
        </>
      )}

      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatWidget;
