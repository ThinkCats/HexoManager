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

        let result = <Content git={git} hexo={hexo}/>;

        let view = null;
        if (this.props.loadingHidden) {
            view = result;
        } else {
            view = loading;
        }

        return (
            <div className="ui text container">
                {view}
            </div>
        )
    }
}

class Content extends Component {
    render() {
        let git = this.props.git;
        let hexo = this.props.hexo;
        let gitStatus = git.success ? <i className="checkmark icon"></i> : '';
        let hexoStatus = hexo.success ? <i className="checkmark icon"></i> : '';
        let hexoList = hexo.message.split('\n').map((data, i)=> {
            return <p key={i}>{data}</p>
        });
        return (
            <div className="ui text container">
                <h1>Git { gitStatus }</h1>
                <p>
                    {git.message}
                </p>
                <h1>Hexo{ hexoStatus }</h1>
                {hexoList}
                <div className="custom-guide-next-button">
                    <button className="mini ui teal  right labeled icon button "><i className="right arrow icon"></i> Next </button>
                </div>

            </div>
        )
    }
}

export default connectToStore(StepOne);