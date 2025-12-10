import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppData } from '@/contexts/AppDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ufpeLocations } from '@/data/ufpeLocations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categoryNames: Record<string, string> = {
  suspeito: 'Comportamento suspeito',
  estrutura: 'Estrutura danificada',
  assedio: 'Assédio',
  furto: 'Furto de itens',
  veiculos: 'Veículos / Transporte',
  animais: 'Animais / Risco com fauna',
  vandalismo: 'Vandalismo',
  outros: 'Outros',
};

const ChamadoForm: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const { addChamado } = useAppData();
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    description: '',
    location: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.location) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos para enviar',
        variant: 'destructive',
      });
      return;
    }

    addChamado({
      category: category || 'outros',
      description: formData.description,
      location: formData.location,
      type: 'descricao',
    });

    toast({
      title: 'Chamado enviado!',
      description: 'Sua ocorrência foi registrada com sucesso',
    });
    navigate('/home');
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/chamados')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Novo Chamado</h1>
            <p className="text-xs text-muted-foreground">
              {categoryNames[category || ''] || 'Ocorrência'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div>
          <Label htmlFor="name">Seu nome</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Digite seu nome"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição da ocorrência</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descreva detalhadamente o que aconteceu..."
            className="mt-1.5 min-h-32"
          />
        </div>

        <div>
          <Label>Localização</Label>
          <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Selecione a localização" />
            </SelectTrigger>
            <SelectContent>
              {ufpeLocations.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {loc.shortName}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 safe-area-bottom">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/chamados')}>
            Cancelar
          </Button>
          <Button variant="gradient" className="flex-1" onClick={handleSubmit}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChamadoForm;
