import React, {Component} from 'react';

class Guide extends Component{
    render(){
        return (
            <div className="ui text container">
                <br/>
                <h2 className="ui header">
                    <i className="settings icon"></i>
                    <div className="content">Setting Your Hexo </div>
                </h2>
                <div className="ui steps">
                    <div className=" step">
                        <i className="info icon"></i>
                        <div className="content">
                            <div className="title">Step 1: System Env</div>
                            <div className="description">You may need git & hexo</div>
                        </div>
                    </div>
                    <div className="completed step">
                        <i className="info icon"></i>
                        <div className="content">
                            <div className="title">Step 2: Hexo Setup</div>
                            <div className="description">Set up your git and hexo </div>
                        </div>
                    </div>
                    <div className="disabled step">
                        <i className="info icon"></i>
                        <div className="content">
                            <div className="title">Step 3: Complete</div>
                            <div className="description">Enjoy writing your blog</div>
                        </div>
                    </div>
                </div>
                <div className="ui attached segment">
                    {this.props.children}
                </div>

            </div>
        )
    }
}

export default Guide;