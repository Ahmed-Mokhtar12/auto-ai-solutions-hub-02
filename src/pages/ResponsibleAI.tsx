
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Scale, Users, Lock, ClipboardCheck } from 'lucide-react';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[#F8D042] mb-4">{title}</h2>
    {children}
  </div>
);

const principles = [
  { icon: Eye, title: "Transparency", desc: "Explainable models with clear audit trails so stakeholders understand how decisions are made." },
  { icon: Scale, title: "Fairness", desc: "Bias detection and mitigation across training data and model outputs to ensure equitable outcomes." },
  { icon: Lock, title: "Privacy", desc: "Data minimization, anonymization, and compliance with GDPR, CCPA, and regional regulations." },
  { icon: Users, title: "Accountability", desc: "Human-in-the-loop oversight, clear ownership, and escalation paths for every AI system." },
];

const ResponsibleAI = () => {
  return (
    <div className="<div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]"> className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow relative z-10">
        <div className="w-full max-w-4xl mx-auto py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[#F8D042] hover:text-[#F8D042]/80 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-8">
            Responsible AI
          </h1>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700 space-y-10 max-h-[55vh] overflow-y-auto chat-scrollbar">
            <p className="text-white/90 text-lg leading-relaxed">
              We prioritize ethical AI development with transparent, fair, and accountable solutions.
              Our Responsible AI practices ensure your systems are built with privacy, security,
              and human values at the core — technology that benefits everyone.
            </p>

            <Section title="Our Framework">
              <p className="text-white/80 text-sm leading-relaxed">
                Every AI solution we deliver passes through our Responsible AI framework: a structured
                process covering risk assessment, bias auditing, privacy review, and ongoing monitoring.
                We don't treat ethics as an afterthought — it's embedded in every stage from design to deployment.
              </p>
            </Section>

            <Section title="Core Principles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {principles.map((p) => (
                  <div key={p.title} className="flex items-start gap-3 p-4 rounded-lg bg-navy-700/40 border border-navy-700">
                    <p.icon className="h-5 w-5 text-[#F8D042] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">{p.title}</h3>
                      <p className="text-white/60 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Governance & Compliance">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-navy-700/40 border border-navy-700">
                <ClipboardCheck className="h-5 w-5 text-[#F8D042] mt-0.5 shrink-0" />
                <div className="text-white/80 text-sm leading-relaxed space-y-2">
                  <p>We help organizations establish AI governance structures including policy creation, risk registers, and review boards.</p>
                  <p>Our compliance support covers EU AI Act, ISO 42001, NIST AI RMF, and industry-specific regulations to keep your AI systems audit-ready.</p>
                </div>
              </div>
            </Section>

            <div className="text-center pt-4">
              <Button
                onClick={() => window.open('https://calendly.com/ahmed-mokhtar12/30min', '_blank')}
                className="gold-btn text-sm px-8"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default ResponsibleAI;
