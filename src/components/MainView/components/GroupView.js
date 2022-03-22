import { GroupsContext, TasksContext } from "data/DataProvider";
import React from "react";
import H2 from "typography/H2";
import TitleInput from "typography/TitleInput";
import TaskBigTile from "./TaskBigTile";

export default class GroupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            tasks: props.tasks,
        };
        this.onUnmount = props.onUnmount;
    }

    componentWillUnmount() {
        this.onUnmount(this.state.name, this.state.tasks);
    }

    render() {
        return (
            <GroupsContext.Consumer>
                {
                    groups => <TasksContext.Consumer>
                        {
                            tasks => <>
                                <TitleInput
                                    value={this.state.name}
                                    onChange={e => this.setState({ name: e.target.value })}
                                />
                                <br /><br />
                                <H2 text="tasks" />
                                <br />
                                {
                                    this.state.tasks.map(
                                        taskId => <TaskBigTile key={taskId} taskId={taskId} />
                                    )
                                }
                            </>
                        }
                    </TasksContext.Consumer>
                }
            </GroupsContext.Consumer>
        );
    }
}