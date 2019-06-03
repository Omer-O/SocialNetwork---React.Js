import React from 'react';
import ReactDOM from 'react-dom';

import { Welcome } from './welcome';

let elem;

if (location.pathname == '/') {
    elem = <Welcome />
} else {
        elem = <img src="./img/two-scarlet-macaws-Max-100.jpg" />
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);

//comment in JSX {/**/}
