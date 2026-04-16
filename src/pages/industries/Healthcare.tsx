
import React from 'react';
import { HeartPulse } from 'lucide-react';
import IndustryPageTemplate from './IndustryPageTemplate';

const Healthcare = () => (
  <IndustryPageTemplate
    icon={HeartPulse}
    title="Healthcare"
    overview="AI solutions for healthcare organizations that improve patient engagement, optimize clinical workflows, and reduce administrative burden — while maintaining the highest standards of data privacy and compliance."
    useCases={[
      { title: "Patient Engagement", description: "Automated appointment reminders, follow-up communications, and health education delivered through preferred channels." },
      { title: "Scheduling AI", description: "Intelligent scheduling that optimizes provider utilization, reduces no-shows, and matches patients with the right specialists." },
      { title: "Workflow Automation", description: "Streamlined clinical documentation, referral processing, and insurance verification that frees staff to focus on patient care." },
    ]}
    steps={[
      { number: "01", title: "HIPAA-First Assessment", description: "Every engagement starts with a thorough privacy and compliance assessment to ensure all AI solutions meet healthcare regulations." },
      { number: "02", title: "Clinical Integration", description: "Solutions integrated with your EHR, scheduling systems, and communication platforms with minimal workflow disruption." },
      { number: "03", title: "Outcome Tracking", description: "Measurable KPIs — patient satisfaction, wait times, staff efficiency — tracked and reported monthly." },
    ]}
  />
);

export default Healthcare;
