import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Registration } from './registration';
import { Login } from './login';
//import { Link } from 'react-router-dom';

export function Welcome() {
    return (
        <div id="welcome">
            <img src="./img/logo.png" />
            <h2>SKETCH it INK it SHARE it</h2>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
