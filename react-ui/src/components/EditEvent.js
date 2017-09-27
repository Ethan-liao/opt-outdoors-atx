import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Navigation from './Navigation';

class EditEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "event": {},
      "activity": '',
      "title": '',
      "description": '',
      "organizer": '',
      "image_url": '',
      "date": '',
      "location": '',
      "submit": false,
      "redirect": false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount() {
    let url = this.props.match.url;
    axios.get(url).then(response => {
      if (response.data.code === 200) {
        let event = response.data.event[0];
        this.setState({
          event: event,
          title: event.title,
          description: event.description,
          location: event.location,
          date: event.date,
          image_url: event.image_url,
          organizer: event.organizer,
          activity: event.activity
        });
      } else if (response.data.code === 403) {
        // User not authorized to view page
        this.setState({ redirect : true })
      } else {
        // Error retrieving data
        this.setState({ redirect : true })
      }})
      .catch(error => {
      // console.log('error on mount:', error);
      this.setState({ redirect : true })
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let payload = {
      activity : this.state.activity,
      title : this.state.title,
      description : this.state.description,
      image_url : this.state.image_url,
      date : this.state.date,
      location : this.state.location,
      organizer : this.state.organizer
    };

    axios.patch(`/event/${this.state.event.id}`, payload)
    .then(response => {
      if (response.data.code === 200) {
        // Event edited
        this.setState({ submit: true })
      } else if (response.data.code === 204) {
        // Error making change to the event
      } else if (response.data.code === 403) {
        // Not authorized
        this.setState({ redirect : true })
      } else {
        // User not authorized to make changes
        this.setState({ redirect: true })
      }
    }).catch(error => {
      this.setState({ redirect : true })
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ submit: true })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {

    const buttonStyle = {
      backgroundColor: "#336b87",
      borderColor: "#336b87"
    };

    const buttonStyle2 = {
      backgroundColor: "#283132",
      borderColor: "#283132"
    };

    if (this.state.submit) {
      return (<Redirect to={{
        pathname: "/organized"
      }} />)
    }

    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/"
      }} />)
    }

    return (
      <div>
        <Navigation></Navigation>
        <div className="container">
          <div className="row py-3">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <div>
                <h3 className="text-center mt-3">Edit Trip Details:</h3>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <label htmlFor="activity" className="col-2 col-form-label">Activity</label>
                    <div className="col-10">
                      <select required name="activity" className="form-control" id="activity" onChange={this.handleInputChange}>
                        <option>Hiking</option>
                        <option>Trail Running</option>
                        <option>Mountain Biking</option>
                        <option>Road Biking</option>
                        <option>Climbing</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="title" className="col-2 col-form-label">Title</label>
                    <div className="col-10">
                      <input required value={this.state.title} name="title" className="form-control" type="text" id="title" onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="description" className="col-2 col-form-label">Description</label>
                    <div className="col-10">
                      <textarea required value={this.state.description} name="description" className="form-control" id="description" rows="3" onChange={this.handleInputChange}></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="location" className="col-2 col-form-label">Location</label>
                    <div className="col-10">
                      <input required value={this.state.location} name="location" className="form-control" type="text" id="location" onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="date" className="col-2 col-form-label">Date</label>
                    <div className="col-10">
                      <input required value={this.state.date.substring(0,10)} name="date" className="form-control" type="date" id="date" onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="image_url" className="col-2 col-form-label">Image URL</label>
                    <div className="col-10">
                      <input required value={this.state.image_url} name="image_url" className="form-control" type="url" id="image_url" onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2" style={buttonStyle}>Submit</button>
                  <button onClick={this.handleCancel} type="button" className="btn btn-primary" style={buttonStyle2}>Cancel</button>
                </form>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditEvent;
