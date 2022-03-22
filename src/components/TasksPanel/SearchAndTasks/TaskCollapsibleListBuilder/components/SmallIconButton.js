import React from "react";
import { useTheme } from "theme/ThemeProvider";

export default function SmallIconButton({ icon, onClick, size='12px' }) {
    const darkMode = useTheme();

    const style = {
        filter: darkMode ? 'invert() opacity(70%)' : '',
        height: size,
        width: size,
    };

    return (
        <img src={icon} style={style} onClick={onClick} alt="icon" />
    );
}