import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
//import { Link } from 'react-router-dom';

export function Welcome() {
    return (
        <div className="registration-container">
            <img src="/img/logo.png" className="img-logo-welcome" />
            <h2>Join the community</h2>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
