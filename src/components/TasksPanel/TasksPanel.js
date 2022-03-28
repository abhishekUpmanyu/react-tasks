import React from 'react';
import { useTheme, useThemeUpdate } from '../../theme/ThemeProvider';
import H1 from '../../typography/H1';
import { FooterButtons } from './FooterButtons/FooterButtons';
import addIcon from 'assets/icons/add.png';
import darkModeIcon from 'assets/icons/dark-mode.png';
import TaskPopUp from '../PopUps/TaskPopUp';
import { usePopUpUpdate } from '../../pop-ups/PopUpProvider';
import GroupPopUp from '../PopUps/GroupPopUp';
import Search from './Search';
import TaskListBuilder from './TaskListBuilder/TaskListBuilder';

export function TasksPanel(props) {
    const darkMode = useTheme();
    const toggleDarkMode = useThemeUpdate();

    const updatePopUp = usePopUpUpdate();

    const tasksPanelStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 2,
        justifyContent: 'space-between',
        backgroundColor: darkMode ? '#43455c' : '#e4f0eb',
        padding: '24px 24px',
        margin: '16px',
        boxShadow: '2px 0px 16px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
    };

    const titleSearchTasksStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
    };

    const buttons = [
        {
            icon: addIcon,
            text: 'Group',
            onClick: updatePopUp.bind(this, <GroupPopUp />),
        },
        {
            icon: addIcon,
            text: 'Task',
            onClick: updatePopUp.bind(this, <TaskPopUp />),
        },
        {
            icon: darkModeIcon,
            text: '',
            onClick: toggleDarkMode,
        },
    ];

    return (
        <div style={tasksPanelStyle}>
            <div style={titleSearchTasksStyle}>
                <H1 text="tasks" /><br />
                <Search />
                <TaskListBuilder />
            </div>
            <FooterButtons buttons={buttons} />
        </div>
    );
}