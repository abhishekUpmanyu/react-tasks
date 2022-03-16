import React, { useContext, useState } from 'react';

const TaskPopUpContext = React.createContext();
const TaskPopUpVisibilityContext = React.createContext();

const GroupPopUpContext = React.createContext();
const GroupPopUpVisibilityContext = React.createContext();

export const useTaskPopUp = () => useContext(TaskPopUpContext);
export const useTaskPopUpVisibility = () => useContext(TaskPopUpVisibilityContext);

export const useGroupPopUp = () => useContext(GroupPopUpContext);
export const useGroupPopUpVisibility = () => useContext(GroupPopUpVisibilityContext);

export default function PopUpProvider({ children }) {
    const [showTaskPopUp, setShowTaskPopUp] = useState(false);
    const [showGroupPopUp, setShowGroupPopUp] = useState(false);

    const toggleTaskPopUpVisibility = () =>
        setShowTaskPopUp(show => !show);

    const toggleGroupPopUpVisibility = () =>
        setShowGroupPopUp(show => !show);

    return (
        <TaskPopUpContext.Provider value={showTaskPopUp}>
            <GroupPopUpContext.Provider value={showGroupPopUp}>
                <TaskPopUpVisibilityContext.Provider value={toggleTaskPopUpVisibility}>
                    <GroupPopUpVisibilityContext.Provider value={toggleGroupPopUpVisibility}>
                        {children}
                    </GroupPopUpVisibilityContext.Provider>
                </TaskPopUpVisibilityContext.Provider>
            </GroupPopUpContext.Provider>
        </TaskPopUpContext.Provider>
    );
}