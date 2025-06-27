
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import StarryBackground from '@/components/StarryBackground';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <AuthForm />
    </div>
  );
};

export default Auth;
