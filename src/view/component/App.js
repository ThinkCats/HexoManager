import React, {Component} from 'react';
import SideBar from './common/SideBar';

class App extends Component {

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
                    <a className="item">
                        <i className="home icon"></i>
                        Home
                    </a>
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
                    <span onClick={this.handleShowSideBar}>show sidebar</span><br/>
                    {this.props.children}
                </div>
            </div>

        )
    }
}

export default App;