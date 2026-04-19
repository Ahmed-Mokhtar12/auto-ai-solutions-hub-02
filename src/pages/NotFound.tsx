import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative pb-[15vh]">
      <DynamicBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <h1 className="text-7xl md:text-8xl font-bold text-[#F8D042] mb-4">404</h1>
            <p className="text-xl text-white/80 mb-2">Page not found</p>
            <p className="text-sm text-white/50 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button className="gold-btn">Return to Home</Button>
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
