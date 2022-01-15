import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import { firebase } from "./lib/firebase";

const middleware = [reduxThunk.withExtraArgument({ getFirestore })];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware), reduxFirestore(firebase))
);

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
