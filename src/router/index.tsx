import * as React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, ConnectedRouter, routerMiddleware } from "connected-react-router";
import { Route, Link } from "react-router-dom";
import Hello from "../components/Hello";
import About from "../components/about/About";
import Topic from "../components/topics/Topic";
import * as RootReducer from "../redux/reducers/index";

const history = createBrowserHistory();
const store = createStore(
  connectRouter(history)(RootReducer.default),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

export default class RouterConfiguration extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
            </ul>
            <hr/>
            <Route exact path="/" component={Hello}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topic}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}