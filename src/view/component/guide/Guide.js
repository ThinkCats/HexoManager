import React, {Component} from 'react';

class Guide extends Component{
    render(){
        return (
            <div>
                This is Guide Page<br/>
                {this.props.children}
            </div>
        )
    }
}

export default Guide;