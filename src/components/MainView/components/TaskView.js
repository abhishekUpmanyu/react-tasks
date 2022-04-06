import { updateTaskDescription, updateTaskTitle } from "features/data";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BodyTextInputArea from "typography/BodyTextInputArea";
import TitleInput from "typography/TitleInput";

export default function TaskView({ taskId }) {
    const task = useSelector(state => state.data.tasks[taskId]);
    const dispatch = useDispatch();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    };

    return (
        <div style={containerStyle}>
            <TitleInput
                value={task.title}
                onChange={
                    e => dispatch(updateTaskTitle({
                        id: task.uuid,
                        title: e.target.value,
                    }))
                }
            />
            <br /><br />
            <BodyTextInputArea
                value={task.description}
                onChange={
                    e => dispatch(updateTaskDescription({
                        id: task.uuid,
                        description: e.target.value,
                    }))
                }
            />
        </div>
    );
}