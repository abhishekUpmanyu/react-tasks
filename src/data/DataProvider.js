import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import cloneDeep from "lodash/cloneDeep";

export const GroupsContext = React.createContext();
export const GroupsUpdateContext = React.createContext();

export const TasksContext = React.createContext();
export const TasksUpdateContext = React.createContext();

export const useGroups = () => useContext(GroupsContext);
export const useGroupsUpdate = () => useContext(GroupsUpdateContext);

export const useTasks = () => useContext(TasksContext);
export const useTasksUpdate = () => useContext(TasksUpdateContext);

export default function DataProvider({ children }) {
    const [tasks, setTasks] = useLocalStorage('tasks', {});
    const [groups, setGroups] = useLocalStorage('groups', {});

    const updateTask = {
        addTask: (task, addToGroup = false) => {
            tasks[task.uuid] = task;
            if (task.group && addToGroup) {
                groups[task.group].tasks.push(task.uuid);
                setGroups(groups)
            }
            console.log('tasks updated');
            console.log(tasks);
            setTasks(cloneDeep(tasks));
        },
        deleteTask: (taskId) => {
            var groupId = tasks[taskId].group;
            delete tasks[taskId];
            if (groupId) {
                var index = groups[groupId].tasks.indexOf(taskId);
                groups[groupId].tasks.splice(index, 1);
            }
            setTasks(cloneDeep(tasks));
            updateGroups(groups)
        },
        updateAtOnce: (tasks) => {
            setTasks(cloneDeep(tasks));
        }
    };

    const updateGroups = (groups) => {
        setGroups(cloneDeep(groups));
    }

    return (
        <GroupsContext.Provider value={groups}>
            <GroupsUpdateContext.Provider value={updateGroups}>
                <TasksContext.Provider value={tasks}>
                    <TasksUpdateContext.Provider value={updateTask}>
                        {children}
                    </TasksUpdateContext.Provider>
                </TasksContext.Provider>
            </GroupsUpdateContext.Provider>
        </GroupsContext.Provider>
    );
}