/**
 * Centralized constants for repeated URLs / contact info.
 * Update once here to propagate everywhere.
 */
export const CALENDLY_URL = 'https://calendly.com/ahmed-mokhtar12/30min';
export const WHATSAPP_URL = 'https://wa.me/15556395391';
export const CONTACT_EMAIL = 'Ai.Agent@DigitLab.ai';
export const LEGAL_EMAIL = 'info@digitlab.ai';

/** Convenience helper to open Calendly in a new tab */
export const openCalendly = () => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
