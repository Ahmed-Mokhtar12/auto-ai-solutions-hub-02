
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

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden <div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">">
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
            Privacy Policy
          </h1>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700 max-h-[55vh] overflow-y-auto chat-scrollbar">
            <p className="text-white/70 text-sm mb-8">
              <strong className="text-gold">Effective Date:</strong> This Privacy Policy explains how DigitLab.ai collects, uses, and protects your information when you use our services, including our Facebook application and AI-powered tools.
            </p>

            <Section title="1. Information We Collect">
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li><strong className="text-white">Information you provide directly:</strong> Name, email address, and other details you submit through forms or when interacting with our services.</li>
                <li><strong className="text-white">Facebook Login data:</strong> When you connect via Facebook, we receive your public profile information (name, profile picture, email) as permitted by your Facebook privacy settings and the permissions you grant.</li>
                <li><strong className="text-white">Usage data:</strong> Information about how you interact with our services, including log data, IP addresses, browser type, and pages visited.</li>
                <li><strong className="text-white">Chat data:</strong> Messages and queries you submit to our AI agents to provide responses and improve our services.</li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Provide, operate, and improve our AI-powered services and automation tools.</li>
                <li>Personalise your experience and respond to your requests.</li>
                <li>Communicate with you about updates, features, and support.</li>
                <li>Analyse usage patterns to enhance performance and user experience.</li>
                <li>Comply with legal obligations and enforce our terms.</li>
              </ul>
              <p className="mt-2">We do <strong className="text-white">not</strong> sell your personal information to third parties.</p>
            </Section>

            <Section title="3. Data Storage & Security">
              <p>Your data is stored on secure servers with industry-standard safeguards, including encryption in transit (TLS) and at rest. We limit access to personal information to authorised personnel only and review our security practices regularly.</p>
              <p className="mt-2">While we implement strong security measures, no method of transmission over the internet is 100 % secure. We encourage you to use strong passwords and keep your account credentials confidential.</p>
            </Section>

            <Section title="4. Data Sharing">
              <p>We do not sell, trade, or rent your personal information. We may share data only in the following limited circumstances:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li><strong className="text-white">Service providers:</strong> Trusted third-party vendors who assist us in operating our platform (e.g., hosting, analytics) under strict confidentiality agreements.</li>
                <li><strong className="text-white">Legal requirements:</strong> When required by law or to protect our rights, users, or the public.</li>
                <li><strong className="text-white">Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              </ul>
            </Section>

            <Section title="5. Data Deletion">
              <p>You have the right to request deletion of your personal data at any time. To submit a deletion request, please contact us at:</p>
              <p className="mt-2">
                <a
                  href="mailto:info@digitlab.ai"
                  className="text-gold hover:text-gold/80 transition-colors font-medium"
                >
                  info@digitlab.ai
                </a>
              </p>
              <p className="mt-2">We will process your request within <strong className="text-white">7 business days</strong> and confirm once your data has been removed from our systems. Note that certain data may be retained where required by law or for legitimate business purposes.</p>
              <p className="mt-2">For Facebook users: you may also remove our app from your Facebook settings under <em>Settings → Apps and Websites</em>, which will revoke our access to your Facebook data.</p>
            </Section>

            <Section title="6. Cookies">
              <p>We use cookies and similar tracking technologies to enhance your experience, analyse site traffic, and understand how our services are used. Types of cookies we use:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li><strong className="text-white">Essential cookies:</strong> Necessary for the site to function correctly.</li>
                <li><strong className="text-white">Analytics cookies:</strong> Help us understand visitor interactions (e.g., Google Analytics).</li>
                <li><strong className="text-white">Preference cookies:</strong> Remember your settings such as theme mode (dark/light).</li>
              </ul>
              <p className="mt-2">You can control cookie settings through your browser preferences. Disabling certain cookies may affect the functionality of our services.</p>
            </Section>

            <Section title="7. Children's Privacy">
              <p>Our services are not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us at <a href="mailto:info@digitlab.ai" className="text-gold hover:text-gold/80 transition-colors">info@digitlab.ai</a> and we will promptly delete it.</p>
            </Section>

            <Section title="8. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on this page with a revised effective date.</p>
              <p className="mt-2">We encourage you to review this policy periodically. Your continued use of our services after any changes constitutes acceptance of the updated policy.</p>
            </Section>

            <Section title="9. Contact Information">
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to us:</p>
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

export default PrivacyPolicy;
