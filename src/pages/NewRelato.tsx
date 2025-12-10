import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAppData } from '@/contexts/AppDataContext';
import { useToast } from '@/hooks/use-toast';
import { ufpeLocations } from '@/data/ufpeLocations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const NewRelato: React.FC = () => {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();
  const { addRelato } = useAppData();
  const { toast } = useToast();

  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [content, setContent] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locationId || '');

  const location = ufpeLocations.find(loc => loc.id === selectedLocation);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: 'Campo obrigatório',
        description: 'Escreva um relato para enviar',
        variant: 'destructive',
      });
      return;
    }

    if (wordCount > 150) {
      toast({
        title: 'Relato muito longo',
        description: 'O relato deve ter no máximo 150 palavras',
        variant: 'destructive',
      });
      return;
    }

    addRelato({
      content: content.trim(),
      location: selectedLocation,
      locationName: location?.name || '',
    });

    toast({
      title: 'Relato enviado!',
      description: 'Seu relato foi enviado para análise',
    });
    navigate(`/relatos/${selectedLocation}`);
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/relatos/${locationId}`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Novo Relato</h1>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div>
          <Label>Localização</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Selecione a localização" />
            </SelectTrigger>
            <SelectContent>
              {ufpeLocations.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {loc.shortName} - {loc.name.split(' - ')[1]}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label>Seu relato</Label>
            <span className={`text-xs ${wordCount > 150 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {wordCount}/150 palavras
            </span>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Compartilhe sua experiência de segurança nesta localização..."
            className="min-h-40"
          />
        </div>

        <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
          <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Seu relato será exibido de forma anônima após aprovação da equipe de segurança.
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 safe-area-bottom">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate(`/relatos/${locationId}`)}>
            Cancelar
          </Button>
          <Button variant="gradient" className="flex-1" onClick={handleSubmit}>
            Enviar
          </Button>
        </div>
      </div>

      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-center">Sobre seus relatos</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4 text-sm">
            <div>
              <strong className="text-foreground">Como seus relatos aparecem:</strong>
              <p className="mt-1">
                Seus relatos são exibidos de forma anônima no mapa e no feed do campus, 
                mostrando apenas local e data. Nenhuma informação pessoal será compartilhada.
              </p>
            </div>
            <div>
              <strong className="text-foreground">Como seus relatos são usados:</strong>
              <p className="mt-1">
                Os relatos ajudam a informar a comunidade, revelar padrões de risco e 
                dar visibilidade a situações que normalmente não são registradas. 
                Eles servem exclusivamente para conscientização e prevenção, 
                nunca para identificação individual.
              </p>
            </div>
          </DialogDescription>
          <Button onClick={() => setShowDisclaimer(false)} className="mt-4">
            Entendi
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewRelato;
