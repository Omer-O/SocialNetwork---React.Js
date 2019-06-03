import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';//the welcome page
//import Login from './login';//the login page
import { Link } from 'react-router-dom';//the link will allow us to
//link routes without the page to be loaded again.

//this welcome will decide what to render. if login or Registration
function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img src="/logo.png" />
            <HashRouter>//hashrouter returns 1 element thats why we wrep
            //in div.
                <React.Fragment>//here we decide what we show by the route ('/')
                //the exact path will let the component do exactly what we want!
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </React.Fragment>
            </HashRouter>
        </div>
    );
}
//if we want to 'link' on click we need to use on <a> tag should be replaced with 'to' and not 'href'
//React.Fragment = will wrep instead of <div>
