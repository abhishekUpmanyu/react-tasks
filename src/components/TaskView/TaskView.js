import React from "react";
import Title from "typography/Title";
import BodyText from "typography/BodyText";
import H2 from "typography/H2";
import H1 from "typography/H1";
import H3 from "typography/H3";
import { TasksContext } from "data/DataProvider";
import TaskBigTile from "./TaskBigTile";

export class TaskView extends React.PureComponent {
    taskViewStyle = {
        flex: 8,
        padding: '64px 32px',
    };

    render() {
        return (
            <div style={this.taskViewStyle}>
                {
                    this.props.selected ?
                        <>
                            <Title text={this.props.selected.title || this.props.selected.name} />
                            <br />
                            {
                                this.props.selected.title ? 
                                <H3 text={this.props.selected.description} /> :
                                <>
                                    <H2 text="tasks" />
                                    <br />
                                    <TasksContext.Consumer>
                                    {tasks => this.props.selected.tasks.map(taskId => 
                                        <TaskBigTile task={tasks[taskId]} />
                                    )}
                                    </TasksContext.Consumer>
                                </>
                            }
                        </> :
                        <H1 text="no task selected" />
                }
            </div>
        );
    }
}