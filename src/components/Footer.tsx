
import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F8D042]/30 bg-[#0B0F19]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-3">

          {/* Column 1 — Brand + Socials */}
          <div className="flex flex-col gap-2">
            <p className="text-[#F8D042] text-sm font-semibold tracking-wide">DigitLab.ai</p>
            <p className="text-white/50 text-xs">AI-Powered Automation Solutions</p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.facebook.com/aiautomationai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-7 md:h-7 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="Facebook"
              >
                <Facebook className="h-4 w-4 md:h-3.5 md:w-3.5" />
              </a>
              <a
                href="https://www.instagram.com/ai_digitlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-7 md:h-7 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="Instagram"
              >
                <Instagram className="h-4 w-4 md:h-3.5 md:w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/106986356/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-7 md:h-7 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4 md:h-3.5 md:w-3.5" />
              </a>
              <a
                href="https://wa.me/009715913426"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-7 md:h-7 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="WhatsApp"
              >
                <MessageSquare className="h-4 w-4 md:h-3.5 md:w-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2 — Solutions */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[#F8D042] text-xs font-semibold uppercase tracking-wider mb-1">Solutions</p>
            <Link to="/ai-agents" className="text-white/50 text-xs hover:text-[#F8D042] transition-colors py-1">AI Agents</Link>
            <Link to="/generative-ai" className="text-white/50 text-xs hover:text-[#F8D042] transition-colors py-1">Generative AI</Link>
            <Link to="/responsible-ai" className="text-white/50 text-xs hover:text-[#F8D042] transition-colors py-1">Responsible AI</Link>
          </div>

          {/* Column 3 — Company */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[#F8D042] text-xs font-semibold uppercase tracking-wider mb-1">Company</p>
            <Link to="/about-us" className="text-white/50 text-xs hover:text-[#F8D042] transition-colors py-1">About Us</Link>
            <Link to="/security" className="text-white/50 text-xs hover:text-[#F8D042] transition-colors py-1">Security</Link>
            <Link to="/privacy-policy" className="text-white/50 text-xs hover:text-[#F8D042] transition-colors py-1">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-white/50 text-xs hover:text-[#F8D042] transition-colors py-1">Terms of Service</Link>
          </div>

          {/* Column 4 — Contact */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[#F8D042] text-xs font-semibold uppercase tracking-wider mb-1">Contact</p>
            <a
              href="mailto:Ai.Agent@DigitLab.ai"
              className="inline-flex items-center gap-1.5 text-white/50 text-xs hover:text-[#F8D042] transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[#F8D042] shrink-0" />
              Ai.Agent@DigitLab.ai
            </a>
            <a
              href="tel:+9715913426"
              className="inline-flex items-center gap-1.5 text-white/50 text-xs hover:text-[#F8D042] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#F8D042] shrink-0" />
              +971 591 3426
            </a>
            <a
              href="https://wa.me/009715913426"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/50 text-xs hover:text-[#F8D042] transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-[#F8D042] shrink-0" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/5 pt-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} DigitLab.ai — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
