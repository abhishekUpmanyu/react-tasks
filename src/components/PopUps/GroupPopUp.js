import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import AccentButton from "components/AccentButton";
import { usePopUpUpdate } from "../../pop-ups/PopUpProvider";
import { useGroups, useGroupsUpdate, useTasks, useTasksUpdate } from "../../data/DataProvider";
import { v4 as uuid } from 'uuid';

export default function GroupPopUp({ group }) {
    const [name, setName] = useState('');

    const darkMode = useTheme();
    
    const updatePopUp = usePopUpUpdate();

    const tasks = useTasks();
    const tasksUpdate = useTasksUpdate();

    const groups = useGroups();
    const groupsUpdate = useGroupsUpdate();


    const grouplessTasks = function () {
        var obj = {};
        for (let key in tasks) {
            if (!tasks[key]['group']) {
                obj[key] = false;
            }
        }
        return obj;
    }();

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

    const nameContainerStyle = {
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
        var selectedTasks = [];
        var tasksDone = 0;
        for (let key in grouplessTasks) {
            if (grouplessTasks[key]) {
                selectedTasks.push(key);
                tasks[key]['group'] = id;
                if (tasks[key]['group'].done) tasksDone += 1;
            }
        }
        var group = {
            uuid: id,
            name: name,
            tasks: selectedTasks,
            tasksDone: tasksDone,
        };
        groups[id] = group;
        groupsUpdate(groups);
        tasksUpdate.updateAtOnce(tasks);
        updatePopUp(<></>);
    }

    return (
        <div style={backgroundStyle}>
            <div style={popUpStyle}>
                <div style={nameContainerStyle}>
                    < input
                        style={titleInputStyle}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="name"
                    /><br />
                    {
                        Object.keys(grouplessTasks).map(key =>
                            <span>
                                <input
                                    style={{ margin: '12px' }}
                                    value={grouplessTasks[key]} id={key}
                                    onChange={e => grouplessTasks[e.target.id] = !grouplessTasks[e.target.id]}
                                    type="checkbox"
                                />{tasks[key].title}
                            </span>
                        )
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