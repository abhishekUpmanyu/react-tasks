import React from "react";
import TaskListTile from './TaskListTile';
import GroupListTile from "./GroupListTile";
import { useData } from "../../../../data/DataProvider";

export default function TaskCollapsibleListBuilder(props) {
    const data = useData();

    return (
        <div>
            {
                Object.keys(data).map(
                    key => (data[key].hasOwnProperty('title')) ?
                        <TaskListTile key={data[key].uuid} task={data[key]} onClick={props.onChangeSelection} /> :
                        <GroupListTile key={data[key].uuid} groupId={key} onClick={props.onChangeSelection} />
                )
            }
        </div>
    );
}