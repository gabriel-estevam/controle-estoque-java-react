import React, { ReactNode, 
                createContext, 
                useCallback, 
                useContext,
                useState } from 'react';

type Props = {
    children: ReactNode
};

interface IDrawerOption {
    path: string;
    label: string;
  }

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<Props> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions);
      }, []);
    

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, setDrawerOptions : handleSetDrawerOptions, drawerOptions }}>
            {children}
        </DrawerContext.Provider>
    )
};