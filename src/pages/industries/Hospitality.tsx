
import React from 'react';
import { Hotel } from 'lucide-react';
import IndustryPageTemplate from './IndustryPageTemplate';

const Hospitality = () => (
  <IndustryPageTemplate
    icon={Hotel}
    title="Hospitality"
    overview="Our core expertise. We build AI-powered solutions for luxury hotels and resorts that elevate guest experiences, optimize revenue, and streamline operations — from pre-arrival to post-checkout."
    useCases={[
      { title: "Smart Concierge", description: "Multilingual AI concierge that handles guest requests, restaurant reservations, spa bookings, and local recommendations 24/7 via chat, voice, or in-room devices." },
      { title: "Revenue Optimization", description: "Dynamic pricing models that analyze demand patterns, competitor rates, and event calendars to maximize RevPAR across all room categories." },
      { title: "Guest Personalization", description: "AI that remembers guest preferences across stays — room temperature, pillow type, dining habits — and proactively tailors each experience." },
    ]}
    steps={[
      { number: "01", title: "Audit & Map", description: "We analyze your guest journey touchpoints, PMS data, and operational workflows to identify the highest-impact automation opportunities." },
      { number: "02", title: "Build & Integrate", description: "Custom AI agents are built and integrated with your existing PMS, CRM, and communication channels with zero disruption." },
      { number: "03", title: "Monitor & Refine", description: "Continuous performance monitoring with weekly optimization cycles to improve guest satisfaction scores and operational efficiency." },
    ]}
  />
);

export default Hospitality;
