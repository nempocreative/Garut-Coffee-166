import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthRole, getRoleProfile, RoleProfile } from '@/data/auth';

type AuthSession = RoleProfile;

type AuthValue = {
  session: AuthSession | null;
  ready: boolean;
  signIn: (role: AuthRole) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);
const sessionKey = '@kopi/auth-session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(sessionKey)
      .then((value) => {
        if (!value) return;
        try {
          const saved = JSON.parse(value) as { role?: AuthRole };
          if (saved.role) setSession(getRoleProfile(saved.role));
        } catch {
          // Ignore a stale local session and keep the app in guest mode.
        }
      })
      .finally(() => setReady(true));
  }, []);

  const signIn = useCallback(async (role: AuthRole) => {
    const nextSession = getRoleProfile(role);
    setSession(nextSession);
    await AsyncStorage.setItem(sessionKey, JSON.stringify({ role }));
  }, []);

  const signOut = useCallback(async () => {
    setSession(null);
    await AsyncStorage.removeItem(sessionKey);
  }, []);

  const value = useMemo(() => ({ session, ready, signIn, signOut }), [session, ready, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}