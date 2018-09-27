import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto'

import dashboard from './components/dashboard';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={dashboard} />
            <Route component={dashboard} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();