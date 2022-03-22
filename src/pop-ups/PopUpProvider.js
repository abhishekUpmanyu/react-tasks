import React, { useContext, useState } from 'react';

const PopUpContext = React.createContext();
const PopUpUpdateContext = React.createContext();

export const usePopUp = () => useContext(PopUpContext);
export const usePopUpUpdate = () => useContext(PopUpUpdateContext);

export default function PopUpProvider({ children }) {
    const [popUp, setPopUp] = useState(<></>);

    return (
        <PopUpContext.Provider value={popUp}>
            <PopUpUpdateContext.Provider value={setPopUp}>
                {children}
            </PopUpUpdateContext.Provider>
        </PopUpContext.Provider>
    );
}