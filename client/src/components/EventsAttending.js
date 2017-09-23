import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import EventAttending from './EventAttending';
import Navigation from './Navigation';

class EventsAttending extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {},
      redirect: false
    }

    this.removeMe = this.removeMe.bind(this);
  }

  componentWillMount() {
    axios.get('/privateEvents/attending')
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

  removeMe(key) {
    axios.delete(`/event/${key}/leave`)
    .then(response => {
      if (response.data.code === 200) {
        const events = {...this.state.events}
        delete events[key];
        this.setState({ events });
      } else {
        console.log('error response:', response);
      }})
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/"
      }} />)
    }
    return (
      <div>
        <Navigation></Navigation>
        <div>
          <h3 className="text-center">Upcoming Events You Are Attending:</h3>
          <div>
            {
              Object
              .keys(this.state.events)
              .map(key => <EventAttending removeMe={this.removeMe} key={key} index={key} details={this.state.events[key]}/>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default EventsAttending;
