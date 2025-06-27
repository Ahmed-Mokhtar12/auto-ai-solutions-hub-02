
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import NightBackground from '@/components/NightBackground';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <NightBackground />
      <div className="relative z-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
