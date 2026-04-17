
import React from 'react';
import { Mail, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoV3 from '@/assets/digitlab-logo-v3.png';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#F8D042]/30 bg-[#0B0F19]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-1">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">

          {/* Column 1 — Brand + Socials */}
          <div className="flex flex-col gap-0.5">
            <img src={logoV3} alt="DigitLab.ai" width={20} height={20} className="object-contain" />
            <p className="text-white/50 text-[9px] leading-tight">AI-Powered Automation Solutions</p>
            <div className="flex items-center gap-2 mt-0.5">
              <a
                href="https://www.facebook.com/aiautomationai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="Facebook"
              >
                <Facebook className="h-3 w-3" />
              </a>
              <a
                href="https://www.instagram.com/ai_digitlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="Instagram"
              >
                <Instagram className="h-3 w-3" />
              </a>
              <a
                href="https://www.linkedin.com/company/106986356/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="h-3 w-3" />
              </a>
              <a
                href="https://wa.me/15556395391"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
                title="WhatsApp"
              >
                <MessageSquare className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Column 2 — Solutions */}
          <div className="flex flex-col gap-0">
            <p className="text-[#F8D042] text-xs font-bold uppercase tracking-wider mb-0.5">Solutions</p>
            <Link to="/ai-agents" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">AI Agents</Link>
            <Link to="/generative-ai" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">Generative AI</Link>
            <Link to="/responsible-ai" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">Responsible AI</Link>
          </div>

          {/* Column 3 — Company */}
          <div className="flex flex-col gap-0">
            <p className="text-[#F8D042] text-xs font-bold uppercase tracking-wider mb-0.5">Company</p>
            <Link to="/about-us" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">About Us</Link>
            <Link to="/security" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">Security</Link>
            <Link to="/contact" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">Contact Us</Link>
            <Link to="/privacy-policy" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5">Terms of Service</Link>
          </div>

          {/* Column 4 — Contact */}
          <div className="flex flex-col gap-0">
            <p className="text-[#F8D042] text-xs font-bold uppercase tracking-wider mb-0.5">Contact</p>
            <a
              href="mailto:Ai.Agent@DigitLab.ai"
              className="inline-flex items-center gap-1 text-white/50 text-[10px] hover:text-[#F8D042] transition-colors py-0.5"
            >
              <Mail className="h-3 w-3 text-[#F8D042] shrink-0" />
              Ai.Agent@DigitLab.ai
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/5 pt-0.5">
          <p className="text-white/40 text-[10px]">
            © {new Date().getFullYear()} DigitLab.ai — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
