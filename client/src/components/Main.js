import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Public from './Public';
import Login from './Login';
import Home from './Home';

const Main = () => (
  // The Switch will iterate over its children elements (the routes) and only
  // render the first one that matches the current pathname

  // When a route with a component prop matches, the route will return a
  // new element whose type is the provided React component

  <main>
    <Switch>
      <Route exact path='/' component={Public}/>
      <Route exact path='/login' component={Login}/>
      <Route path='/home' component={Home}/>
    </Switch>
  </main>
)

export default Main
