import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import PublicNavigation from './PublicNavigation';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "email": '',
      "password": '',
      "firstName": '',
      "lastName": '',
      "newPassword": '',
      "newEmail": '',
      "signedIn": false
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(event) {
    event.preventDefault();

    var payload = {
      "first": this.state.firstName,
      "last": this.state.lastName,
      "email": this.state.newEmail,
      "password": this.state.newPassword
    }

    axios.post('/register', payload)
    .then(function(response) {
      if (response.status === 200) {
        alert("Registration successful. Please log in.");
      }
    }).catch(function(error) {
      console.log(error);
      alert("Registration unsuccessful. Please try again.");
    });

    this.setState({
      firstName: '',
      lastName: '',
      newEmail: '',
      newPassword: ''
    })
  }

  handleSignIn(event) {
    event.preventDefault();
    let payload = {
      "email": this.state.email,
      "password": this.state.password
    }

    axios.post('/login', payload)
    .then(response => {
      if (response.data.code === 200) {
        // Login successful
        let user = {
          id: response.data.user.id,
          admin: response.data.user.admin,
          email: response.data.user.email,
          first: response.data.user.first,
          last: response.data.user.last,
        };
        this.setState({
          signedIn:true,
          user: user,
          events: {}
        })
      } else if (response.data.code === 204) {
        alert("username password do not match")
      } else {
        alert("Username does not exist");
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

    if (this.state.signedIn) {
      return (<Redirect to={{
        pathname: "/home",
        state: {
          signedIn: this.state.signedIn,
          user: this.state.user,
          events: {}
        }
      }} />)
    }

    return (
      <div>
        <PublicNavigation></PublicNavigation>
        <div>
          <div></div>
          <div></div>
        </div>
        <div className="col-sm-8 offset-sm-2 py-3">
          <div className="py-3">
            <h5>Sign In:</h5>
            <form onSubmit={this.handleSignIn}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input required name="email" type="text" className="form-control" id="email" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input required name="password" type="password" className="form-control" id="password" onChange={this.handleInputChange}/>
              </div>
              <button type="submit" className="btn btn-primary" style={buttonStyle}>Sign In</button>
            </form>
          </div>
          <div className="py-3">
            <h5>Register:</h5>
            <form onSubmit={this.handleRegister}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input required value={this.state.firstName} ref="firstName" name="firstName" type="text" className="form-control" id="firstName" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input required value={this.state.lastName} name="lastName" type="text" className="form-control" id="lastName" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="newEmail">Email</label>
                <input required value={this.state.newEmail} name="newEmail" type="email" className="form-control" id="newEmail" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Password</label>
                <input required value={this.state.newPassword} name="newPassword" type="password" className="form-control" id="newPassword" onChange={this.handleInputChange}/>
              </div>
              <button type="submit" className="btn btn-primary" style={buttonStyle}>Register</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
