import React, { useState } from "react";
import H2 from "typography/H2";
import H3 from "typography/H3";

export default function TaskBigTile(props) {
    const [hover, setHover] = useState(false);

    const style = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '8px',
        backgroundColor: hover ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        margin: '16px 32px',
        padding: '16px 32px',
    };

    return (
        <div
            style={style}
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
        >
            <H3 text={props.task.title} />
        </div>
    );
}