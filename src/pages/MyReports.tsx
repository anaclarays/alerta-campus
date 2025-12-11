import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, MapPin, Clock, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppData } from '@/contexts/AppDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MyReports: React.FC = () => {
  const navigate = useNavigate();
  const { relatos, deleteRelato } = useAppData();
  const [filter, setFilter] = useState<'all' | 'publicado' | 'em_analise'>('all');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const myRelatos = relatos.filter(r => 
    filter === 'all' ? true : r.status === filter
  );

  const handleDelete = (id: string) => {
    deleteRelato(id);
    setDeleteTarget(null);
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Seus Relatos</h1>
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'publicado' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('publicado')}
          >
            Publicados
          </Button>
          <Button
            variant={filter === 'em_analise' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('em_analise')}
          >
            Em análise
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {myRelatos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum relato</h3>
            <p className="text-sm text-muted-foreground">
              Você ainda não escreveu nenhum relato
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myRelatos.map((relato) => (
              <div
                key={relato.id}
                className={`p-4 rounded-xl border ${
                  relato.status === 'em_analise'
                    ? 'bg-warning/5 border-warning/20'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{relato.locationName}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    relato.status === 'publicado'
                      ? 'bg-success/20 text-success'
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {relato.status === 'publicado' ? 'Publicado' : 'Em análise'}
                  </span>
                </div>

                <p className="text-sm text-foreground mb-3">{relato.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>
                      {format(new Date(relato.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {relato.status === 'em_analise' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/relatos/${relato.location}/edit/${relato.id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(relato.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Cancelar envio</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este relato?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>
              Não
            </Button>
            <Button variant="destructive" className="flex-1" onClick={() => deleteTarget && handleDelete(deleteTarget)}>
              Sim, excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyReports;
