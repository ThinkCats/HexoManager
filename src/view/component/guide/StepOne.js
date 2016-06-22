import React, {Component} from 'react';
import GuideAction from '../../action/GuideAction';
import GuideStore from '../../store/GuideStore';
import connectToStore from 'alt-utils/lib/connectToStores';

class StepOne extends Component {

    static getStores() {
        return [GuideStore];
    }

    static getPropsFromStores() {
        console.log('Global Guide State:', GuideStore.getState());
        return GuideStore.getState();
    }

    componentDidMount() {
        GuideAction.handleCheckEnv();
    }

    render() {
        let loading = <div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="ui active inverted dimmer">
                <div className="ui medium text loader">
                    Checking System ....
                </div>
            </div>
        </div>;

        let envResult = this.props.envResult.message;
        let git = envResult ? envResult.git : '';
        let hexo = envResult ? envResult.hexo : '';
        let mongo = envResult ? envResult.mongo : '';

        let result = <Content git={git} hexo={hexo} mongo={mongo}/>;

        let view = null;
        if (this.props.loadingHidden) {
            view = result;
        } else {
            view = loading;
        }

        return (
            <div className="ui text ">
                {view}
            </div>
        )
    }
}

class Content extends Component {
    render() {
        let git = this.props.git;
        let hexo = this.props.hexo;
        let mongo = this.props.mongo;
        let gitStatus = git.success ? <i className="checkmark icon"></i> : '';
        let hexoStatus = hexo.success ? <i className="checkmark icon"></i> : '';
        let mongoStatus = mongo.success ? <i className="checkmark icon"></i> : '';
        let hexoMsg = hexo.success ? hexo.message.split('\n').map((data, i)=> {
            return <p key={i}>{data}</p>
        }) : <div className="ui red message">Hexo Not Ready</div>;
        let gitMsg = git.success ? git.message : <div className="ui red message">Git Not Ready</div>;
        let mongoMsg = mongo.success ? mongo.message : <div className="ui red message">Mongo Not Ready</div>;

        let nextButton = null;
        if (mongo.success && git.success && hexo.success) {
            nextButton = (
                <div className="custom-guide-next-button">
                    <button className="mini ui teal  right labeled icon button "><i className="right arrow icon"></i>
                        Next
                    </button>
                </div> );
        }
        return (
            <div className="ui text">
                <h1>Mongo {mongoStatus}</h1>
                <p>
                    {mongoMsg}
                </p>
                <h1>Git { gitStatus }</h1>
                <p>
                    {gitMsg}
                </p>
                <h1>Hexo{ hexoStatus }</h1>
                {hexoMsg}
                {nextButton}

            </div>
        )
    }
}

export default connectToStore(StepOne);