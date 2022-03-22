import React from "react";
import { useTheme } from "theme/ThemeProvider";
import FooterButton from "./FooterButton";

export function FooterButtons(props) {
    const footerRowStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'stretch',
        columnGap: '8px',
        width: '100%',
    }

    return (
        <div style={footerRowStyle}>
            {props.buttons.map(
                button =>
                    <FooterButton
                        key={button.text}
                        icon={button.icon}
                        text={button.text}
                        onClick={button.onClick}
                    />
            )}
        </div>
    );
}