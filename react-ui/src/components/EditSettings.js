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
        let user = response.data.user[0];
        this.setState({
          user: user,
          first: user.first,
          last: user.last,
          email: user.email
        });
      } else if (response.data.code === 403) {
        // User not authorized to view page
        this.setState({ redirect : true })
      } else {
        console.log("There was an error retrieving data");
      }})
      .catch(error => {
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
      if (response.data.code === 200) {
        // User edited
        this.setState({ submit: true })
      } else if (response.data.code === 204) {
        // Error making change to the user
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
                <h3 className="text-center mt-3 mb-3">Account Details:</h3>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <label htmlFor="first" className="col-2 col-form-label">First Name</label>
                      <div className="col-10">
                        <input required value={this.state.first} name="first" className="form-control" type="text" id="first" onChange={this.handleInputChange}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="last" className="col-2 col-form-label">Last Name</label>
                      <div className="col-10">
                        <input required value={this.state.last} name="last" className="form-control" type="text" id="last" onChange={this.handleInputChange}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="email" className="col-2 col-form-label">Email</label>
                      <div className="col-10">
                        <input required value={this.state.email} name="email" className="form-control" type="email" id="email" onChange={this.handleInputChange}/>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2" style={buttonStyle}>Submit Changes</button>
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

export default EditSettings;
