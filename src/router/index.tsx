import * as React from "react";
import { Provider } from "react-redux";
import { Route, Link } from "react-router-dom";
import Hello from "../components/Hello";
import About from "../components/about/About";
import Topic from "../components/topics/Topic";
import {
  addTodo, toggleTodo, setVisibilityFilter, showMySelf,
  selectSubreddit, fetchPostsIfNeeded
} from "../redux/actions";
import { history, configureStore } from "../configureStore2";
import { ConnectedRouter } from "connected-react-router";

const reduxStore = configureStore(undefined);
// const history = createBrowserHistory();
// const store = createStore(
//   connectRouter(history)(RootReducer.default),
//   {},
//   compose(
//     applyMiddleware(
//       routerMiddleware(history)
//     )
//   )
// );

console.info(reduxStore);
console.info(reduxStore.getState());
console.info(reduxStore.dispatch(addTodo(123)));
console.info(reduxStore.dispatch(toggleTodo(1)));
console.info(reduxStore.dispatch(setVisibilityFilter(() => {
})));
console.info(reduxStore.dispatch(showMySelf("This is Dispatch MySelf")));
reduxStore.dispatch(selectSubreddit(("reactjs")));
reduxStore.dispatch<any>(fetchPostsIfNeeded("reactjs"))
  .then(() => console.log(reduxStore.getState()));
console.info(reduxStore.getState());


export default class RouterConfiguration extends React.Component {
  public render() {
    return (
      <Provider store={reduxStore}>
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