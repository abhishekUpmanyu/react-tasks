import React from "react";
import SearchBox from "./SearchBox";
import TaskCollapsibleListBuilder from "./TaskCollapsibleListBuilder/TaskCollapsibleListBuilder";

export default function SearchAndTasks(props) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        rowGap: '16px',
        margin: '32px 0px'
    };

    return (
        <div style={style}>
            <SearchBox />
            <TaskCollapsibleListBuilder onChangeSelection={props.onChangeSelection} />
        </div>
    );
}