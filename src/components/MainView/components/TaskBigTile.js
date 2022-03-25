import { useGroups, useGroupsUpdate, useTasks, useTasksUpdate } from "data/DataProvider";
import React, { useState } from "react";
import H3 from "typography/H3";
import { useMainViewUpdate } from "../MainViewProvider";
import TaskView from "./TaskView";

export default function TaskBigTile({ taskId }) {
    const [hover, setHover] = useState(false);

    const tasks = useTasks();
    const tasksUpdate = useTasksUpdate();

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

    const toggleDone = () => {
        task.done = !task.done;
        tasksUpdate.addTask(task);
    };

    return (
        <div
            style={style}
            onClick={mainViewUpdate.bind(
                this,
                <TaskView
                    key={task.uuid}
                    title={task.title}
                    description={task.description}
                    onUnmount={function(title, description) {
                        task.title = title;
                        task.description = description;
                        tasksUpdate.addTask(task);
                    }}
                />
            )}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
        >
            <input
                    style={checkboxStyle}
                    type="checkbox"
                    checked={task.done}
                    onChange={toggleDone}
                    onClick={e => e.stopPropagation()}
            />
            {task.done ? 
                <strike style={{color: '#ffffff'}}><H3 text={task.title} /></strike> : 
                <H3 text={task.title} />
            }
        </div>
    );
}