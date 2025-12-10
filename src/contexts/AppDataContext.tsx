import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Chamado {
  id: string;
  category: string;
  description: string;
  location: string;
  createdAt: Date;
  type: 'descricao' | 'emergencia';
  status: 'enviado' | 'em_analise' | 'resolvido';
}

interface Relato {
  id: string;
  content: string;
  location: string;
  locationName: string;
  createdAt: Date;
  status: 'em_analise' | 'publicado';
}

interface Notificacao {
  id: string;
  title: string;
  message: string;
  type: 'relato_publicado' | 'alerta_dsi';
  createdAt: Date;
  read: boolean;
}

interface AppDataContextType {
  chamados: Chamado[];
  relatos: Relato[];
  notificacoes: Notificacao[];
  addChamado: (chamado: Omit<Chamado, 'id' | 'createdAt' | 'status'>) => void;
  addRelato: (relato: Omit<Relato, 'id' | 'createdAt' | 'status'>) => void;
  updateRelato: (id: string, content: string) => void;
  deleteRelato: (id: string) => void;
  markNotificationRead: (id: string) => void;
  getRelatosByLocation: (location: string) => Relato[];
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [relatos, setRelatos] = useState<Relato[]>([
    {
      id: '1',
      content: 'Área com pouca iluminação à noite, tome cuidado ao passar por aqui após as 19h.',
      location: 'cin',
      locationName: 'CIn - Centro de Informática',
      createdAt: new Date(Date.now() - 86400000),
      status: 'publicado',
    },
    {
      id: '2',
      content: 'Presença de pessoas suspeitas próximo ao estacionamento na última semana.',
      location: 'ctg',
      locationName: 'CTG - Centro de Tecnologia',
      createdAt: new Date(Date.now() - 172800000),
      status: 'publicado',
    },
  ]);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    {
      id: '1',
      title: 'Alerta de Segurança',
      message: 'Reforço de segurança nas áreas próximas ao CTG durante o período noturno.',
      type: 'alerta_dsi',
      createdAt: new Date(),
      read: false,
    },
  ]);

  const addChamado = (chamado: Omit<Chamado, 'id' | 'createdAt' | 'status'>) => {
    const newChamado: Chamado = {
      ...chamado,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'enviado',
    };
    setChamados(prev => [newChamado, ...prev]);
  };

  const addRelato = (relato: Omit<Relato, 'id' | 'createdAt' | 'status'>) => {
    const newRelato: Relato = {
      ...relato,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'em_analise',
    };
    setRelatos(prev => [newRelato, ...prev]);
  };

  const updateRelato = (id: string, content: string) => {
    setRelatos(prev => prev.map(r => r.id === id ? { ...r, content } : r));
  };

  const deleteRelato = (id: string) => {
    setRelatos(prev => prev.filter(r => r.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getRelatosByLocation = (location: string) => {
    return relatos.filter(r => r.location === location && r.status === 'publicado');
  };

  return (
    <AppDataContext.Provider value={{
      chamados,
      relatos,
      notificacoes,
      addChamado,
      addRelato,
      updateRelato,
      deleteRelato,
      markNotificationRead,
      getRelatosByLocation,
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
