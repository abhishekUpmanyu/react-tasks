import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import AccentButton from "components/AccentButton";
import { usePopUpUpdate } from "../../pop-ups/PopUpProvider";
import Caption from 'typography/Caption';
import { useData, useDataUpdate } from "../../data/DataProvider";
import { v4 as uuid } from 'uuid';

export default function TaskPopUp(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const data = useData();
    const dataUpdate = useDataUpdate();

    const updatePopUp = usePopUpUpdate();

    const darkMode = useTheme();

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
        height: '50%',
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

    const addTask = () => {
        var id = uuid();
        var task = {
            uuid: id,
            title: title,
            description: description,
            color: '#ffffff',
            done: false,
        };
        if (props.groupId) {
            data[props.groupId].tasks[id] = task;
        } else {
            data[id] = task;
        }
        dataUpdate(data);
        updatePopUp(<></>);
    }

    return (
        <div style={backgroundStyle}>
            <div style={popUpStyle}>
                {props.group ? <><Caption text={`Group: ${props.group.name}`} /><br /></> : <></>}
                <div style={titleDescriptionContainerStyle}>
                    <input
                        style={titleInputStyle}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="title"
                    /><br />
                    <textarea
                        style={descriptionInputStyle}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="description"
                    />
                </div>
                <div style={buttonsContainerStyle}>
                    <AccentButton text='Cancel' type="dark" onClick={updatePopUp.bind(this, <></>)} />
                    <AccentButton text='Save' type="dark" onClick={addTask} />
                </div>
            </div>
        </div>
    );
}