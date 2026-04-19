import React from 'react';
import Logo from './Logo';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Bot, Cpu, BrainCircuit, ShieldCheck, Hotel, Factory, Landmark, ShoppingBag, HeartPulse, Truck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const services = [
  { label: 'AI Agents', href: '/ai-agents', icon: Bot, desc: 'Intelligent automation workflows' },
  { label: 'Generative AI', href: '/generative-ai', icon: Cpu, desc: 'Content & data generation' },
  { label: 'Responsible AI', href: '/responsible-ai', icon: ShieldCheck, desc: 'Ethical & secure AI practices' },
  { label: 'All Services', href: '/services', icon: BrainCircuit, desc: 'Explore our full offering' },
];

const industries = [
  { label: 'Hospitality', href: '/industries/hospitality', icon: Hotel, desc: 'Our core specialty' },
  { label: 'Manufacturing', href: '/industries/manufacturing', icon: Factory, desc: 'Process optimization' },
  { label: 'Finance', href: '/industries/finance', icon: Landmark, desc: 'Risk & compliance AI' },
  { label: 'Retail', href: '/industries/retail', icon: ShoppingBag, desc: 'Customer intelligence' },
  { label: 'Healthcare', href: '/industries/healthcare', icon: HeartPulse, desc: 'Clinical & operational AI' },
  { label: 'Supply Chain', href: '/industries/logistics', icon: Truck, desc: 'Logistics automation' },
];

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  const handleBookDemo = () => {
    window.open('https://calendly.com/ahmed-mokhtar12/30min', '_blank');
  };

  if (isMobile) {
    return (
      <header className="w-full py-4 px-4 relative z-30">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-3">
            <Button
              onClick={handleBookDemo}
              className="gold-btn text-xs px-3 py-1.5 h-auto"
            >
              Request a Demo
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-gold/20 w-[280px]">
                <SheetTitle className="text-gold text-lg mb-6">Menu</SheetTitle>
                <nav className="flex flex-col gap-1">
                  {/* Services section */}
                  <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 pt-4 pb-2">Services</p>
                  {services.map((s) => (
                    <SheetClose asChild key={s.label}>
                      <Link
                        to={s.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground/80 hover:text-gold hover:bg-gold/5 transition-colors"
                      >
                        <s.icon className="h-4 w-4 text-gold/70" />
                        <div>
                          <div className="font-medium">{s.label}</div>
                          <div className="text-xs text-muted-foreground">{s.desc}</div>
                        </div>
                      </Link>
                    </SheetClose>
                  ))}

                  {/* Industries section */}
                  <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 pt-6 pb-2">Industries</p>
                  {industries.map((ind) => (
                    <SheetClose asChild key={ind.label}>
                      <Link
                        to={ind.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/80 hover:text-gold hover:bg-gold/5 transition-colors"
                      >
                        <ind.icon className="h-4 w-4 text-gold/70" />
                        <div>
                          <div className="font-medium">{ind.label}</div>
                          <div className="text-xs text-muted-foreground">{ind.desc}</div>
                        </div>
                      </Link>
                    </SheetClose>
                  ))}

                  {/* Other links */}
                  <div className="border-t border-gold/10 mt-4 pt-4 flex flex-col gap-1">
                    <SheetClose asChild>
                      <Link to="/security" className="px-3 py-2.5 text-sm text-foreground/80 hover:text-gold transition-colors rounded-md hover:bg-gold/5">
                        Security
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/about" className="px-3 py-2.5 text-sm text-foreground/80 hover:text-gold transition-colors rounded-md hover:bg-gold/5">
                        About Us
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/contact" className="px-3 py-2.5 text-sm text-foreground/80 hover:text-gold transition-colors rounded-md hover:bg-gold/5">
                        Contact
                      </Link>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full py-6 relative z-30">
      <div className="container mx-auto px-4 flex items-center">
        <Logo />
        <nav className="flex items-center gap-4 lg:gap-6 ml-8">
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors outline-none cursor-pointer">
              Services <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/95 backdrop-blur-xl border-gold/20 min-w-[240px]">
              {services.map((s) => (
                <DropdownMenuItem key={s.label} asChild>
                  <Link to={s.href} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer">
                    <s.icon className="h-4 w-4 text-gold/70" />
                    <div>
                      <div className="font-medium text-sm">{s.label}</div>
                      <div className="text-xs text-muted-foreground">{s.desc}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Industries Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors outline-none cursor-pointer">
              Industries <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/95 backdrop-blur-xl border-gold/20 min-w-[240px]">
              <DropdownMenuLabel className="text-xs text-gold/60 uppercase tracking-wider">Our Specialties</DropdownMenuLabel>
              {industries.map((ind) => (
                <DropdownMenuItem key={ind.label} asChild>
                  <Link to={ind.href} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer">
                    <ind.icon className="h-4 w-4 text-gold/70" />
                    <div>
                      <div className="font-medium text-sm">{ind.label}</div>
                      <div className="text-xs text-muted-foreground">{ind.desc}</div>
                    </div>
                    {ind.label === 'Hospitality' && (
                      <span className="ml-auto text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full">Core</span>
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/security" className="text-sm text-gold hover:text-gold/80 transition-colors">
            Security
          </Link>
          <Link to="/about" className="text-sm text-gold hover:text-gold/80 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-sm text-gold hover:text-gold/80 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3 ml-auto shrink-0">
          <Button onClick={handleBookDemo} className="gold-btn text-sm">
            Request a Demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
