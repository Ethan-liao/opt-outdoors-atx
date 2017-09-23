import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Public from './Public';
import Login from './Login';
import Home from './Home';
import EventPage from './EventPage';
import EditEvent from './EditEvent';
import AddEvent from './AddEvent';
import EventsOrganized from './EventsOrganized';
import EventsAttending from './EventsAttending';
import EditSettings from './EditSettings';
import NotFound from './NotFound';

// The Switch will iterate over its children elements (the routes) and only
// render the first one that matches the current pathname

// When a route with a component prop matches, the route will return a
// new element whose type is the provided React component

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      user: {},
      events: {}
    }
  }

  render() {
    return (
      <main id="green">
        <Switch>
          {/* <Route exact path='/' component={Public}/> */}
          <Route exact path='/' render={ ()  => <Public {...this.state}/> }/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/home' render={ ()  => <Home {...this.state}/> }/>
          {/* <Route exact path='/home' component={Home}/> */}
          <Route exact path='/event/:id' component={EventPage}/>
          {/* <Route exact path='/event/edit/:id' render={ ()  => <EditEvent {...this.state}/> }/> */}
          <Route exact path='/event/edit/:id' component={EditEvent}/>
          <Route exact path='/add' component={AddEvent}/>
          <Route exact path='/organized' component={EventsOrganized}/>
          <Route exact path='/attending' component={EventsAttending}/>
          <Route exact path='/user' component={EditSettings}/>
          <Route component={NotFound}/>
        </Switch>
      </main>
    )
  }
}

export default Main;
