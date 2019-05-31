import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; //we will need it probably later on
import {Welcome} from './welcome';

let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />
} else {
    elem = <img src="./img/two-scarlet-macaws-Max-100.jpg" />
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);

//comment in JSX {/**/}
