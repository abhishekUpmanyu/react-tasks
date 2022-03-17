import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DataContext = React.createContext();
const DataUpdateContext = React.createContext();

export const useData = () => useContext(DataContext);
export const useDataUpdate = () => useContext(DataUpdateContext);

export default function DataProvider({children}) {
    const [data, setData] = useLocalStorage('allData', {});

    return (
        <DataContext.Provider value={data}>
            <DataUpdateContext.Provider value={setData}>
                {children}
            </DataUpdateContext.Provider>
        </DataContext.Provider>
    );
}