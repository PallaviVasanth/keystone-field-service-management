import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { User, UserRole } from '../types';

interface AuthContextValue {
  user: User | null;
  role: UserRole;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const defaultUser: User = {
  id: 'u1',
  name: 'Alicia Chen',
  email: 'alicia@keystone.com',
  role: 'manager',
  avatar: 'AC',
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const role = user?.role ?? 'manager';

  const login = (_email: string, _password: string) => {
    setUser(defaultUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, role, login, logout }), [user, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
