import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Event from './Event';
import Navigation from './Navigation';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {},
      redirect: false
    }
  }

  componentWillMount() {
    axios.get('/privateEvents')
    .then(response => {
      if (response.data.code === 200) {
        console.log("User has access to this page");
        console.log('test:', response);
        let events = response.data.events;
        let obj = {};
        events.forEach((event) => {
          obj[`${event.id}-${event.created_at}`] = event;
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
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/"
      }} />)
    }
    return (
      <div>
        <Navigation></Navigation>
        <div>
          <h3 className="text-center mt-3">Upcoming Trips:</h3>
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
