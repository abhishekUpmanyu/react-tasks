import React from "react";
import { MainViewContext } from "./MainViewProvider";

export class MainView extends React.Component {
    style = {
        flex: 8,
        padding: '64px 32px',
        width: '100%',
        overflow: 'scroll',
    };

    render() {
        return (
            <div style={this.style}>
                <MainViewContext.Consumer style={{width: '100%'}}>
                    {child => child}
                </MainViewContext.Consumer>
            </div>
        );
    }
}