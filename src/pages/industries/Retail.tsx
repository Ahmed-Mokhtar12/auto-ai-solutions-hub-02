
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import IndustryPageTemplate from './IndustryPageTemplate';

const Retail = () => (
  <IndustryPageTemplate
    icon={ShoppingBag}
    title="Retail"
    overview="AI solutions that transform retail operations — from personalized customer journeys and intelligent inventory management to omnichannel automation that drives conversion and loyalty."
    useCases={[
      { title: "Customer Analytics", description: "Deep behavioral analysis that segments customers, predicts churn, and identifies upsell opportunities across every channel." },
      { title: "Inventory AI", description: "Demand forecasting models that optimize stock levels by location, reducing overstock costs while preventing lost sales." },
      { title: "Omnichannel Bots", description: "AI assistants deployed across web, mobile, and social channels that handle product queries, returns, and order tracking seamlessly." },
    ]}
    steps={[
      { number: "01", title: "Customer Journey Audit", description: "We analyze your sales data, customer touchpoints, and competitive landscape to find the biggest AI-driven growth levers." },
      { number: "02", title: "Platform Integration", description: "AI agents integrated with your e-commerce platform, POS systems, and marketing tools for a unified intelligence layer." },
      { number: "03", title: "Measure & Scale", description: "A/B testing, conversion tracking, and iterative optimization to continuously improve ROI." },
    ]}
  />
);

export default Retail;
