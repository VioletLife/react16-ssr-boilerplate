import * as React from "react";
import * as ReactDOM from "react-dom";
// import App from './App';

// import { createStore } from "redux";
// import { enthusiasm } from "./reducers";
import "./index.css";

import registerServiceWorker from "./registerServiceWorker";
import RouterConfiguration from "./router";


// const store = createStore(enthusiasm, {
//   enthusiasmLevel: 1,
//   languageName: "TypeScript"
// });

// ReactDOM.render(
//     <Provider store={store}>
//         <Hello/>
//     </Provider>,
//     document.getElementById('root') as HTMLElement
// );


const renderApp = () => ReactDOM.render(
  <RouterConfiguration/>,
  document.getElementById("root") as HTMLElement
);

renderApp();
registerServiceWorker();
