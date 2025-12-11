import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import logo from '@/assets/logo.png';
import MapView from '@/components/MapView';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mobile-container relative h-screen overflow-hidden bg-muted">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <div style={{ height: '100%', width: '100%' }}>
          <MapView />
        </div>
      </div>

      {/* Header - comentário teste p commit */}
<div className="absolute top-0 left-0 right-0 z-[1000] p-4 safe-area-top">

  <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
    <div className="flex items-center justify-between">

      {/* Some quando o menu estiver aberto */}
      {!menuOpen && (
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-lg">
          <img src={logo} alt="Logo" className="w-6 h-6" />
          <span className="font-semibold text-sm text-foreground">
            Alerta Campus
          </span>
        </div>
      )}

      {/* Botão do menu */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-card/95 backdrop-blur-sm shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
    </div>

    {/* Conteúdo da aba lateral */}
    <SheetContent side="right" className="w-72">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <div className="bg-white rounded-lg p-1">
            <img src={logo} alt="Logo" className="w-8 h-8" />
          </div>
          Menu
        </SheetTitle>
      </SheetHeader>

      <nav className="mt-6 space-y-2">
        <button
          onClick={() => navigate('/profile')}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
        >
          Seu Perfil
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
        >
          Notificações
        </button>

        <button
          onClick={() => navigate('/my-calls')}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
        >
          Suas Chamadas
        </button>

        <button
          onClick={() => navigate('/my-reports')}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
        >
          Seus Relatos
        </button>
      </nav>
    </SheetContent>
  </Sheet>

</div>

      {!menuOpen && (
  <div className="absolute bottom-6 right-4 z-[1000] safe-area-bottom transition-all duration-300">
    <Button
      variant="emergency"
      size="iconLg"
      className="rounded-full shadow-xl"
      onClick={() => setShowEmergencyOptions(true)}
    >
      <AlertTriangle className="w-8 h-8" />
    </Button>
  </div>
)}

      {/* Emergency Options Modal */}
      {showEmergencyOptions && (
        <div className="absolute inset-0 z-[1001] bg-foreground/50 flex items-end justify-center">
          <div className="w-full max-w-md bg-card rounded-t-3xl p-6 animate-slide-up safe-area-bottom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Chamados e Emergências</h2>
              <button
                onClick={() => setShowEmergencyOptions(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowEmergencyOptions(false);
                  navigate('/chamados');
                }}
                className="w-full p-4 bg-primary/10 border-2 border-primary rounded-xl text-left hover:bg-primary/20 transition-colors"
              >
                <h3 className="font-semibold text-primary">Chamado: descreva a sua ocorrência</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Relate uma situação para a equipe de segurança
                </p>
              </button>

              <button
                onClick={() => {
                  setShowEmergencyOptions(false);
                  navigate('/emergency');
                }}
                className="w-full p-4 bg-destructive/10 border-2 border-destructive rounded-xl text-left hover:bg-destructive/20 transition-colors"
              >
                <h3 className="font-semibold text-destructive">Emergência: envie um alerta!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Envie um alerta em tempo real para o DSI
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
