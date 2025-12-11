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
    <div className={`mobile-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center animate-fade-in">
        <img 
          src={logo} 
          alt="Alerta Campus Logo" 
          className="w-32 h-32 mb-8 drop-shadow-2xl"
        />
        <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 bg-clip-text text-transparent drop-shadow-md mb-4">
          Alerta Campus
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-gray-700 mt-4 text-sm">
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
