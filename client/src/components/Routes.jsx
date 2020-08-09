import React from "react"
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function Routes () {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contact}/>

      </Switch>
    );
  }
  export default Routes;