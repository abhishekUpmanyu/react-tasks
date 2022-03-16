import React, { useState } from 'react';
import { useTheme, useThemeUpdate } from '../../theme/ThemeProvider';
import H1 from '../../typography/H1';
import { FooterButtons } from './FooterButtons/FooterButtons';
import SearchAndTasks from './SearchAndTasks/SearchAndTasks';
import SearchBox from './SearchAndTasks/SearchBox';
import TaskCollapsibleListBuilder from './SearchAndTasks/TaskCollapsibleListBuilder/TaskCollapsibleListBuilder';
import addIcon from 'assets/icons/add.png';
import darkModeIcon from 'assets/icons/dark-mode.png';
import TaskPopUp from '../PopUps/TaskPopUp';
import { useTaskPopUpVisibility } from '../../pop-ups/PopUpProvider';

export function TasksPanel(props) {
    const darkMode = useTheme();
    const toggleDarkMode = useThemeUpdate();

    const toggleTasksPopUp = useTaskPopUpVisibility();

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
    };

    const buttons = [
        {
            icon: addIcon,
            text: 'Group',
            onClick: toggleDarkMode,
        },
        {
            icon: addIcon,
            text: 'Task',
            onClick: toggleTasksPopUp,
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
                <H1 text="Tasks" />
                <SearchAndTasks onChangeSelection={props.onChangeSelection} />
            </div>
            <FooterButtons buttons={buttons} />
        </div>
    );
}