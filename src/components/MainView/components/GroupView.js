import { updateGroupName } from "features/data";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import H2 from "typography/H2";
import TitleInput from "typography/TitleInput";
import TaskBigTile from "./TaskBigTile";

export default function GroupView({ groupId }) {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.data.tasks);
    const groups = useSelector(state => state.data.groups);

    const group = groups[groupId];

    return (
        <>
            <TitleInput
                value={group.name}
                onChange={e => dispatch(updateGroupName({
                    id: groupId,
                    name: e.target.value,
                }))}
            />
            <br /><br />
            <H2 text={`tasks (${group.tasksDone}/${group.tasks.length})`} />
            {
                group.tasks.map(
                    taskId => {
                        if (!tasks[taskId].done)
                            return <TaskBigTile key={taskId} taskId={taskId} />
                        else return <></>
                    }
                )
            }
            <hr style={{ borderTop: '1px solid' }} />
            {
                group.tasks.map(
                    taskId => {
                        if (tasks[taskId].done)
                            return <TaskBigTile key={taskId} taskId={taskId} />
                        else return <></>
                    }
                )
            }
        </>
    );
}