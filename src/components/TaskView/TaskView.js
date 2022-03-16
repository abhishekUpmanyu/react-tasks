import React from "react";
import Title from "typography/Title";
import BodyText from "typography/BodyText";

export class TaskView extends React.PureComponent {
    taskViewStyle = {
        flex: 8,
        padding: '64px 32px',
    };

    render() {
        return (
            <div style={this.taskViewStyle}>
                <Title text={this.props.selected ? this.props.selected.title : 'No Task Selected'} />
                <br />
                <BodyText text={this.props.selected ? this.props.selected.description : ''} />
            </div>
        );
    }
}