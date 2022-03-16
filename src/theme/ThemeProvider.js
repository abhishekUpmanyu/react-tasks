import React, { useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);
export const useThemeUpdate = () => useContext(ThemeUpdateContext);

export default function ThemeProvider({children}) {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    const toggleDarkMode = () => 
        setDarkMode(mode => !mode);

    return (
        <ThemeContext.Provider value={darkMode}>
            <ThemeUpdateContext.Provider value={toggleDarkMode}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}