
import React from 'react';
import Logo from './Logo';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const handleLogin = () => {
    // Handle login functionality
    console.log('Login clicked');
  };

  return (
    <header className="w-full py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <Link to="/services" className="text-sm text-gold hover:text-gold/80 transition-colors">
                  Services
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/security" className="text-sm text-gold hover:text-gold/80 transition-colors">
                  Security
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="text-sm text-gold hover:text-gold/80 transition-colors">
                  About Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button 
            onClick={handleLogin}
            className="gold-btn text-sm"
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
