
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';

const Section: React.FC<{title: string;children: React.ReactNode;}> = ({ title, children }) =>
<div className="mb-8">
    <h2 className="text-gold text-xl font-semibold mb-3">{title}</h2>
    <div className="text-white/90 leading-relaxed space-y-2">{children}</div>
  </div>;


const Security = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow flex items-start justify-center relative z-10 py-10">
        <div className="w-full max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6 text-sm font-medium">

            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-semibold text-white text-center mb-8">
            Security
          </h1>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700 max-h-[55vh] overflow-y-auto chat-scrollbar">
            <p className="text-white/70 text-sm mb-8">
              <strong className="text-gold">Our Commitment:</strong> At DigitLab.ai, security is foundational to everything we build. We apply industry-leading practices to protect your data, our infrastructure, and the AI systems that power our services.
            </p>

            <Section title="1. Our Security Commitment">
              <p>We treat security as a first-class concern — not an afterthought. Every product decision, infrastructure choice, and data handling practice is evaluated through a security lens. Our team follows a defence-in-depth strategy, layering multiple controls to minimise risk at every level of our stack.</p>
            </Section>

            <Section title="2. Data Encryption">
              <p>All data transmitted between your device and our servers is encrypted using <strong className="text-white">TLS 1.2 or higher</strong>. Data at rest is encrypted using <strong className="text-white">AES-256</strong>, including database records, file storage, and backups.</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>End-to-end encryption for all API communications.</li>
                <li>Encrypted database volumes with automated key rotation.</li>
                <li>Secrets and API keys stored in isolated, encrypted vaults — never in source code.</li>
              </ul>
            </Section>

            <Section title="3. Access Control">
              <p>We enforce strict access controls across all internal systems and customer-facing services:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Role-based access control (RBAC) limits what each team member can access.</li>
                <li>Multi-factor authentication (MFA) is required for all internal accounts.</li>
                <li>Principle of least privilege — personnel are granted only the access necessary for their role.</li>
                <li>All administrative access is logged, audited, and regularly reviewed.</li>
              </ul>
            </Section>

            <Section title="4. Infrastructure Security">
              <p>Our infrastructure is hosted on enterprise-grade cloud providers with SOC 2 Type II and ISO 27001 certifications. Key measures include:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Network segmentation and firewall rules to isolate sensitive workloads.</li>
                <li>Automated vulnerability scanning and dependency auditing on every deployment.</li>
                <li>DDoS protection and rate limiting across all public-facing endpoints.</li>
                <li>Regular penetration testing by independent security professionals.</li>
              </ul>
            </Section>

            <Section title="5. AI Model Security">
              <p>Our AI systems are designed with security and safety in mind:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Prompt injection mitigations are applied to all AI pipelines handling user input.</li>
                <li>AI outputs are sanitised before being stored or displayed to prevent injection attacks.</li>
                <li>Model inputs and outputs are logged for anomaly detection and abuse prevention.</li>
                <li>Customer data is never used to train or fine-tune third-party AI models without explicit consent.</li>
              </ul>
            </Section>

            <Section title="6. Incident Response">
              <p>We maintain a formal incident response plan that enables rapid detection, containment, and remediation of security events:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>24/7 monitoring with automated alerts for anomalous behaviour.</li>
                <li>Defined escalation paths and response runbooks for common incident types.</li>
                <li>Affected customers are notified promptly in the event of a breach that impacts their data.</li>
                <li>Post-incident reviews are conducted to identify root causes and prevent recurrence.</li>
              </ul>
            </Section>

            <Section title="7. Compliance">
              <p>DigitLab.ai is committed to meeting applicable regulatory and industry standards:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Operations align with <strong className="text-white">UAE data protection regulations</strong> and international privacy standards.</li>
                <li>GDPR-aligned data handling practices for users in the European Economic Area.</li>
                <li>Regular internal audits to assess compliance posture and identify gaps.</li>
              </ul>
            </Section>

            <Section title="8. Responsible Disclosure">
              <p>We believe in working collaboratively with the security community. If you discover a potential vulnerability in our systems, we encourage you to report it responsibly.</p>
              <p className="mt-2">Please do <strong className="text-white">not</strong> exploit the vulnerability, access customer data, or disrupt our services. Instead, contact us directly and we will work with you to resolve the issue promptly.</p>
              <p className="mt-2">
                Report security issues to:{' '}
                <a
                  href="mailto:security@digitlab.ai"
                  className="text-gold hover:text-gold/80 transition-colors font-medium">

                  security@digitlab.ai
                </a>
              </p>
            </Section>

            <Section title="9. Contact">
              <p>For any security-related questions or concerns, please reach out to our team:</p>
              <div className="mt-3 space-y-1">
                <p><strong className="text-white">DigitLab.ai — Security Team</strong></p>
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
    </div>);

};

export default Security;