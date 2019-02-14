import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import App from "./components/App";
import CssBaseline from '@material-ui/core/CssBaseline';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <CssBaseline />
        <App/>
      </Fragment>
    </ConnectedRouter>
  </Provider>,
  document.querySelector("#root")
);
