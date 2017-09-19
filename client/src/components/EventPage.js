import React from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import Comments from './Comments';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      comments: {}
    }
  }

  componentWillMount() {
    // set events state to equal all the events
    // loop through the state object and return each event

    // make api call to get all the events from db
    // returns an array of events
    // sets the state
    let eventID = this.props.match.params.id;
    console.log('url:', this.props.match.url);
    axios.get(this.props.match.url)
    .then((response) => {
      console.log('response:', response);
      let event = response.data.event[0];
      this.setState({ event : event});
    }).catch(function(error) {
      console.log(error);
    });

    axios.get(`/comments/${eventID}`)
    .then((response) => {
      console.log('response:', response);
      let comments = response.data.comments;
      let obj = {};
      comments.forEach((comment) => {
        obj[comment.id] = comment;
      })

      this.setState({ comments : obj});
    }).catch(function(error) {
      console.log(error);
    });

    console.log('test', eventID);
  }

  render() {
    let details = this.state.event;
    return (
      <div>
        <Navigation></Navigation>
        <img src={details.image_url} alt={details.name} />
        <p>{details.title}</p>
        <p>{details.date}</p>
        <p>{details.description}</p>
        <p>{details.location}</p>
        <p>Organizer: {details.organizer} (link to email)</p>
        <div>
          <p>Comments:</p>
          <div>
            {
              Object
              .keys(this.state.comments)
              .map(key => <Comments key={key} details={this.state.comments[key]}/>)
            }
          </div>
          {/* <Comments {...this.state} id={details.id}></Comments> */}
          <div className="form-group row">
            <label for="example-text-input" className="col-2 col-form-label">Leave a comment</label>
            <div className="col-10">
              <input className="form-control" type="text" value="" id="example-text-input"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventPage;
