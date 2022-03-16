import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TasksDataContext = React.createContext();
const TasksDataUpdateContext = React.createContext();

export const useTasksData = () => useContext(TasksDataContext);
export const useTasksDataUpdate = () => useContext(TasksDataUpdateContext);

export default function DataProvider({children}) {
    const [tasksData, setTasksData] = useLocalStorage('tasksData', []);

    return (
        <TasksDataContext.Provider value={tasksData}>
            <TasksDataUpdateContext.Provider value={setTasksData}>
                {children}
            </TasksDataUpdateContext.Provider>
        </TasksDataContext.Provider>
    );
}