import loggerMiddleware from "./middleware/logger";
import * as RootReducer from "./redux/reducers";
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);
const configureStore=()=>createStore(
  RootReducer.default,
  {},
  composedEnhancers
)
export default configureStore