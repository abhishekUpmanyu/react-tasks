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
        borderRadius: '8px',
        backgroundColor: hover ? hoverOpacity : opacity,
        margin: '4px 0px',
        padding: '8px 16px',
    };

    return (
        <div
            style={style}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
            onClick={props.onClick.bind(this, props.task)}
        >
            <H3 text={props.task.title} />
        </div>
    );
}