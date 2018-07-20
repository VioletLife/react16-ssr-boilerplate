import * as React from "react";

import {renderContainer} from "../appContainer";

const createApp = () => renderContainer();

export default class RouterConfiguration extends React.Component {
  public render() {
    return createApp();
  }
}


