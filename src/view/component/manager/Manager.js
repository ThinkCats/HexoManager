import React, {Component} from 'react';
import {Link} from 'react-router';

class Manager extends Component {

    componentDidMount(){
        $('.custom-sidebar .ui.sidebar').sidebar({
            context: $('.custom-sidebar')
        });
    }

    handleShowSideBar=()=>{
        $('.custom-sidebar .ui.sidebar').sidebar('toggle')
    };

    render() {
        return (
            <div className="custom-sidebar ui bottom attached segment">
                <div className="ui sidebar icon inverted vertical menu">
                    <Link className="item" to="/" onClick={this.handleShowSideBar}>
                        <i className="home icon"></i>
                        Home
                    </Link>
                    <a className="item">
                        <i className="block layout icon"></i>
                        Topics
                    </a>
                    <a className="item">
                        <i className="smile icon"></i>
                        Friends
                    </a>
                </div>

                <div className="pusher">
                    <button onClick={this.handleShowSideBar} className="right attached ui black button custom-menu">Menu</button><br/>
                    <div className="ui container">
                        {this.props.children}
                    </div>
                </div>
            </div>

        )
    }
}

export default Manager;