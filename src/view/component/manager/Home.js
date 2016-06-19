import React, {Component} from 'react';
import {Link} from 'react-router';

class Home extends Component {
    render() {
        return (
            <div>
                Hello Home! ... <Link to="/manager/content">content</Link>
            </div>
        )
    }
}

export default Home;