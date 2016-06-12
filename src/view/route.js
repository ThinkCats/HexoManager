import React from 'react';
import {Route} from 'react-router';
import App from './component/manager/App';
import Home from './component/manager/Home';
import Content from './component/manager/Content';

export default (
    <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/content" component={Content}/>
    </Route>
)
