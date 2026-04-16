
import React from 'react';
import { Truck } from 'lucide-react';
import IndustryPageTemplate from './IndustryPageTemplate';

const Logistics = () => (
  <IndustryPageTemplate
    icon={Truck}
    title="Logistics & Supply Chain"
    overview="AI-powered logistics solutions that optimize routes, automate warehouse operations, and provide real-time tracking intelligence — reducing costs and delivery times across your supply chain."
    useCases={[
      { title: "Route Optimization", description: "Dynamic routing algorithms that factor in traffic, weather, delivery windows, and vehicle capacity to minimize costs and transit times." },
      { title: "Warehouse AI", description: "Automated picking strategies, inventory placement optimization, and demand-driven restocking that maximize warehouse throughput." },
      { title: "Tracking Systems", description: "Real-time shipment visibility with predictive ETA updates, exception alerts, and automated customer notifications." },
    ]}
    steps={[
      { number: "01", title: "Network Analysis", description: "We map your logistics network, identify bottlenecks, and model the impact of AI optimization on cost and delivery performance." },
      { number: "02", title: "System Integration", description: "AI agents connected to your TMS, WMS, and carrier APIs for seamless data flow and automated decision-making." },
      { number: "03", title: "Performance Tuning", description: "Continuous model refinement using real delivery data, seasonal patterns, and evolving network conditions." },
    ]}
  />
);

export default Logistics;
