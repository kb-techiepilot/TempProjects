import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import About from "./components/About";
import User from "./components/User";
import UserDetail from "./components/UserDetail";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/about" component={About}/>
          <Route path="/user" exact component={User}/>
          <Route path="/user/:id" component={UserDetail}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
