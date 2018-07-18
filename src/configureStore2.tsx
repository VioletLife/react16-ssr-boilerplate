import loggerMiddleware from "./middleware/logger";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./redux/reducers";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();
export  function configureStore(preloadedState: any) {
  const middlewares = [routerMiddleware(history), loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);
  const store = createStore(connectRouter(history)(rootReducer), preloadedState, composedEnhancers);
  return store;
}