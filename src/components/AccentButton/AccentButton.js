import React from "react";
import ButtonText from 'typography/ButtonText';
import { useTheme } from "../../theme/ThemeProvider";

export function AccentButton(props) {
    const darkMode = useTheme();

    const style = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: '4px',
        padding: '12px 16px',
        backgroundColor: props.type==='dark' ? '#43455c' : '#3bba9c',
        border: 'none',
        borderRadius: '24px',
    };

    const iconStyle = {
        filter: 'invert(100%)',
        width: '18px',
    };

    return (
        <button onClick={props.onClick} style={style}>
            { props.icon ? <img src={props.icon} style={iconStyle} alt={'icon'} /> : <></>}
            <ButtonText text={props.text} />
        </button>
    );
}