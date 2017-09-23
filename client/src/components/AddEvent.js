import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Navigation from './Navigation';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "activity": 'hiking',
      "title": '',
      "description": '',
      "organizer": '',
      "image_url": '',
      "date": '',
      "location": '',
      "postSuccess": false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let payload = {
      "activity": this.state.activity,
      "title": this.state.title,
      "description": this.state.description,
      "image_url": this.state.image_url,
      "date": this.state.date,
      "location": this.state.location
    };
    axios.post('/event/add', payload)
    .then(response => {
      console.log('response from db:', response);
      if (response.data.code === 200) {
        console.log("event added");
        this.setState({
          postSuccess: true
        })
      } else if (response.data.code === 204) {
        console.log('error!');
        console.log('response:', response);
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (this.state.postSuccess) {
      return (<Redirect to={{
        pathname: "/home"
      }} />)
    }
    return (
      <div>
        <Navigation></Navigation>
        <div className="col-sm-8 offset-sm-2 py-3" >
          <h5>New Event Details (Required):</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="activity" className="col-2 col-form-label">Activity</label>
              <div className="col-10">
                <select required name="activity" className="form-control" id="activity" onChange={this.handleInputChange}>
                  <option selected>Hiking</option>
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
                <input required name="title" className="form-control" type="text" id="title" onChange={this.handleInputChange}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-2 col-form-label">Description</label>
              <div className="col-10">
                <textarea required name="description" className="form-control" id="description" rows="3" onChange={this.handleInputChange}></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="location" className="col-2 col-form-label">Location</label>
              <div className="col-10">
                <input required name="location" className="form-control" type="text" id="location" onChange={this.handleInputChange}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="date" className="col-2 col-form-label">Date</label>
              <div className="col-10">
                <input required name="date" className="form-control" type="date" id="date" onChange={this.handleInputChange}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="image_url" className="col-2 col-form-label">Image URL</label>
              <div className="col-10">
                <input required name="image_url" className="form-control" type="url" id="image_url" onChange={this.handleInputChange}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddEvent;
