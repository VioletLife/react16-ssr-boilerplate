import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Hello from "../components/Hello";
import About from "../components/about/About";
import Topic from "../components/topics/Topic";


export default class RouterConfiguration extends React.Component {
  public render() {
    return (
      <Router>
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
      </Router>
    );
  }
}