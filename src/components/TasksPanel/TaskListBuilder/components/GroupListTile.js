import React, { useState } from "react";
import H3 from "typography/H3";
import arrowhead from 'assets/icons/arrowhead.png';
import plus from 'assets/icons/plus.png';
import { useTheme } from "theme/ThemeProvider";
import TaskListTile from "./TaskListTile";
import { usePopUpUpdate } from "pop-ups/PopUpProvider";
import TaskPopUp from "components/PopUps/TaskPopUp";
import { useMainViewUpdate } from "components/MainView/MainViewProvider";
import GroupView from "components/MainView/components/GroupView";
import SmallIconButton from "components/TasksPanel/components/SmallIconButton";
import { useSelector } from "react-redux";

export default function GroupListTile({ groupId, onClick }) {
    const [collapsed, setCollapsed] = useState(true);
    const [hover, setHover] = useState(false);

    const tasks = useSelector(state => state.data.tasks);
    const groups = useSelector(state => state.data.groups);

    const group = groups[groupId];

    const mainViewUpdate = useMainViewUpdate();

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

    return (
        <div style={style}>
            <div
                style={groupTileStyle}
                onClick={
                    mainViewUpdate.bind(
                        this,
                        <GroupView
                            key={group.uuid}
                            groupId={group.uuid}
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
                            group.tasksDone===group.tasks.length ? <strike style={{color: '#ffffff'}}><H3 text={group.name} /></strike> : <H3 text={group.name} />
                        }
                    </div>
                    <SmallIconButton
                        icon={plus}
                        onClick={updatePopUp.bind(this, <TaskPopUp groupId={groupId} />)}
                    />
                </div>
            </div>
            {!collapsed ? group.tasks.map(key =>
                <TaskListTile
                    key={key}
                    taskId={key} 
                    groupId={groupId} 
                    onClick={onClick}
                />
            ) : null}
        </div>
    );
}