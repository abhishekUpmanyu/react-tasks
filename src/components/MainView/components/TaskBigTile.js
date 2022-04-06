import { toggleDone } from "features/data";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import H3 from "typography/H3";
import { useMainViewUpdate } from "../MainViewProvider";
import TaskView from "./TaskView";

export default function TaskBigTile({ taskId }) {
    const [hover, setHover] = useState(false);

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.data.tasks);
    const task = tasks[taskId];

    const mainViewUpdate = useMainViewUpdate();

    const style = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: '8px',
        borderRadius: '8px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        margin: '16px 16px',
        padding: '16px 32px',
    };

    const checkboxStyle = {
        borderRadius: '16px',
        color: 'rgba(255, 255, 255, 0.3)'
    }

    return (
        <div
            style={style}
            onClick={mainViewUpdate.bind(
                this,
                <TaskView
                    key={task.uuid}
                    taskId={task.uuid}
                />
            )}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
        >
            <input
                    style={checkboxStyle}
                    type="checkbox"
                    checked={task.done}
                    onChange={e => dispatch(toggleDone(task.uuid))}
                    onClick={e => e.stopPropagation()}
            />
            {task.done ? 
                <strike style={{color: '#ffffff'}}><H3 text={task.title} /></strike> : 
                <H3 text={task.title} />
            }
        </div>
    );
}