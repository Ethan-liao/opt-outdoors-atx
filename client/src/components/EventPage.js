import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import Navigation from './Navigation';
import Comments from './Comments';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      comments: {},
      newComment: '',
      attendees: {},
      redirect: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
  }

  componentWillMount() {
    let eventID = this.props.match.params.id;
    let url = this.props.match.url;

    axios.get(url).then(response => {
      if (response.data.code === 200) {
        console.log('events response:', response);
        let event = response.data.event[0];
        event['id'] = eventID;
        this.setState({event: event});
      } else {
        console.log("user is not logged in");
        this.setState({redirect: true})
      }
    }).catch(function(error) {
      console.log(error);
    });

    axios.get(`${url}/attendees`).then(response => {
      if (response.data.code === 200) {
        let attendees = response.data.attendees;
        let obj = {};
        attendees.forEach((attendee) => {
          obj[attendee.id] = attendee;
        })
        this.setState({ attendees : obj });
      } else {
        console.log("user is not logged in");
        this.setState({redirect: true})
      }
    }).catch(function(error) {
      console.log(error);
    });

    axios.get(`/comments/${eventID}`).then(response => {
      let comments = response.data.comments;
      let obj = {};
      comments.forEach((comment) => {
        obj[comment.comment_id] = comment;
      })
      this.setState({comments: obj});
    }).catch(function(error) {
      console.log(error);
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitComment(event) {
    event.preventDefault();
    let payload = {
      "content": this.state.newComment,
      "event_id": this.state.event.id
    };
    axios.post(`/comments/${this.state.event.id}`, payload)
    .then(response => {
    if (response.data.code === 200) {
      // replicate the result of a comments-users join query
      let newComment = response.data.comment[0];
      newComment["admin"] = response.data.admin;
      newComment["email"] = response.data.email;
      newComment["first"] = response.data.first;
      newComment["last"] = response.data.last;
      // create copy of state, add new comment, update state
      const comments = {...this.state.comments};
      comments[response.data.comment[0].comment_id] = newComment;
      this.setState({
        comments,
        newComment: ''
       })
       // clear the comment form
       this.refs.newComment.value = ''
    } else if (response.data.code === 204) {
      console.log('response:', response);
    }})
    .catch(function(error) {
      console.log(error);
    });
  }

  joinEvent(event) {
    event.preventDefault();
    axios.post(`/event/${this.state.event.id}/rsvp`)
    .then(response => {
      if (response.data.code === 200) {
        // replicate the result of a comments-users join query
        let newAttendee = response.data.attendee[0];
        newAttendee["admin"] = response.data.admin;
        newAttendee["email"] = response.data.email;
        newAttendee["first"] = response.data.first;
        newAttendee["last"] = response.data.last;
        // create copy of state, add new comment, update state
        const attendees = {...this.state.attendees};
        attendees[response.data.attendee[0].user_id] = newAttendee;
        // comments[response.data.comment[0].comment_id] = response.data.comment[0];
        this.setState({ attendees });
         // clear the comment form
         this.refs.newComment.value = ''
      } else if (response.data.code === 204) {
        console.log('response:', response);
      }})
      .catch(function(error) {
        console.log(error);
      });
    }


  render() {
    let details = this.state.event;

    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/"
      }}/>)
    }

    return (
      <div>
        <Navigation></Navigation>
        <div className="col-sm-10 offset-sm-1 py-3">
          <img src={details.image_url} alt={details.name}/>
          <p><strong>Title</strong></p>
          <p>{details.title}</p>
          <p><strong>Date</strong></p>
          <p>{details.date}</p>
          <p><strong>Description</strong></p>
          <p>{details.description}</p>
          <p><strong>Location</strong></p>
          <p>{details.location}</p>
          <p><strong>Organizer</strong></p>
          <p>{details.first} {details.last} ({details.email})</p>
          <p><strong>Attendees ({Object.keys(this.state.attendees).length})</strong></p>
          <ul>
            {Object.keys(this.state.attendees).map(key => <li key={key}>{this.state.attendees[key].first} {this.state.attendees[key].last}</li>)}
          </ul>
          <div>
            <p><strong>Comments:</strong></p>
            <div>
              {Object.keys(this.state.comments).map(key => <Comments key={key} details={this.state.comments[key]}/>)
            }
          </div>
          <div>
            <form onSubmit={this.submitComment}>
              <div className="form-group">
                <label htmlFor="newComment">Leave a comment:</label>
                <input required name="newComment" type="text" className="form-control" id="newComment" onChange={this.handleInputChange} ref="newComment"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        <button onClick={this.joinEvent} type="button" className="btn btn-primary">Join Event</button>
        </div>
    </div>
    )
  }
}

export default EventPage;
