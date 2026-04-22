import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkyBackground from '@/components/SkyBackground';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen relative pb-[15vh]">
      <SkyBackground />
      <Header />
      <main className="container mx-auto px-4 py-12 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto bg-background/40 backdrop-blur-xl border border-gold/20 rounded-2xl p-10 text-center shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Your AI Dashboard
          </h1>
          <p className="text-lg text-foreground/80 mb-2">Coming soon.</p>
          <p className="text-sm text-muted-foreground">
            A unified view of your hospitality AI workflows, guest insights, and agent activity — designed exclusively for luxury hotels and resorts.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
