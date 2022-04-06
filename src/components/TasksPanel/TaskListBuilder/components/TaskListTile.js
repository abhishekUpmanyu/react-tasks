import TaskView from "components/MainView/components/TaskView";
import { useMainViewUpdate } from "components/MainView/MainViewProvider";
import React, { useState } from "react";
import H3 from "typography/H3";
import bin from 'assets/icons/bin.png';
import SmallIconButton from "components/TasksPanel/components/SmallIconButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleDone } from "features/data";

export default function TaskListTile({ taskId, groupId }) {
    const [hover, setHover] = useState(false);

    const tasks = useSelector(state => state.data.tasks);
    const dispatch = useDispatch();

    const task = tasks[taskId];

    const mainViewUpdate = useMainViewUpdate();

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

    // const toggleDone = () => {
    //     task.done = !task.done;
    //     tasksUpdate.addTask(task);
    //     if (taskDone) taskDone();
    // };

    const onDelete = (e) => {
        e.stopPropagation();
        dispatch(deleteTask(taskId));
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
                        taskId={task.uuid}
                    />
                )
            }
        >
            {
                task.done ? <strike style={{ color: '#ffffff' }}><H3 text={task.title} /></strike> : <H3 text={task.title} />
            }
            <div style={trailingActionsStyle}>
                <input
                    style={checkboxStyle}
                    type="checkbox"
                    checked={task.done}
                    onChange={() => dispatch(toggleDone(task.uuid))}
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