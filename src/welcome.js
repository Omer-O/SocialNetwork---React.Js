import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Registration } from './registration';
import { Login } from './login';
//import { Link } from 'react-router-dom';

export function Welcome() {
    return (
        <div id="welcome">
            <h1>INK IT</h1>
            <h2>sketch IT tatoo IT share IT</h2>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
