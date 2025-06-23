
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium';
  proposalsCount: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula verificação de token ao carregar a página
    const token = localStorage.getItem('authToken');
    if (token) {
      // Simula dados do usuário
      setUser({
        id: '1',
        email: 'user@example.com',
        name: 'Usuário Demo',
        plan: 'free',
        proposalsCount: 2
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simula autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        plan: 'free' as const,
        proposalsCount: 0
      };
      setUser(userData);
      localStorage.setItem('authToken', 'demo-token');
    } catch (error) {
      throw new Error('Falha na autenticação');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simula registro
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        id: '1',
        email,
        name,
        plan: 'free' as const,
        proposalsCount: 0
      };
      setUser(userData);
      localStorage.setItem('authToken', 'demo-token');
    } catch (error) {
      throw new Error('Falha no registro');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
