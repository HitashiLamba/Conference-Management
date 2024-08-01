import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  email: string | null;
  token: string | null;
  setEmail: (email: string | null) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  console.log('Retrieved Token:', token); // Add this line to verify token

  return (
    <AuthContext.Provider value={{ email, token, setEmail, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
