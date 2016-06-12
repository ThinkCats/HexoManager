import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './component/App';
import Manager from './component/manager/Manager';
import Home from './component/manager/Home';
import Content from './component/manager/Content';
import Guide from './component/guide/Guide';
import StepOne from './component/guide/StepOne';

export default (
    <Route component={App}>
        <Route path="/" component={Manager}>
            <IndexRoute component={Home}/>
        </Route>
        <Route path="/manager" component={Manager}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="content" component={Content}/>
        </Route>
        <Route path="/guide" component={Guide}>
            <IndexRoute component={StepOne}/>
            <Route path="stepOne" component={StepOne}/>
        </Route>
    </Route>
)
