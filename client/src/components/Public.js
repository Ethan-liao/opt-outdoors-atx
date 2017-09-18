import React from 'react';
import axios from 'axios';
import Event from './Event';

class Public extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {}
    }
  }

  componentWillMount() {
    // set events state to equal all the events
    // loop through the state object and return each event

    // make api call to get all the events from db
    // returns an array of events
    // sets the state
    axios.get('/events')
    .then((response) => {
      let events = response.data.events;
      let obj = {}
      events.forEach((event) => {
        obj[event.id] = event;
      })
      this.setState({ events : obj});
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
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
    )
  }
}

export default Public;
