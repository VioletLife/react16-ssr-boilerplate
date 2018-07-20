import { hydrate } from "react-dom";
import { renderRoot, renderContainer } from "./appContainer";
import { configureStore } from "./configureStore2";

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const reduxStore = configureStore(preloadedState);
hydrate(
  renderContainer(reduxStore),
  renderRoot("root") as HTMLElement
);