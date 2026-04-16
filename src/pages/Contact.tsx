
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Calendar, Mail, Phone, MessageSquare } from 'lucide-react';
import { z } from 'zod';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput } from '@/utils/inputSanitizer';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be under 1000 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      company: sanitizeInput(form.company || ''),
      message: sanitizeInput(form.message),
    };

    const result = contactSchema.safeParse(sanitized);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Try webhook, fall back to mailto
      const res = await fetch('https://n8n.digitlab.ai/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact_form', ...result.data }),
      });
      if (!res.ok) throw new Error('Webhook failed');
      toast({ title: 'Message sent!', description: "We'll get back to you within 24 hours." });
      setForm({ name: '', email: '', company: '', message: '' });
    } catch {
      // Fallback: open mailto
      const subject = encodeURIComponent(`Contact from ${result.data.name}`);
      const body = encodeURIComponent(`Name: ${result.data.name}\nEmail: ${result.data.email}\nCompany: ${result.data.company || 'N/A'}\n\n${result.data.message}`);
      window.open(`mailto:Ai.Agent@DigitLab.ai?subject=${subject}&body=${body}`, '_blank');
      toast({ title: 'Opening email client', description: 'Our webhook is temporarily unavailable. Please send the email directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden <div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow relative z-10">
        <div className="w-full max-w-4xl mx-auto py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[#F8D042] hover:text-[#F8D042]/80 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-8">
            Get in Touch
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-white/80 text-sm">Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    className="mt-1 bg-navy-700/50 border-navy-700 text-white placeholder:text-white/30 focus-visible:ring-[#F8D042]/50"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-white/80 text-sm">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className="mt-1 bg-navy-700/50 border-navy-700 text-white placeholder:text-white/30 focus-visible:ring-[#F8D042]/50"
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="company" className="text-white/80 text-sm">Company</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={e => handleChange('company', e.target.value)}
                    className="mt-1 bg-navy-700/50 border-navy-700 text-white placeholder:text-white/30 focus-visible:ring-[#F8D042]/50"
                    placeholder="Your company (optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-white/80 text-sm">Message *</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    className="mt-1 bg-navy-700/50 border-navy-700 text-white placeholder:text-white/30 focus-visible:ring-[#F8D042]/50 min-h-[120px]"
                    placeholder="Tell us about your project or challenge..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="gold-btn w-full text-sm">
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Info panel */}
            <div className="space-y-6">
              <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700">
                <h2 className="text-xl font-semibold text-[#F8D042] mb-4">Prefer a live conversation?</h2>
                <p className="text-white/70 text-sm mb-4">Book a 30-minute discovery call to discuss your AI automation needs.</p>
                <Button
                  onClick={() => window.open('https://calendly.com/ahmed-mokhtar12/30min', '_blank')}
                  className="gold-btn text-sm w-full"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule a Demo
                </Button>
              </div>

              <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700 space-y-3">
                <h2 className="text-xl font-semibold text-[#F8D042] mb-4">Direct Contact</h2>
                <a href="mailto:Ai.Agent@DigitLab.ai" className="flex items-center gap-3 text-white/70 text-sm hover:text-[#F8D042] transition-colors">
                  <Mail className="h-4 w-4 text-[#F8D042] shrink-0" /> Ai.Agent@DigitLab.ai
                </a>
                <a href="tel:+9715913426" className="flex items-center gap-3 text-white/70 text-sm hover:text-[#F8D042] transition-colors">
                  <Phone className="h-4 w-4 text-[#F8D042] shrink-0" /> +971 591 3426
                </a>
                <a href="https://wa.me/009715913426" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 text-sm hover:text-[#F8D042] transition-colors">
                  <MessageSquare className="h-4 w-4 text-[#F8D042] shrink-0" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Contact;
