import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import AccentButton from "components/AccentButton";
import PopUpBackground from "./components/PopUpBackground";
import { useTaskPopUpVisibility } from "../../pop-ups/PopUpProvider";

export default function TaskPopUp() {
    const darkMode = useTheme();

    const toggleTasksPopUp = useTaskPopUpVisibility();

    const backgroundStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    const popUpStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        height: '60%',
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        transform: 'translate(-50%, -50%)',
        backgroundColor: darkMode ? '#3bba9c' : '#fff',
        borderRadius: '16px',
        padding: '32px',
    };

    const titleDescriptionContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
    };

    const titleInputStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        color: '#4f4f4f',
        fontSize: 44,
        outline: 'none',
    };

    const descriptionInputStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        color: '#4f4f4f',
        fontSize: 24,
        flex: '1 1 auto',
        outline: 'none',
        resize: 'none',
    }

    const buttonsContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        columnGap: '4px',
    };

    return (
        <div style = {backgroundStyle}>
            <div style={popUpStyle}>
                <div style={titleDescriptionContainerStyle}>
                    <input style={titleInputStyle} placeholder="title" /><br />
                    <textarea style={descriptionInputStyle} placeholder="description" />
                </div>
                <div style={buttonsContainerStyle}>
                    <AccentButton text='Cancel' type="dark" onClick={toggleTasksPopUp} />
                    <AccentButton text='Save' type="dark" />
                </div>
            </div>
        </div>
    );
}