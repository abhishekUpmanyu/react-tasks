import React, { useState } from "react";
import H3 from "typography/H3";
import arrowhead from 'assets/icons/arrowhead.png';
import { useTheme } from "../../../../theme/ThemeProvider";
import TaskListTile from "./TaskListTile";

export default function GroupListTile(props) {
    const [collapsed, setCollapsed] = useState(true);
    const [hover, setHover] = useState(false);
    const darkMode = useTheme();

    const style = {
        borderRadius: '8px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        margin: '4px 0px',
    };

    const groupTileStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: '8px',
        borderRadius: '8px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        padding: '8px 16px',
    };

    const arrowStyle = {
        transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
        filter: darkMode ? 'invert() opacity(70%)' : ''
    };

    return (
        <div style={style}>
            <div
                style={groupTileStyle}
                onClick={setCollapsed.bind(this, !collapsed)}
                onMouseEnter={setHover.bind(this, true)}
                onMouseLeave={setHover.bind(this, false)}
            >
                <img src={arrowhead} style={arrowStyle} width={'8px'} alt="arrow icon" /> <H3 text={props.group?.name} />
            </div>
            {!collapsed ? props.group.tasks.map(task =>
                <TaskListTile key={task.uuid} task={task} isInGroup={true} onClick={props.onClick} />
            ) : null}
        </div>
    );
}