import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAppData } from '@/contexts/AppDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { notificacoes, markNotificationRead } = useAppData();

  const handleNotificationClick = (id: string) => {
    markNotificationRead(id);
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-background">
      <div className="sticky top-4 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Notificações</h1>
        </div>
      </div>

      <div className="flex-1 p-4 mt-4">
        {notificacoes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhuma notificação</h3>
            <p className="text-sm text-muted-foreground">
              Você não tem notificações no momento
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notificacoes.map((notificacao) => (
              <button
                key={notificacao.id}
                onClick={() => handleNotificationClick(notificacao.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  notificacao.read
                    ? 'bg-card border-border'
                    : 'bg-primary/5 border-primary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notificacao.type === 'alerta_dsi'
                      ? 'bg-warning/20'
                      : 'bg-success/20'
                  }`}>
                    {notificacao.type === 'alerta_dsi' ? (
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground">
                      {notificacao.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notificacao.message}
                    </p>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {format(new Date(notificacao.createdAt), "dd/MM 'às' HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  {!notificacao.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;