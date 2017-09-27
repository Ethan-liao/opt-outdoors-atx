import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Navigation from './Navigation';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "activity": 'Hiking',
      "title": '',
      "description": '',
      "organizer": '',
      "image_url": '',
      "date": '',
      "location": '',
      "postSuccess": false,
      "redirect": false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    axios.get('/check').then(response => {
      if (response.data.code === 200) {
        // User has access to this page
        this.setState({ redirect: false});
      } else if (response.data.code === 403) {
        // User does not have access to this page"
        this.setState({ redirect : true})
      } else {
        // Unknown error code received
        this.setState({ redirect : true})
      }
    }).catch(function(error) {
      console.log(error);
    });
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
      if (response.data.code === 200) {
        // Event added
        this.setState({
          postSuccess: true
        })
      } else if (response.data.code === 204) {
        // console.log('response:', response);
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

    const buttonStyle = {
      backgroundColor: "#336b87",
      borderColor: "#336b87"
    };

    if (this.state.postSuccess) {
      return (<Redirect to={{
        pathname: "/home"
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
          <div className="row pb-3">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <h3 className="text-center mt-3 mb-3">New Trip Details (Required):</h3>
                <div>
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
                    <button type="submit" className="btn btn-primary" style={buttonStyle}>Submit</button>
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

export default AddEvent;
