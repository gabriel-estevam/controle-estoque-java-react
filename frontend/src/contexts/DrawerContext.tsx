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
    icon: ReactNode;
  }

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    drawerOptionsNestedList: IDrawerOption[];
    drawerOptionsNestedListReports: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
    setDrawerOptionsNestedList: (newDrawerOptionsNestedList: IDrawerOption[]) => void;
    setDrawerOptionsNestedListReports: (newDrawerOptionsNestedList: IDrawerOption[]) => void;
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<Props> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
    const [drawerOptionsNestedList, setDrawerOptionsNestedList] = useState<IDrawerOption[]>([]);
    const [drawerOptionsNestedListReports, setDrawerOptionsNestedListReports] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions);
      }, []);

    const handleSetDrawerOptionsNestedList = useCallback((newDrawerOptionsNestedList: IDrawerOption[]) => {
        setDrawerOptionsNestedList(newDrawerOptionsNestedList);
      }, []);

    const handleSetDrawerOptionsNestedListReports = useCallback((newDrawerOptionsNestedListReports: IDrawerOption[]) => {
        setDrawerOptionsNestedListReports(newDrawerOptionsNestedListReports);
      }, []);
    

    return (
        <DrawerContext.Provider 
            value={{ isDrawerOpen, 
                     toggleDrawerOpen, 
                     setDrawerOptions : handleSetDrawerOptions, 
                     setDrawerOptionsNestedList : handleSetDrawerOptionsNestedList, 
                     setDrawerOptionsNestedListReports : handleSetDrawerOptionsNestedListReports, 
                     drawerOptions,
                     drawerOptionsNestedList,
                     drawerOptionsNestedListReports
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
};