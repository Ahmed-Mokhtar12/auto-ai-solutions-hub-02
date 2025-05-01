
import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gold">Contact Information</h2>
        <Separator className="mb-6 bg-navy-700" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-gold" />
              <a href="mailto:Ahmed.mokhtar12@gmail.com" className="text-white hover:text-gold transition-colors">
                Ahmed.mokhtar12@gmail.com
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="text-gold" />
              <a href="tel:009715913426" className="text-white hover:text-gold transition-colors">
                +971 591 3426
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Social Media</h3>
            <div className="flex flex-wrap gap-6">
              <a href="https://facebook.com" className="flex items-center gap-2 text-white hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook />
                <span>Facebook</span>
              </a>
              <a href="https://instagram.com" className="flex items-center gap-2 text-white hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram />
                <span>Instagram</span>
              </a>
              <a href="https://linkedin.com" className="flex items-center gap-2 text-white hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://wa.me/009715913426" className="flex items-center gap-2 text-white hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <MessageSquare />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-6 bg-navy-700" />
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} AI Automation Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
