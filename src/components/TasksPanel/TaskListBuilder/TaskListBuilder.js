import React from "react";
import TaskListTile from './components/TaskListTile';
import GroupListTile from "./components/GroupListTile";
import { useSelector } from "react-redux";

export default function TaskListBuilder(props) {
    const {query} = useSelector(state => state.search);
    const tasks = useSelector(state => state.data.tasks);
    const groups = useSelector(state => state.data.groups);

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
                    key => (!tasks[key]['group'] || query!=='') ? <TaskListTile
                        key={key}
                        taskId={key}
                        onClick={props.onChangeSelection}
                    /> : <></>
                )
            }
        </div>
    );
}