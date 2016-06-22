import React, {Component} from 'react';
import connectToStore from 'alt-utils/lib/connectToStores';
import GuideAction from '../../action/GuideAction';
import GuideStore from '../../store/GuideStore';

class PureGuide extends Component {

    static getStores() {
        return [GuideStore];
    }

    static getPropsFromStores() {
        console.log('Global Guide State:', GuideStore.getState());
        return GuideStore.getState();
    }


    componentDidMount() {
        console.log('guide init');
        GuideAction.handleInit()
    }

    render() {
        let stepOne = '';
        let stepTwo = '';
        let stepThree = '';
        let step = this.props.step;
        switch (step) {
            case 2:
                stepOne = 'completed';
                stepThree = 'disabled';
                break;
            case 3:
                stepOne = 'completed';
                stepTwo = 'completed';
                stepThree = 'completed';
                break;
            default:
                stepTwo = 'disabled';
                stepThree = 'disabled';
        }
        return (
            <div className="ui text container">
                <br/>
                <h2 className="ui header">
                    <i className="settings icon"></i>
                    <div className="content">Setting Your Hexo</div>
                </h2>
                <div className="ui steps">
                    <div className={stepOne + " step"}>
                        <i className="info icon"></i>
                        <div className="content">
                            <div className="title">Step 1: System Env</div>
                            <div className="description">You may need git & hexo</div>
                        </div>
                    </div>
                    <div className={stepTwo + " step"}>
                        <i className="info icon"></i>
                        <div className="content">
                            <div className="title">Step 2: Hexo Setup</div>
                            <div className="description">Set up your git and hexo</div>
                        </div>
                    </div>
                    <div className={stepThree + " step"}>
                        <i className="info icon"></i>
                        <div className="content">
                            <div className="title">Step 3: Complete</div>
                            <div className="description">Enjoy writing your blog</div>
                        </div>
                    </div>
                </div>
                <div className="ui attached segment container">
                    {this.props.children}
                </div>

            </div>
        )
    }
}

const Guide = connectToStore(PureGuide);

export default Guide;