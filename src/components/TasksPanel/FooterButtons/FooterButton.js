import React from "react";
import { useTheme } from "../../../theme/ThemeProvider";
import ButtonText from "typography/ButtonText";

export default function FooterButton(props) {
    const darkMode = useTheme();

    const style = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: '4px',
        padding: '12px',
        backgroundColor: darkMode ? '#3bba9c' : '#000000',
        border: 'none',
        borderRadius: '24px',
    };

    const iconStyle = {
        filter: 'invert(100%)',
        width: '18px',
    };

    return (
        <button onClick={props.onClick} style={style}>
            <img src={props.icon} style={iconStyle} alt={'icon'} />
            <ButtonText text={props.text} />
        </button>
    );
}