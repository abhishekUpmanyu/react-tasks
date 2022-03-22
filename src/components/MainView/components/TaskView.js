import { GroupsContext, TasksContext, TasksUpdateContext } from "data/DataProvider";
import React from "react";
import BodyTextInputArea from "typography/BodyTextInputArea";
import TitleInput from "typography/TitleInput";

export default class TaskView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description,
        };
        this.onUnmount = props.onUnmount;
        this.containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        };
    }

    componentWillUnmount() {
        this.onUnmount(this.state.title, this.state.description);
    }

    render() {
        return (
            <GroupsContext.Consumer>
                {
                    groups => <TasksContext.Consumer>
                        {
                            tasks => <TasksUpdateContext.Consumer>
                                {tasksUpdate =>
                                    <div style={this.containerStyle}>
                                        <TitleInput
                                            value={this.state.title}
                                            onChange={
                                                e => this.setState({ title: e.target.value })
                                            }
                                        />
                                        <br /><br />
                                        <BodyTextInputArea
                                            value={this.state.description}
                                            onChange={
                                                e => this.setState({ description: e.target.value })
                                            }
                                        />
                                    </div>
                                }
                            </TasksUpdateContext.Consumer>
                        }
                    </TasksContext.Consumer>
                }
            </GroupsContext.Consumer>
        );
    }
}