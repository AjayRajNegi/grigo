import { createContext, ReactNode, useContext, useState } from "react";

type AuthState = "user" | "guest" | null;
type UserRole = "owner" | "worker" | null;

type AuthContextType = {
  authState: AuthState;
  userRole: UserRole;
  isAuthenticated: boolean;
  setAuthState: (auth: AuthState) => void;
  setUserRole: (role: UserRole) => void;
  guestMode: (auth: AuthState) => void;
  login: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("guest");
  const [userRole, setUserRole] = useState<UserRole>(null);

  const guestMode = (auth: AuthState) => {
    setAuthState(auth);
  };

  const login = (role: UserRole) => {
    setUserRole(role);
  };
  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        userRole,
        isAuthenticated: userRole !== null,
        setAuthState,
        setUserRole,
        guestMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
