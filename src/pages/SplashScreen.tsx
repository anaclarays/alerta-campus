import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`mobile-container flex flex-col items-center justify-center min-h-screen gradient-primary transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center animate-fade-in">
        <img 
          src={logo} 
          alt="Alerta Campus Logo" 
          className="w-32 h-32 mb-8 drop-shadow-2xl"
        />
        <h1 className="text-2xl font-bold text-primary-foreground mb-4">
          Alerta Campus
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-primary-foreground/80 mt-4 text-sm">
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
