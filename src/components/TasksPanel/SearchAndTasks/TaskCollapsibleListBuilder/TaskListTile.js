import React, { useState } from "react";
import H3 from "../../../../typography/H3";

export default function TaskListTile(props) {
    const [hover, setHover] = useState(false);
    var opacity, hoverOpacity;

    if (props.isInGroup) {
        opacity = 'rgba(0, 0, 0, 0)';
        hoverOpacity = 'rgba(0, 0, 0, 0.05)';
    } else {
        opacity = 'rgba(0, 0, 0, 0.05)';
        hoverOpacity = 'rgba(0, 0, 0, 0.1)';
    }

    const style = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '8px',
        backgroundColor: hover ? hoverOpacity : opacity,
        margin: '4px 0px',
        padding: '8px 16px',
    };

    const checkboxStyle = {
        borderRadius: '16px',
        color: 'rgba(255, 255, 255, 0.3)'
    }

    console.log('isdone?', props.task.done);

    return (
        <div
            style={style}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
            onClick={props.onClick.bind(this, props.task)}
        >
            {
                props.task.done ? <strike style={{color: '#ffffff'}}><H3 text={props.task.title} /></strike> : <H3 text={props.task.title} />
            }
            <input
                style={checkboxStyle}
                type="checkbox"
                checked={props.task.done}
                onChange={props.taskDone}
            />
        </div>
    );
}