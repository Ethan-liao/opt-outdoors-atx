import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

import Event from './Event';
import Navigation from './Navigation';

class Home extends React.Component {
  constructor(props) {
    super(props);

    // this.state = props.location.state;
    // this.state[redirect] = false
    this.state = {
      events: {}
    }

  }

  componentWillMount() {
    // set events state to equal all the events
    // loop through the state object and return each event
    //
    // make api call to get all the events from db
    // returns an array of events
    // sets the state

    axios.get('/privateEvents')
    .then(response => {
      if (response.data.code === 200) {
        console.log("User has access to this page");
        let events = response.data.events;
        let obj = {};
        events.forEach((event) => {
          obj[event.id] = event;
        })
        this.setState({ events : obj});
        console.log(this.state.events);
      } else if (response.data.code === 204) {
        console.log("User does not have access to this page");
        this.setState({ redirect : true})
      } else {
        console.log("Unknown error code received");
        this.setState({ redirect : true})
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    // if (this.state.redirect) {
    //   return (<Redirect to={{
    //     pathname: "/"
    //   }} />)
    // }
    return (
      <div>
        <Navigation></Navigation>
        <div>
          <h3>Upcoming Events:</h3>
          <div>
            {
              Object
              .keys(this.state.events)
              .map(key => <Event key={key} index={key} details={this.state.events[key]}/>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
