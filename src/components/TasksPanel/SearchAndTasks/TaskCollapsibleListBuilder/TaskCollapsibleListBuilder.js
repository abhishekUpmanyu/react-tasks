import React, { useEffect, useState } from "react";
import TaskListTile from './components/TaskListTile';
import GroupListTile from "./components/GroupListTile";
import { useGroups, useGroupsUpdate, useTasks, useTasksUpdate } from "../../../../data/DataProvider";

export default function TaskCollapsibleListBuilder(props) {
    const tasks = useTasks();
    const tasksUpdate = useTasksUpdate();
    const groups = useGroups();
    const groupsUpdate = useGroupsUpdate();

    const [displayTasks, setDisplayTasks] = useState(tasks);
    const [displayGroups, useDisplayGroups] = useState(groups);

    useEffect(() => {
        tasksUpdate(displayTasks);
    }, [displayTasks]);

    const deleteTask = (taskId) => {
        var groupId = tasks[taskId].group
        if (groupId) {
            var index = groups[groupId].tasks.indexOf(taskId);
            groups[groupId].tasks.splice(index, 1);
        }
        delete tasks[taskId];
        tasksUpdate(tasks);
        groupsUpdate(groups);
    };

    return (
        <div>
            {
                Object.keys(groups).map(
                    key => <GroupListTile
                        key={key}
                        groupId={key}
                        onClick={props.onChangeSelection}
                    />
                )
            }
            {
                Object.keys(tasks).map(
                    key => (!tasks[key]['group']) ? <TaskListTile
                        key={key}
                        taskId={key}
                        onClick={props.onChangeSelection}
                    /> : <></>
                )
            }
        </div>
    );
}