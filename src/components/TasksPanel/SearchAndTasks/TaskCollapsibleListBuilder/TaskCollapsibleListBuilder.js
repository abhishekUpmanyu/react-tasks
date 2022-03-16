import React from "react";
import TaskListTile from './TaskListTile';
import { useLocalStorage } from "hooks/useLocalStorage";
import Task from "models/taskModel";
import GroupListTile from "./GroupListTile";
import Group from 'models/groupModel';

export default function TaskCollapsibleListBuilder(props) {
    // const allTasks = useLocalStorage('tasks', {});

    const allData = [
        new Task('My Task', 'This is a sample description for my task', '#ffffff', false),
        new Group('hi')
    ];

    allData[1].addTask(new Task('My New Task', 'This is a sample description for my task', '#ffffff', false));

    return (
        <div>
            {
                allData.map(
                    data => (data instanceof Task) ?
                        <TaskListTile key={data.uuid} task={data} onClick={props.onChangeSelection} /> :
                        <GroupListTile key={data.uuid} group={data} onClick={props.onChangeSelection} />
                )
            }
        </div>
    );
}