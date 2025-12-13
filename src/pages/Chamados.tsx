import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Car, Eye, Package, Building, Bug, Brush, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'suspeito', name: 'Comportamento suspeito', icon: Eye },
  { id: 'estrutura', name: 'Estrutura danificada', icon: Building },
  { id: 'assedio', name: 'Assédio', icon: AlertCircle },
  { id: 'furto', name: 'Furto de itens', icon: Package },
  { id: 'veiculos', name: 'Veículos / Transporte', icon: Car },
  { id: 'animais', name: 'Animais / Risco com fauna', icon: Bug },
  { id: 'vandalismo', name: 'Vandalismo', icon: Brush },
  { id: 'outros', name: 'Outros', icon: MoreHorizontal },
];

const Chamados: React.FC = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/chamados/form/${categoryId}`);
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
          <h1 className="text-lg font-semibold">Tipo de Chamado</h1>
        </div>
      </div>

      <div className="flex-1 p-4 mt-4">
        <p className="text-sm text-muted-foreground mb-4">
          Selecione a categoria que melhor descreve sua ocorrência:
        </p>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="flex flex-col items-center justify-center p-4 bg-card border-2 border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 aspect-square"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-center text-foreground leading-tight">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chamados;
