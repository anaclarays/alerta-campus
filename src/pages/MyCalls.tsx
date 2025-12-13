import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, AlertTriangle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppData } from '@/contexts/AppDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MyCalls: React.FC = () => {
  const navigate = useNavigate();
  const { chamados } = useAppData();
  const [filter, setFilter] = useState<'all' | 'descricao' | 'emergencia'>('all');

  const filteredChamados = chamados.filter(c => 
    filter === 'all' ? true : c.type === filter
  );

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
          <h1 className="text-lg font-semibold">Suas Chamadas</h1>
        </div>
      </div>

      <div className="p-4 mt-4 border-b border-border">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button
            variant={filter === 'descricao' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('descricao')}
          >
            Descrição
          </Button>
          <Button
            variant={filter === 'emergencia' ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => setFilter('emergencia')}
          >
            Emergência
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {filteredChamados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhuma chamada</h3>
            <p className="text-sm text-muted-foreground">
              Você ainda não realizou nenhum chamado
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChamados.map((chamado) => (
              <div
                key={chamado.id}
                className={`p-4 rounded-xl border ${
                  chamado.type === 'emergencia'
                    ? 'bg-destructive/5 border-destructive/20'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    chamado.type === 'emergencia'
                      ? 'bg-destructive/20'
                      : 'bg-primary/20'
                  }`}>
                    {chamado.type === 'emergencia' ? (
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    ) : (
                      <Phone className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-foreground capitalize">
                        {chamado.type === 'emergencia' ? 'Emergência' : chamado.category}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        chamado.status === 'enviado'
                          ? 'bg-success/20 text-success'
                          : chamado.status === 'em_analise'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {chamado.status === 'enviado' ? 'Enviado' : chamado.status === 'em_analise' ? 'Em análise' : 'Resolvido'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {chamado.description}
                    </p>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {format(new Date(chamado.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalls;
