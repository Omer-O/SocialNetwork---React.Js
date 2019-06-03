import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Registration } from './registration';
import { Login } from './login';
//import { Link } from 'react-router-dom';

export function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img src="./img/two-scarlet-macaws-Max-100.jpg" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
