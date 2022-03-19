import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GroupsContext = React.createContext();
const GroupsUpdateContext = React.createContext();

const TasksContext = React.createContext();
const TasksUpdateContext = React.createContext();

export const useGroups = () => useContext(GroupsContext);
export const useGroupsUpdate = () => useContext(GroupsUpdateContext);

export const useTasks = () => useContext(TasksContext);
export const useTasksUpdate = () => useContext(TasksUpdateContext);

export default function DataProvider({children}) {
    const [tasks, setTasks] = useLocalStorage('tasks', {});
    const [groups, setGroups] = useLocalStorage('groups', {});

    return (
                <GroupsContext.Provider value={groups}>
                    <GroupsUpdateContext.Provider value={setGroups}>
                        <TasksContext.Provider value={tasks}>
                            <TasksUpdateContext.Provider value={setTasks}>
                                {children}
                            </TasksUpdateContext.Provider>
                        </TasksContext.Provider>
                    </GroupsUpdateContext.Provider>
                </GroupsContext.Provider>
    );
}