import React from 'react';
import axios from 'axios';
import PublicEvent from './PublicEvent';
import PublicNavigation from './PublicNavigation';

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
      console.log(response);
      let events = response.data.events;
      let obj = {};

      // for (let i=0; i<events.length; i++) {
      //   console.log(events[i]);
      //   obj[events[i].id] = events[i];
      //   this.setState({ events : obj});
      // }

      events.forEach((event) => {
        obj[event.date] = event;
      })
      this.setState({ events : obj});
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <PublicNavigation></PublicNavigation>
        <div>
          <h3 className="text-center mt-3">Upcoming Trips:</h3>
          <div>
            {
              Object
              .keys(this.state.events)
              .map(key => <PublicEvent key={key} index={key} details={this.state.events[key]}/>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Public;
