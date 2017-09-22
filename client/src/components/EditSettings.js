import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Navigation from './Navigation';

class EditSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "user": {},
      "first": '',
      "last": '',
      "email": '',
      "submit": false,
      "redirect": false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount() {
    axios.get('/user').then(response => {
      if (response.data.code === 200) {
        console.log('user response:', response);
        let user = response.data.user[0];
        this.setState({
          user: user,
          first: user.first,
          last: user.last,
          email: user.email
        });
      } else if (response.data.code === 403) {
        console.log('user not authorized to view page', );
        this.setState({ redirect : true })
      } else {
        console.log("There was an error retrieving data");
      }})
      .catch(error => {
      console.log('error on mount:', error);
      this.setState({ redirect : true })
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let payload = {
      first : this.state.first,
      last : this.state.last,
      email : this.state.email,
      id: this.state.user.id
    };

    axios.patch('/user', payload)
    .then(response => {
      console.log('response from db:', response);
      if (response.data.code === 200) {
        console.log("user edited");
        this.setState({ submit: true })
      } else if (response.data.code === 204) {
        console.log('Error making change to the user', response);
      } else if (response.data.code === 403) {
        console.log('403 response', response);
        this.setState({ redirect : true })
      } else {
        console.log('User not authorized to make changes');
        this.setState({ redirect: true })
      }
    }).catch(error => {
      console.log('error on patch:', error);
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
    if (this.state.submit) {
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
        <div>
          Account Details:
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="first" className="col-2 col-form-label">First Name</label>
              <div className="col-10">
                <input required value={this.state.first} name="first" className="form-control" type="text" id="title" onChange={this.handleInputChange}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="last" className="col-2 col-form-label">Last Name</label>
              <div className="col-10">
                <input required value={this.state.last} name="last" className="form-control" type="text" id="title" onChange={this.handleInputChange}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-2 col-form-label">Email</label>
              <div className="col-10">
                <input required value={this.state.email} name="email" className="form-control" type="text" id="location" onChange={this.handleInputChange}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mr-2">Submit Changes</button>
            <button onClick={this.handleCancel} type="button" className="btn btn-primary">Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

export default EditSettings;
