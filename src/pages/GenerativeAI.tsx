
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Code, Image, FileText, Layers, PenTool } from 'lucide-react';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[#F8D042] gold-outline mb-4">{title}</h2>
    {children}
  </div>
);

const offerings = [
  { icon: PenTool, title: "Content Generation", desc: "Marketing copy, blog posts, product descriptions, and social media content tailored to your brand voice." },
  { icon: Code, title: "Code Assistance", desc: "Accelerate development with AI-generated code, documentation, and automated testing scripts." },
  { icon: Image, title: "Visual Content", desc: "Generate product images, marketing visuals, and design mockups from text descriptions." },
  { icon: FileText, title: "Report Synthesis", desc: "Transform raw data into executive summaries, trend analyses, and actionable insights." },
];

const applications = [
  { icon: Sparkles, title: "Personalized Marketing", desc: "Generate thousands of personalized email and ad variations that resonate with each customer segment." },
  { icon: Layers, title: "Knowledge Extraction", desc: "Summarize lengthy documents, extract key entities, and build searchable knowledge bases automatically." },
  { icon: Code, title: "Rapid Prototyping", desc: "Go from idea to working prototype faster by generating UI components, API schemas, and test data." },
];

const GenerativeAI = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow relative z-10">
        <div className="w-full max-w-4xl mx-auto py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[#F8D042] hover:text-[#F8D042]/80 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-8">
            Generative AI
          </h1>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700 space-y-10 max-h-[55vh] overflow-y-auto chat-scrollbar">
            <p className="text-white/90 text-lg leading-relaxed">
              Harness the power of Generative AI to create content, generate insights, and
              automate creative processes. Our solutions produce high-quality outputs across
              text, code, images, and data — powered by cutting-edge foundation models.
            </p>

            <Section title="What We Offer">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offerings.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-lg bg-navy-700/40 border border-navy-700">
                    <item.icon className="h-5 w-5 text-[#F8D042] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Applications">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {applications.map((app) => (
                  <div key={app.title} className="p-5 rounded-lg bg-navy-700/40 border border-navy-700 text-center">
                    <app.icon className="h-8 w-8 text-[#F8D042] mx-auto mb-3" />
                    <h3 className="text-white font-semibold text-sm mb-2">{app.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed">{app.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Seamless Integration">
              <p className="text-white/80 text-sm leading-relaxed">
                Our generative AI solutions integrate with your existing tech stack through APIs and webhooks.
                Whether you use CRMs, content management systems, or custom platforms, we connect generative
                capabilities directly into your workflows — no rip-and-replace required.
              </p>
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

export default GenerativeAI;
