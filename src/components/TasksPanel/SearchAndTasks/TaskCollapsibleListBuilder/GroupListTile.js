import React, { useState } from "react";
import H3 from "typography/H3";
import arrowhead from 'assets/icons/arrowhead.png';
import plus from 'assets/icons/plus.png';
import { useTheme } from "../../../../theme/ThemeProvider";
import TaskListTile from "./TaskListTile";
import { usePopUpUpdate } from "../../../../pop-ups/PopUpProvider";
import TaskPopUp from "../../../PopUps/TaskPopUp";
import { useGroups, useGroupsUpdate, useTasks, useTasksUpdate } from "../../../../data/DataProvider";
import { useMainViewUpdate } from "components/MainView/MainViewProvider";
import GroupView from "components/MainView/components/GroupView";

export default function GroupListTile(props) {
    const [collapsed, setCollapsed] = useState(true);
    const [hover, setHover] = useState(false);

    const tasks = useTasks();
    const tasksUpdate = useTasksUpdate();

    const groups = useGroups();
    const groupsUpdate = useGroupsUpdate();

    const mainViewUpdate = useMainViewUpdate();

    const group = groups[props.groupId];

    const [notDoneCount, setNotDoneCount] = useState(function() {
        var count = 0;
        for (let taskKey of group.tasks) {
            if (!tasks[taskKey].done) {
                count += 1;
            }
        }
        return count;
    });

    const updatePopUp = usePopUpUpdate();

    const darkMode = useTheme();

    const style = {
        borderRadius: '8px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        margin: '4px 0px',
    };

    const groupTileStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: '8px',
        borderRadius: '8px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        padding: '8px 16px',
    };

    const arrowNameRowStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: '8px',
    };

    const groupRowStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    };

    const arrowStyle = {
        transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
        filter: darkMode ? 'invert() opacity(70%)' : ''
    };

    const taskDone = (id) => {
        tasks[id]['done'] = !tasks[id]['done'];
        if (tasks[id]['done']) {
            setNotDoneCount(notDoneCount-1);
        } else {
            setNotDoneCount(notDoneCount+1);
        }
        console.log(notDoneCount);
        tasksUpdate(tasks);
    }

    const updateCount = () => {
        setNotDoneCount(notDoneCount+1);
    }

    return (
        <div style={style}>
            <div
                style={groupTileStyle}
                onClick={
                    mainViewUpdate.bind(
                        this,
                        <GroupView
                            key={group.uuid}
                            name={group.name}
                            tasks={group.tasks}
                            onUnmount={function(name, tasks) {
                                groups[props.groupId].name = name;
                                groups[props.groupId].tasks = tasks;
                                groupsUpdate(groups);
                            }}
                        />
                    )
                }
                onMouseEnter={setHover.bind(this, true)}
                onMouseLeave={setHover.bind(this, false)}
            >
                <div style={groupRowStyle}>
                    <div style={arrowNameRowStyle}>
                        <img
                            src={arrowhead}
                            style={arrowStyle}
                            width={'8px'}
                            onClick={setCollapsed.bind(this, !collapsed)}
                            alt="arrow icon"
                        />
                        {
                            notDoneCount===0 ? <strike style={{color: '#ffffff'}}><H3 text={group.name} /></strike> : <H3 text={group.name} />
                        }
                    </div>
                    <img
                        src={plus}
                        style={arrowStyle}
                        width={'12px'}
                        onClick={updatePopUp.bind(this, <TaskPopUp groupId={props.groupId} groupAction={updateCount} />)}
                        alt="add icon"
                    />
                </div>
            </div>
            {!collapsed ? group.tasks.map(key =>
                <TaskListTile
                    key={key}
                    taskId={key} 
                    isInGroup={true} 
                    onClick={props.onClick}
                    taskDone={taskDone.bind(this, key)}
                />
            ) : null}
        </div>
    );
}