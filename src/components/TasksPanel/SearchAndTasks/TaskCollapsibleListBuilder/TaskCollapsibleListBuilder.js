import React, { useEffect, useState } from "react";
import TaskListTile from './components/TaskListTile';
import GroupListTile from "./components/GroupListTile";
import { useGroups, useGroupsUpdate, useTasks, useTasksUpdate } from "../../../../data/DataProvider";

export default function TaskCollapsibleListBuilder(props) {
    const tasks = useTasks();
    const groups = useGroups();

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