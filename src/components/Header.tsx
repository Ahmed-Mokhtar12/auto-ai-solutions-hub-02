
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
