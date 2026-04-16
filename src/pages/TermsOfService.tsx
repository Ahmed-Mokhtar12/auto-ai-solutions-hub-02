
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

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow flex items-start justify-center relative z-10 py-10">
        <div className="w-full max-w-4xl">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-semibold text-white text-center mb-8">
            Terms of Service
          </h1>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700 max-h-[55vh] overflow-y-auto chat-scrollbar">
            <p className="text-white/70 text-sm mb-8">
              <strong className="text-gold">Effective Date:</strong> By accessing or using DigitLab.ai's services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform or AI-powered tools.
            </p>

            <Section title="1. Acceptance of Terms">
              <p>By accessing or using any part of the DigitLab.ai platform, website, or related services (collectively, the "Services"), you confirm that you have read, understood, and agree to be bound by these Terms of Service and our <Link to="/privacy-policy" className="text-gold hover:text-gold/80 transition-colors">Privacy Policy</Link>.</p>
              <p className="mt-2">If you do not agree to these terms, please do not use our Services.</p>
            </Section>

            <Section title="2. Description of Services">
              <p>DigitLab.ai provides AI-powered automation solutions, including but not limited to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>AI agent development and deployment</li>
                <li>Generative AI tools and integrations</li>
                <li>Business process automation consulting</li>
                <li>Custom AI workflow design and implementation</li>
              </ul>
              <p className="mt-2">We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time with or without notice.</p>
            </Section>

            <Section title="3. User Responsibilities">
              <p>You agree to use our Services only for lawful purposes. You must not:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Use the Services in any way that violates applicable local, national, or international laws or regulations.</li>
                <li>Attempt to gain unauthorised access to any part of our platform or its related systems.</li>
                <li>Transmit any harmful, offensive, or disruptive content through our Services.</li>
                <li>Reverse engineer, decompile, or attempt to extract source code from our proprietary tools.</li>
                <li>Use our AI tools to generate content that is illegal, defamatory, or infringes third-party rights.</li>
              </ul>
            </Section>

            <Section title="4. Intellectual Property">
              <p>All content, designs, software, and AI models provided through the Services are the exclusive intellectual property of DigitLab.ai or its licensors. You are granted a limited, non-exclusive, non-transferable licence to use the Services for their intended purpose.</p>
              <p className="mt-2">You retain ownership of any content you submit to the Services, but grant DigitLab.ai a worldwide, royalty-free licence to use, process, and store that content solely to provide and improve the Services.</p>
            </Section>

            <Section title="5. AI-Generated Content">
              <p>Our Services incorporate large language models and generative AI technology. You acknowledge that:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>AI-generated outputs may not always be accurate, complete, or up to date.</li>
                <li>You are responsible for reviewing and validating any AI-generated content before acting on it.</li>
                <li>DigitLab.ai is not liable for decisions made based on AI-generated outputs.</li>
              </ul>
            </Section>

            <Section title="6. Payment & Billing">
              <p>Certain features of the Services may require payment. Where applicable:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>All fees are stated in US Dollars (USD) unless otherwise specified.</li>
                <li>Payments are processed securely through our payment providers.</li>
                <li>Refund requests are handled on a case-by-case basis at DigitLab.ai's discretion.</li>
                <li>We reserve the right to change pricing with 30 days' notice to existing subscribers.</li>
              </ul>
            </Section>

            <Section title="7. Limitation of Liability">
              <p>To the fullest extent permitted by law, DigitLab.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Services — even if we have been advised of the possibility of such damages.</p>
              <p className="mt-2">Our total aggregate liability to you for any claims arising under these Terms shall not exceed the greater of AED 500 or the amount you paid to us in the 12 months preceding the claim.</p>
            </Section>

            <Section title="8. Disclaimers">
              <p>The Services are provided on an <strong className="text-white">"as is"</strong> and <strong className="text-white">"as available"</strong> basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p className="mt-2">We do not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
            </Section>

            <Section title="9. Termination">
              <p>We may suspend or terminate your access to the Services at any time, with or without cause or notice. Upon termination, your right to use the Services ceases immediately.</p>
              <p className="mt-2">You may stop using the Services at any time. Provisions of these Terms that by their nature should survive termination shall survive.</p>
            </Section>

            <Section title="10. Governing Law">
              <p>These Terms are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of the UAE.</p>
            </Section>

            <Section title="11. Changes to These Terms">
              <p>We may update these Terms from time to time. We will notify you of material changes by posting the revised Terms on this page with an updated effective date. Your continued use of the Services after any changes constitutes your acceptance of the updated Terms.</p>
            </Section>

            <Section title="12. Contact Us">
              <p>If you have any questions about these Terms, please contact us:</p>
              <div className="mt-3 space-y-1">
                <p><strong className="text-white">DigitLab.ai</strong></p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:info@digitlab.ai"
                    className="text-gold hover:text-gold/80 transition-colors font-medium"
                  >
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

export default TermsOfService;
