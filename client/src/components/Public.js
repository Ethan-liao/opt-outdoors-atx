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
    axios.get('/events')
    .then((response) => {
      console.log(response);
      let events = response.data.events;
      let obj = {};
      events.forEach((event) => {
        obj[`${event.id}-${event.created_at}`] = event;
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
        {/* <Footer></Footer> */}
      </div>
    )
  }
}

export default Public;
