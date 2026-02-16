import { createContext, ReactNode, useContext, useState } from "react";

type UserState = "owner" | "worker" | null;

interface AppContextType {
  userState: UserState;
  setUserState: (user: UserState) => void;
  isGuestMode: boolean;
  switchGuestMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);
  const [userState, setUserState] = useState<UserState>(null);

  const switchGuestMode = () => {
    setIsGuestMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        userState,
        setUserState,
        isGuestMode,
        switchGuestMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider.");
  }
  return context;
};
