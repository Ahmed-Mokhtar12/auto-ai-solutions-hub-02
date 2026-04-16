
import React from 'react';
import { Landmark } from 'lucide-react';
import IndustryPageTemplate from './IndustryPageTemplate';

const Finance = () => (
  <IndustryPageTemplate
    icon={Landmark}
    title="Finance"
    overview="Intelligent automation for financial services — accelerating document processing, strengthening fraud detection, and ensuring regulatory compliance with AI that understands the stakes."
    useCases={[
      { title: "Document Processing", description: "Automated extraction and classification of financial documents — loan applications, KYC forms, invoices — with 99%+ accuracy." },
      { title: "Risk Analysis", description: "Real-time risk scoring models that evaluate credit, market, and operational risks using both structured data and unstructured signals." },
      { title: "Compliance Automation", description: "AI-powered monitoring that flags regulatory violations, generates audit reports, and keeps your team ahead of evolving requirements." },
    ]}
    steps={[
      { number: "01", title: "Compliance Mapping", description: "We map your regulatory landscape and document workflows to identify automation opportunities that reduce risk." },
      { number: "02", title: "Secure Deployment", description: "Models deployed in your secure environment with encryption, access controls, and full audit trails." },
      { number: "03", title: "Continuous Compliance", description: "Ongoing model monitoring, regulatory update tracking, and quarterly performance reviews." },
    ]}
  />
);

export default Finance;
