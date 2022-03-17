import React, { useContext, useState } from 'react';

const TaskPopUpContext = React.createContext();
const TaskPopUpVisibilityContext = React.createContext();

const GroupPopUpContext = React.createContext();
const GroupPopUpVisibilityContext = React.createContext();

const PopUpContext = React.createContext();
const PopUpUpdateContext = React.createContext();

export const useTaskPopUp = () => useContext(TaskPopUpContext);
export const useTaskPopUpVisibility = () => useContext(TaskPopUpVisibilityContext);

export const useGroupPopUp = () => useContext(GroupPopUpContext);
export const useGroupPopUpVisibility = () => useContext(GroupPopUpVisibilityContext);

export const usePopUp = () => useContext(PopUpContext);
export const usePopUpUpdate = () => useContext(PopUpUpdateContext);

export default function PopUpProvider({ children }) {
    const [showTaskPopUp, setShowTaskPopUp] = useState(false);
    const [showGroupPopUp, setShowGroupPopUp] = useState(false);
    const [popUp, setPopUp] = useState(<></>);

    const toggleTaskPopUpVisibility = ({ group }) => {
        setShowTaskPopUp(show => !show);
    }

    const toggleGroupPopUpVisibility = () =>
        setShowGroupPopUp(show => !show);

    return (
        <TaskPopUpContext.Provider value={showTaskPopUp}>
            <GroupPopUpContext.Provider value={showGroupPopUp}>
                <TaskPopUpVisibilityContext.Provider value={toggleTaskPopUpVisibility}>
                    <GroupPopUpVisibilityContext.Provider value={toggleGroupPopUpVisibility}>
                        <PopUpContext.Provider value={popUp}>
                            <PopUpUpdateContext.Provider value={setPopUp}>
                                {children}
                            </PopUpUpdateContext.Provider>
                        </PopUpContext.Provider>
                    </GroupPopUpVisibilityContext.Provider>
                </TaskPopUpVisibilityContext.Provider>
            </GroupPopUpContext.Provider>
        </TaskPopUpContext.Provider>
    );
}