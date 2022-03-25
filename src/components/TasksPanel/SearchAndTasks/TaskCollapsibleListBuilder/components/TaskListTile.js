import TaskView from "components/MainView/components/TaskView";
import { useMainViewUpdate } from "components/MainView/MainViewProvider";
import { useGroups, useGroupsUpdate, useTasks, useTasksUpdate } from "data/DataProvider";
import React, { useState } from "react";
import H3 from "typography/H3";
import bin from 'assets/icons/bin.png';
import SmallIconButton from "./SmallIconButton";

export default function TaskListTile({ taskId, groupId, taskDone }) {
    const [hover, setHover] = useState(false);

    const tasks = useTasks();
    const tasksUpdate = useTasksUpdate();

    const [isDone, setIsDone] = useState(tasks[taskId].done);

    const mainViewUpdate = useMainViewUpdate();

    const task = tasks[taskId];

    var opacity, hoverOpacity;

    if (groupId) {
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

    const trailingActionsStyle = {
        alignItems: 'center',
        columnGap: '8px',
        display: 'flex',
        flexDirection: 'row',
    };

    const checkboxStyle = {
        borderRadius: '16px',
        color: 'rgba(255, 255, 255, 0.3)'
    }

    const toggleDone = () => {
        task.done = !task.done;
        setIsDone(task.done);
        tasksUpdate.addTask(task);
        if (taskDone) taskDone();
    };

    const onDelete = (e) => {
        e.stopPropagation();
        tasksUpdate.deleteTask(task.uuid);
        mainViewUpdate(<></>)
    }

    return (
        <div
            style={style}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
            onClick={
                mainViewUpdate.bind(
                    this,
                    <TaskView
                        key={task.uuid}
                        title={task.title}
                        description={task.description}
                        onUnmount={function (title, description) {
                            if (title !== task.title || description !== task.description) {
                                task.title = title;
                                task.description = description;
                                tasksUpdate.addTask(task);
                            }
                        }}
                    />
                )
            }
        >
            {
                isDone ? <strike style={{ color: '#ffffff' }}><H3 text={task.title} /></strike> : <H3 text={task.title} />
            }
            <div style={trailingActionsStyle}>
                <input
                    style={checkboxStyle}
                    type="checkbox"
                    checked={task.done}
                    onChange={toggleDone}
                    onClick={e => e.stopPropagation()}
                />
                <SmallIconButton
                    icon={bin}
                    onClick={onDelete}
                />
            </div>
        </div>
    );
}