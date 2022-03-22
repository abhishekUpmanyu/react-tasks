import { useTasks, useTasksUpdate } from "data/DataProvider";
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
        justifyContent: 'space-between',
        borderRadius: '8px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        margin: '16px 32px',
        padding: '16px 32px',
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
                        tasks[task.uuid]['title'] = title;
                        tasks[task.uuid]['description'] = description;
                        tasksUpdate(tasks);
                    }}
                />
            )}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
        >
            <H3 text={task.title} />
        </div>
    );
}