
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-gold text-xl font-semibold mb-3">{title}</h2>
    <div className="text-white/90 leading-relaxed space-y-2">{children}</div>
  </div>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow flex items-start justify-center relative z-10 py-10">
        <div className="w-full max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-semibold text-white text-center mb-8">
            About Us
          </h1>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700 max-h-[55vh] overflow-y-auto chat-scrollbar">
            <p className="text-white/70 text-sm mb-8">
              <strong className="text-gold">DigitLab.ai</strong> — We are an AI-first company on a mission to transform the way businesses operate through intelligent automation and cutting-edge AI solutions.
            </p>

            <Section title="1. Who We Are">
              <p>DigitLab.ai is a team of AI engineers, product strategists, and automation specialists based in the UAE. We combine deep technical expertise with a pragmatic understanding of business challenges to deliver AI solutions that create real, measurable impact.</p>
              <p>We work across industries — from finance and retail to logistics and professional services — helping organisations harness the full potential of artificial intelligence.</p>
            </Section>

            <Section title="2. Our Mission">
              <p>Our mission is simple: to make advanced AI accessible and actionable for every business. We believe that AI should not be the exclusive domain of large enterprises with vast resources. By building practical, scalable, and responsible AI systems, we empower businesses of all sizes to compete, grow, and innovate.</p>
            </Section>

            <Section title="3. What We Build">
              <p>We specialise in building AI-powered solutions tailored to real business needs:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Intelligent AI agents that automate complex, multi-step workflows.</li>
                <li>Generative AI integrations for content, communication, and decision support.</li>
                <li>Custom AI pipelines connecting your existing tools and data sources.</li>
                <li>Responsible AI frameworks that ensure transparency, fairness, and compliance.</li>
              </ul>
            </Section>

            <Section title="4. Our Approach">
              <p>We don't believe in one-size-fits-all AI. Every engagement starts with understanding your specific goals, constraints, and data landscape. From there, we design, build, and deploy AI systems that integrate seamlessly with your operations.</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li><strong className="text-white">Discovery first</strong> — We take time to understand your business before writing a single line of code.</li>
                <li><strong className="text-white">Iterative delivery</strong> — We ship working solutions early and refine them based on real feedback.</li>
                <li><strong className="text-white">Security by design</strong> — Data protection and responsible AI practices are built in from the start.</li>
                <li><strong className="text-white">Long-term partnership</strong> — We stay engaged beyond launch to ensure your AI systems continue to perform and evolve.</li>
              </ul>
            </Section>

            <Section title="5. Contact Us">
              <p>We'd love to hear from you — whether you have a project in mind, a question about our services, or just want to explore what AI can do for your business.</p>
              <div className="mt-3 space-y-1">
                <p><strong className="text-white">DigitLab.ai</strong></p>
                <p>
                  <a href="mailto:info@digitlab.ai" className="text-gold hover:text-gold/80 transition-colors font-medium">
                    info@digitlab.ai
                  </a>
                </p>
              </div>
            </Section>

            <p className="text-white/50 text-xs mt-8 pt-6 border-t border-navy-700">
              © {new Date().getFullYear()} DigitLab.ai — AI-Powered Automation Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default AboutUs;
