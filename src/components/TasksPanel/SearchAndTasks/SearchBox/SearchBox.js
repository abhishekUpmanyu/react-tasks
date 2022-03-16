import React from "react";
import { useTheme } from "../../../../theme/ThemeProvider";

export function SearchBox() {
    const darkMode = useTheme();

    const style = {
        borderRadius: '8px',
        padding: '4px',
        background: darkMode ? '#2e3047' : '#eaf4f2',
        color: darkMode ? '#ffffff' : '#000000',
    };

    return (
        <input type="text" placeholder="search" style={style} />
    );
}