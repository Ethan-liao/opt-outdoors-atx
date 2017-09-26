import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Moment from 'react-moment';

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

    const buttonStyle = {
      backgroundColor: "#336b87",
      borderColor: "#336b87"
    };

    const buttonStyle2 = {
      backgroundColor: "#90afc5",
      borderColor: "#90afc5"
    };

    const buttonStyle3 = {
      backgroundColor: "#283132",
      borderColor: "#283132"
    };

    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/"
      }}/>)
    }

    return (
      <div>
        <Navigation></Navigation>
        <div className="container">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10 text-center pb-3 mt-3">
              <img className="w-100" src={details.image_url} alt={details.name}/>
              <h3 className="py-3"><strong>{details.title}</strong></h3>
              <button onClick={this.joinEvent} type="button" className="btn btn-primary mr-3" style={buttonStyle}>Join Event</button>
              <a className="btn btn-primary" href={`mailto:${details.email}?subject=${details.title}`} style={buttonStyle2}>Contact the Organizer</a>
            </div>
            <div className="col-sm-1"></div>
          </div>

          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <div className="row">
                <div className="col-sm-8 py-3 form-control">
                  <h5><strong>Additional Information</strong></h5>
                  <div className="row">
                    <p className="col-sm-3">Organizer:</p>
                    <p className="col-sm-9">{details.first} {details.last}</p>
                  </div>

                  <div className="row">
                    <p className="col-sm-3">Date:</p>
                    <p className="col-sm-9"><Moment format="dddd, MMMM Do">{details.date}</Moment></p>
                  </div>

                  <div className="row">
                    <p className="col-sm-3">Location:</p>
                    <p className="col-sm-9">{details.location}</p>
                  </div>

                  <div className="row">
                    <p className="col-sm-3">Primary Activity:</p>
                    <p className="col-sm-9">{details.activity}</p>
                  </div>

                  <div className="row">
                    <p className="col-sm-3">Details:</p>
                    <p className="col-sm-9">{details.description}</p>
                  </div>

                </div>
                {/* <div className="col-sm-1 py-3"></div> */}
                <div className="col-sm-4 py-3 form-control">
                  <h5><strong>Attendees ({Object.keys(this.state.attendees).length})</strong></h5>
                  <div>
                    {Object.keys(this.state.attendees).map(key => <p key={key}>{this.state.attendees[key].first} {this.state.attendees[key].last}</p>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>

          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">

              <h4 className="text-center pt-3"><strong>Message Board</strong></h4>
              <div>
                <form onSubmit={this.submitComment}>
                  <div className="form-group">
                    {/* <label htmlFor="newComment">Leave a message:</label> */}
                    <div className="row">
                      <div className="col-sm-10">
                        <input required name="newComment" type="text" className="form-control" id="newComment" onChange={this.handleInputChange} ref="newComment" placeholder="Ask questions, post your thoughts, etc."/>
                      </div>
                      <div className="col-sm-2">
                        <button type="submit" className="btn btn-primary" style={buttonStyle3}>Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="form-control mb-3">
                {Object.keys(this.state.comments).map(key => <Comments key={key} details={this.state.comments[key]}/>)}
              </div>

            </div>
            <div className="col-sm-1"></div>

          </div>
        </div>
      </div>
    )
  }
}

export default EventPage;
