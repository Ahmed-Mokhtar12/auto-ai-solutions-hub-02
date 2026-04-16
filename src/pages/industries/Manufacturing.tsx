
import React from 'react';
import { Factory } from 'lucide-react';
import IndustryPageTemplate from './IndustryPageTemplate';

const Manufacturing = () => (
  <IndustryPageTemplate
    icon={Factory}
    title="Manufacturing"
    overview="AI-driven solutions for modern manufacturing — from predictive maintenance that prevents costly downtime to quality control systems that catch defects human eyes miss."
    useCases={[
      { title: "Predictive Maintenance", description: "Machine learning models that analyze sensor data to predict equipment failures before they happen, reducing unplanned downtime by up to 40%." },
      { title: "Quality Assurance", description: "Computer vision systems that inspect products at line speed, detecting micro-defects and ensuring consistent quality across every batch." },
      { title: "Supply Chain AI", description: "Demand forecasting and inventory optimization that keeps your supply chain lean without risking stockouts or production delays." },
    ]}
    steps={[
      { number: "01", title: "Data Assessment", description: "We evaluate your sensor infrastructure, production data, and existing systems to build an accurate AI readiness picture." },
      { number: "02", title: "Model Development", description: "Custom models trained on your historical data, validated against real-world scenarios, and integrated into your control systems." },
      { number: "03", title: "Scale & Optimize", description: "Roll out across production lines with real-time dashboards, alert systems, and continuous model retraining." },
    ]}
  />
);

export default Manufacturing;
