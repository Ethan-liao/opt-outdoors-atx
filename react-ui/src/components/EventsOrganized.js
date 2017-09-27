import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import EventOrganized from './EventOrganized';
import Navigation from './Navigation';

class EventsOrganized extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {},
      redirect: false
    }

    this.removeEvent = this.removeEvent.bind(this);
  }

  componentWillMount() {
    axios.get('/privateEvents/organized')
    .then(response => {
      if (response.data.code === 200) {
        // User has access to this page
        let events = response.data.events;
        let obj = {};
        events.forEach((event) => {
          obj[event.id] = event;
        })
        this.setState({ events : obj});
      } else if (response.data.code === 204) {
        // User does not have access to this page
        this.setState({ redirect : true})
      } else {
        // Unknown error code received
        this.setState({ redirect : true})
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  removeEvent(key) {
    axios.delete(`/event/${key}`)
    .then(response => {
      if (response.data.code === 200) {
        const events = {...this.state.events}
        delete events[key];
        this.setState({ events });
      } else {
        console.log('An error occured removing the event');
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
          <h3 className="text-center mt-3">Upcoming Trips You Have Organized:</h3>
          <div>
            {
              Object
              .keys(this.state.events)
              .map(key => <EventOrganized removeEvent={this.removeEvent} key={key} index={key} details={this.state.events[key]}/>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default EventsOrganized;
