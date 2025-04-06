import { createContext, ReactNode, useState } from "react";

type AppMode = 'speak' | 'emergency' | 'call';
type ContextType = {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
}
const defaultContext: ContextType = {
    mode: 'speak',
    setMode: () => {}
}

export const AppContext = createContext<ContextType>(defaultContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<AppMode>('speak');
    
    return <AppContext.Provider value={{ mode, setMode }}>
        {children}
    </AppContext.Provider>
}

