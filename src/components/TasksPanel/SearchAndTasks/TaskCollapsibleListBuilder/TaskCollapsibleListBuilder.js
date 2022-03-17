import React from "react";
import TaskListTile from './TaskListTile';
import GroupListTile from "./GroupListTile";
import { useData, useDataUpdate } from "../../../../data/DataProvider";

export default function TaskCollapsibleListBuilder(props) {
    const data = useData();
    const updateData = useDataUpdate();

    function taskDone(id) {
        data[id]['done'] = !data[id]['done'];
        updateData(data);
    }

    return (
        <div>
            {
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
            }
        </div>
    );
}