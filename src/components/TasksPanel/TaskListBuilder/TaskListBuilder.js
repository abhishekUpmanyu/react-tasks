import React from "react";
import TaskListTile from './components/TaskListTile';
import GroupListTile from "./components/GroupListTile";
import { useGroups, useTasks } from "data/DataProvider";
import { useSelector } from "react-redux";

export default function TaskListBuilder(props) {
    // const tasks = useTasks();
    const state = useSelector(state => state.search.value);
    const groups = state.groups;
    const tasks = state.tasks;

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
                    key => (!tasks[key]['group'] || state.query!=='') ? <TaskListTile
                        key={key}
                        taskId={key}
                        onClick={props.onChangeSelection}
                    /> : <></>
                )
            }
        </div>
    );
}