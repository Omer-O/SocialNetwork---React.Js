import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome";
import { App } from "./app";
import * as io from "socket.io-client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import { init } from "./chat-socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

// if (location.pathname != "/welcome") {
//     init();
// }

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
