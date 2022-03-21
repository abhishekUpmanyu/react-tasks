import { useTasks, useTasksUpdate } from "data/DataProvider";
import React, { useState } from "react";
import H3 from "../../../../typography/H3";

export default function TaskListTile({ taskId, isInGroup, onClick, taskDone }) {
    const [hover, setHover] = useState(false);

    const tasks = useTasks();
    const tasksUpdate  = useTasksUpdate();

    const task = tasks[taskId];

    var opacity, hoverOpacity;

    if (isInGroup) {
        opacity = 'rgba(0, 0, 0, 0)';
        hoverOpacity = 'rgba(0, 0, 0, 0.05)';
    } else {
        opacity = 'rgba(0, 0, 0, 0.05)';
        hoverOpacity = 'rgba(0, 0, 0, 0.1)';
    }

    const style = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '8px',
        backgroundColor: hover ? hoverOpacity : opacity,
        margin: '8px 0px',
        padding: '8px 16px',
    };

    const checkboxStyle = {
        borderRadius: '16px',
        color: 'rgba(255, 255, 255, 0.3)'
    }

    const toggleDone = () => {
        tasks[taskId].done = !tasks[taskId].done;
        tasksUpdate(tasks);
    };

    console.log('isdone?', task.done);

    return (
        <div
            style={style}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
            onClick={onClick.bind(this, task)}
        >
            {
                task.done ? <strike style={{color: '#ffffff'}}><H3 text={task.title} /></strike> : <H3 text={task.title} />
            }
            <input
                style={checkboxStyle}
                type="checkbox"
                checked={task.done}
                onChange={isInGroup ? taskDone : toggleDone}
            />
        </div>
    );
}