import React from "react";
import TaskListTile from './TaskListTile';
import GroupListTile from "./GroupListTile";
import { useGroups, useTasks } from "../../../../data/DataProvider";

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
            {/* {
                Object.keys(data).map(
                    key => (data[key].hasOwnProperty('title')) ?
                        <TaskListTile
                            key={data[key].uuid}
                            task={data[key]}
                            onClick={props.onChangeSelection}
                            taskDone={taskDone.bind(this, key)}
                        /> :
                        <GroupListTile key={data[key].uuid} groupId={key} onClick={props.onChangeSelection} />
                )
            } */}
        </div>
    );
}