import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const RegisterType: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-background">
      <div className="p-4">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 mb-4 bg-gradient-to-b from-white to-gray-100 p-2.5 shadow-lg">
              <img src={logo} alt="Alerta Campus" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Criar Conta</h1>
            <p className="text-muted-foreground text-sm mt-1 text-center">
              Escolha o tipo de cadastro
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/register/ufpe')}
              className="w-full p-5 bg-card border-2 border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Sou da UFPE</h3>
                  <p className="text-sm text-muted-foreground">Estudante, professor ou funcionário</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/register/external')}
              className="w-full p-5 bg-card border-2 border-border rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Users className="w-6 h-6 text-secondary group-hover:text-secondary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Não sou da UFPE</h3>
                  <p className="text-sm text-muted-foreground">Visitante ou usuário externo</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterType;
