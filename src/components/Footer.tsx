
import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-800 py-2 mt-4 relative z-10">
      <div className="container mx-auto px-4 flex flex-col justify-between">
        <h2 className="text-sm font-bold mb-1 text-center text-gold">Contact Information</h2>
        <Separator className="mb-1 bg-navy-700" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-4xl mx-auto">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Mail className="text-gold h-3.5 w-3.5" />
              <a href="mailto:info@autoaihub.com" className="text-white text-xs hover:text-gold transition-colors">
                info@autoaihub.com
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="text-gold h-3.5 w-3.5" />
              <a href="tel:+971591342" className="text-white text-xs hover:text-gold transition-colors">
                +971 591 3426
              </a>
            </div>
          </div>
          
          <div className="space-y-0.5">
            <h3 className="text-xs font-semibold text-white mb-0.5">Social Media</h3>
            <div className="flex flex-wrap gap-2">
              <a href="https://www.facebook.com/aiautomationai" className="flex items-center gap-1 text-white text-xs hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-3 w-3" />
                <span>Facebook</span>
              </a>
              <a href="https://instagram.com" className="flex items-center gap-1 text-white text-xs hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-3 w-3" />
                <span>Instagram</span>
              </a>
              <a href="https://www.linkedin.com/company/106986356/admin/dashboard/" className="flex items-center gap-1 text-white text-xs hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-3 w-3" />
                <span>LinkedIn</span>
              </a>
              <a href="https://wa.me/009715913426" className="flex items-center gap-1 text-white text-xs hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-3 w-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-1 bg-navy-700" />
        
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
        
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} AI-Powered Automation Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
