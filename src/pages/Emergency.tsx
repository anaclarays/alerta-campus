import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppData } from '@/contexts/AppDataContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Emergency: React.FC = () => {
  const navigate = useNavigate();
  const { addChamado } = useAppData();
  const [countdown, setCountdown] = useState(5);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const sendEmergencyAlert = useCallback(() => {
    addChamado({
      category: 'emergencia',
      description: 'Alerta de emergência enviado pelo usuário',
      location: 'Campus UFPE',
      type: 'emergencia',
    });
    setAlertSent(true);
  }, [addChamado]);

  useEffect(() => {
    if (alertSent || showCancelDialog) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      sendEmergencyAlert();
    }
  }, [countdown, alertSent, showCancelDialog, sendEmergencyAlert]);

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    navigate('/home');
  };

  const resumeCountdown = () => {
    setShowCancelDialog(false);
  };

  if (alertSent) {
    return (
      <div className="mobile-container flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-4">
            Alerta de emergência enviado!
          </h1>
          <p className="text-muted-foreground">
            Aguarde o retorno do Departamento de Segurança Institucional.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => navigate('/home')}
          >
            Voltar ao mapa
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container flex flex-col min-h-screen gradient-primary">
      <div className="p-4 safe-area-top">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-destructive/30 rounded-full animate-pulse-ring" />
          <div className="w-40 h-40 rounded-full bg-destructive flex items-center justify-center shadow-xl relative z-10">
            <span className="text-6xl font-bold text-destructive-foreground animate-countdown">
              {countdown}
            </span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h1 className="text-xl font-bold text-primary-foreground mb-2">
            Enviando alerta de emergência
          </h1>
          <p className="text-primary-foreground/80">
            O alerta será enviado em {countdown} segundos
          </p>
        </div>
      </div>

      <div className="p-4 safe-area-bottom">
        <Button
          variant="outline"
          size="lg"
          className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja cancelar?</DialogTitle>
            <DialogDescription>
              O alerta de emergência não será enviado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onClick={resumeCountdown}>
              Cancelar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={confirmCancel}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Emergency;
