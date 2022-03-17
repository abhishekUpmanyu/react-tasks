import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import AccentButton from "components/AccentButton";
import { usePopUpUpdate } from "../../pop-ups/PopUpProvider";
import { useData, useDataUpdate } from "../../data/DataProvider";
import { v4 as uuid } from 'uuid';

export default function GroupPopUp(props) {
    const [name, setName] = useState('');

    const darkMode = useTheme();
    const data = useData();
    const updateData = useDataUpdate();
    const updatePopUp = usePopUpUpdate();


    const [tasks, setTasks] = useState(
        function () {
            var obj = {};
            for (let key in data) {
                if (data[key].hasOwnProperty('title')) {
                    obj[key] = false;
                }
            }
            return obj;
        }
    );

    console.log(tasks);

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

    const buttonsContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        columnGap: '4px',
    };

    const createGroup = () => {
        var id = uuid();
        var selectedTasks = {};
        for (let key in tasks) {
            if (tasks[key]) {
                selectedTasks[key] = data[key];
                delete data[key];
            }
        }
        var group = {
            uuid: id,
            name: name,
            tasks: selectedTasks,
        };
        data[id] = group;
        updateData(data);
        updatePopUp(<></>);
    }

    function filterObject(obj, callback) {
        return Object.fromEntries(Object.entries(obj).
            filter(([key, val]) => callback(val, key)));
    }

    return (
        <div style={backgroundStyle}>
            <div style={popUpStyle}>
                {props.group ? props.group.name : <></>}
                <div style={titleDescriptionContainerStyle}>
                    < input
                        style={titleInputStyle}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="title"
                    /><br />
                    {
                        Object.keys(tasks).map(key => {
                            if (data[key].hasOwnProperty('title')) {
                                return <span>
                                    <input
                                        style={{ margin: '12px' }}
                                        value={tasks[key]} id={key}
                                        onChange={e => { tasks[e.target.id] = !tasks[e.target.id]; console.log(tasks) }}
                                        type="checkbox"
                                    />{data[key].title}
                                </span>;
                            } else {
                                return <></>;
                            }
                        })
                    }
                </div>
                <div style={buttonsContainerStyle}>
                    <AccentButton text='Cancel' type="dark" onClick={updatePopUp.bind(this, <></>)} />
                    <AccentButton text='Create' type="dark" onClick={createGroup} />
                </div>
            </div>
        </div>
    );
}