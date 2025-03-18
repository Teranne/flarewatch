
import React, { createContext, useContext, useState } from 'react';

// Create a simple auth context 
interface AuthContextType {
  user: any | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<any | null>;
  signout: () => Promise<void>;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Placeholder authentication functions
  const signin = async (email: string, password: string) => {
    console.log("Signing in with:", email);
    setUser({ email });
  };

  const signup = async (email: string, password: string) => {
    console.log("Signing up with:", email);
    const newUser = { email };
    setUser(newUser);
    return newUser;
  };

  const signout = async () => {
    console.log("Signing out");
    setUser(null);
  };

  const updateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    console.log("Updating profile:", data);
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, signout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
