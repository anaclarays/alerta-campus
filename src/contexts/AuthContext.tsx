import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: string;
  address: string;
  isUFPE: boolean;
  matricula?: string;
  centro?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção, conectar com backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user for demonstration
    setUser({
      id: '1',
      name: 'Usuário Demo',
      email: username.includes('@') ? username : `${username}@ufpe.br`,
      phone: '(81) 99999-9999',
      cpf: '000.000.000-00',
      birthDate: '1990-01-01',
      gender: 'Outro',
      address: 'Recife, PE',
      isUFPE: true,
      matricula: password,
      centro: 'CIn - Centro de Informática',
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
