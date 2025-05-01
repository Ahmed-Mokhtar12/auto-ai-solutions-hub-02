
import React from 'react';
import Header from '@/components/Header';
import SolutionCard from '@/components/SolutionCard';
import { toast } from '@/components/ui/sonner';

// We'll use appropriate icons from lucide-react
import { 
  SearchIcon, 
  Settings, 
  RefreshCw, 
  FileText, 
  MessageSquare,
  AlertCircle,
  Database,
  Workflow,
  Bot,
  Repeat
} from "lucide-react";

const Index = () => {
  // Functions to handle button clicks
  const handleExploreClick = () => {
    toast.success("Exploring solutions...", {
      description: "We'll help you find the right automation solution"
    });
  };
  
  const handleSupportClick = () => {
    toast.success("Support request sent", {
      description: "Our team will contact you shortly"
    });
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">How can we automate for you?</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Powerful AI solutions to streamline your workflows and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* First solution card */}
          <SolutionCard
            title="I need automation for business processes"
            options={[
              { icon: <Workflow size={20} className="text-gold" />, title: "Workflow automation" },
              { icon: <Database size={20} className="text-gold" />, title: "Data processing & analysis" },
              { icon: <Bot size={20} className="text-gold" />, title: "AI chatbots & assistants" },
              { icon: <RefreshCw size={20} className="text-gold" />, title: "Continuous integration" },
              { icon: <MessageSquare size={20} className="text-gold" />, title: "Other inquiries" }
            ]}
            buttonText="Explore Solutions"
            buttonAction={handleExploreClick}
          />

          {/* Second solution card */}
          <SolutionCard
            title="I'm looking for AI integration options"
            description="We partner with leading AI platforms to bring you cutting-edge solutions that can transform your business operations and enhance productivity."
            options={[
              { icon: <Bot size={20} className="text-gold" />, title: "Custom AI model implementation" },
              { icon: <Repeat size={20} className="text-gold" />, title: "API integrations" },
              { icon: <FileText size={20} className="text-gold" />, title: "Document processing" }
            ]}
            buttonText="Get Support"
            buttonAction={handleSupportClick}
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500">
            © 2025 AI Automation. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
