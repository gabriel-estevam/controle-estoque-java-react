import React, { createContext, useCallback, useContext, useState } from 'react';
;
const DrawerContext = createContext({});
export const useDrawerContext = () => {
    return useContext(DrawerContext);
};
export const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState([]);
    const [drawerOptionsNestedList, setDrawerOptionsNestedList] = useState([]);
    const [drawerOptionsNestedListReports, setDrawerOptionsNestedListReports] = useState([]);
    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);
    const handleSetDrawerOptions = useCallback((newDrawerOptions) => {
        setDrawerOptions(newDrawerOptions);
    }, []);
    const handleSetDrawerOptionsNestedList = useCallback((newDrawerOptionsNestedList) => {
        setDrawerOptionsNestedList(newDrawerOptionsNestedList);
    }, []);
    const handleSetDrawerOptionsNestedListReports = useCallback((newDrawerOptionsNestedListReports) => {
        setDrawerOptionsNestedListReports(newDrawerOptionsNestedListReports);
    }, []);
    return (<DrawerContext.Provider value={{ isDrawerOpen,
            toggleDrawerOpen,
            setDrawerOptions: handleSetDrawerOptions,
            setDrawerOptionsNestedList: handleSetDrawerOptionsNestedList,
            setDrawerOptionsNestedListReports: handleSetDrawerOptionsNestedListReports,
            drawerOptions,
            drawerOptionsNestedList,
            drawerOptionsNestedListReports
        }}>
            {children}
        </DrawerContext.Provider>);
};
