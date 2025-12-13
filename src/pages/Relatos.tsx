import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppData } from '@/contexts/AppDataContext';
import { ufpeLocations } from '@/data/ufpeLocations';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Relatos: React.FC = () => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();
  const { getRelatosByLocation } = useAppData();

  const location = ufpeLocations.find(loc => loc.id === locationId);
  const relatos = getRelatosByLocation(locationId || '');

  if (!location) {
    return (
      <div className="mobile-container flex items-center justify-center min-h-screen">
        <p>Localização não encontrada</p>
      </div>
    );
  }

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
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Relatos</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location.shortName}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 mt-4 overflow-auto">
        {relatos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum relato ainda</h3>
            <p className="text-sm text-muted-foreground">
              Seja o primeiro a compartilhar sua experiência nesta localização
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {relatos.map((relato) => (
              <div
                key={relato.id}
                className="p-4 bg-card border border-border rounded-xl"
              >
                <p className="text-sm text-foreground">{relato.content}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>
                    {format(new Date(relato.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-6 right-4 safe-area-bottom">
        <Button
          variant="gradient"
          size="iconLg"
          className="rounded-full shadow-xl"
          onClick={() => navigate(`/relatos/${locationId}/new`)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Relatos;
