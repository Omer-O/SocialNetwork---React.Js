import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; //we will need it probably later on
import { Registration } from './registration';

let elem;

if (location.pathname == '/welcome') {
    elem = <Registration />
} else {
    elem = <img src="./img/two-scarlet-macaws-Max-100.jpg" />
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);

//comment in JSX {/**/}
