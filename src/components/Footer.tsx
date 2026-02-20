
import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F8D042]/30 bg-[#0B0F19]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">

          {/* Left — Contact Info */}
          <div className="flex flex-col gap-1.5">
            <a
              href="mailto:Ai.Agent@DigitLab.ai"
              className="inline-flex items-center gap-2 text-white/80 text-xs hover:text-[#F8D042] transition-colors group"
            >
              <Mail className="h-4 w-4 text-[#F8D042] shrink-0" />
              Ai.Agent@DigitLab.ai
            </a>
            <a
              href="tel:+9715913426"
              className="inline-flex items-center gap-2 text-white/80 text-xs hover:text-[#F8D042] transition-colors group"
            >
              <Phone className="h-4 w-4 text-[#F8D042] shrink-0" />
              +971 591 3426
            </a>
          </div>

          {/* Centre — Copyright & Legal */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} AI-Powered Automation Solutions
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Link to="/privacy-policy" className="hover:text-[#F8D042] transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <a href="#" className="hover:text-[#F8D042] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Right — Social Icons */}
          <div className="flex items-center justify-end gap-3">
            <a
              href="https://www.facebook.com/aiautomationai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/106986356/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/009715913426"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#F8D042] hover:border-[#F8D042]/40 hover:bg-[#F8D042]/10 transition-all"
              title="WhatsApp"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
