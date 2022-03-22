import React, { useContext, useState } from "react";

export const MainViewContext = React.createContext();
export const MainViewUpdateContext = React.createContext();

export const useMainView = () => useContext(MainViewContext);
export const useMainViewUpdate = () => useContext(MainViewUpdateContext);

export default function MainViewProvider({ children }) {
    const [child, setChild] = useState(<></>);

    return (
        <MainViewContext.Provider value={child}>
            <MainViewUpdateContext.Provider value={setChild}>
                {children}
            </MainViewUpdateContext.Provider>
        </MainViewContext.Provider>
    );
}