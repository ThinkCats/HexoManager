import React, {Component} from 'react';

class App extends Component{
    render(){
        return (
            <div className="custom-content">
                {this.props.children}
            </div>
        )
    }
}

export default App;