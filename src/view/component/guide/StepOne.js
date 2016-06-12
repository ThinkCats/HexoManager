import React, {Component} from 'react';

export default class StepOne extends Component{
    render(){
        return (
            <div className="ui segment">
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <div className="ui active inverted dimmer">
                    <div className="ui medium text loader">
                        Checking System ....
                    </div>
                </div>
            </div>
        )
    }
}