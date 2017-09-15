// Add layout main page here
import React from 'react';
// import { Media } from 'react-bootstrap'
import axios from 'axios';

import Event from './Event';
import Header from './Header';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: this.props.user.id,
      email: this.props.user.email,
      mainscreen: [],
      events: {},
      isLogin: true
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


    var mainscreen = [];
    mainscreen.push(<Event/>);
    // mainscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    this.setState({mainscreen: mainscreen})
  }

  render() {
    return (
      <div>
        <Header></Header>
        <h3>Upcoming Events:</h3>
        <div>
            {
              Object
              .keys(this.state.events)
              .map(key => <Event key={key} index={key} details={this.state.events[key]} parentContext={this} appContext={this.props.appContext}/>)
            }
        </div>
      </div>
    )
  }
}

export default MainScreen;
