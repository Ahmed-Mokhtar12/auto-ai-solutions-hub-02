
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import StarryBackground from '@/components/StarryBackground';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <div className="relative z-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
