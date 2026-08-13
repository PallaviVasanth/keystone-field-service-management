import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import api from '../services/api';
import type { LoginResponse, RegisterRequest, RegisterResponse, User, UserRole } from '../types';

interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => void;
  clearError: () => void;
}

const TOKEN_KEY = 'keystone-token';
const USER_KEY = 'keystone-user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const loginResponseToUser = (data: LoginResponse): User => ({
  id: data.userId,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  role: data.role,
  active: true,
  createdAt: new Date().toISOString(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore a previously-authenticated session on page load/refresh.
  // The stored user is trusted at face value (there is no /me endpoint
  // to re-verify against) — it's cleared automatically the next time an
  // API call gets a 401, via the response interceptor in services/api.ts.
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      const { token } = response.data;
      const nextUser = loginResponseToUser(response.data);

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    } catch (err) {
      const message = extractErrorMessage(err, 'Invalid email or password.');
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.post<RegisterResponse>('/auth/register', data);
      return response.data;
    } catch (err) {
      const message = extractErrorMessage(err, 'Registration failed. Please try again.');
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const clearError = () => setError(null);

  const value = useMemo(
    () => ({ user, role: user?.role ?? null, isLoading, error, login, register, logout, clearError }),
    [user, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Reads a GlobalExceptionHandler-shaped error body ({ message, ... }) if
// present, otherwise falls back to a generic message. Never throws.
function extractErrorMessage(err: unknown, fallback: string): string {
  if (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
  ) {
    return (err as { response: { data: { message: string } } }).response.data.message;
  }
  return fallback;
}