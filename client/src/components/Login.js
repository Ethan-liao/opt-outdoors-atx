import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
        console.log("Login successful");
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
        console.log("Username password do not match");
        alert("username password do not match")
      } else {
        console.log("Username does not exist");
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
        <div>
          Sign In:
          <form onSubmit={this.handleSignIn}>
            <div className="form-group">
              <label for="formGroupExampleInput">Email</label>
              <input name="email"type="text" className="form-control" id="formGroupExampleInput" placeholder="test@gmail.com" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Password</label>
              <input name="password" type="text" className="form-control" id="formGroupExampleInput2" onChange={this.handleInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div>
          Register:
          <form>
            <div className="form-group">
              <label for="formGroupExampleInput">First Name</label>
              <input name="firstName" type="text" className="form-control" id="formGroupExampleInput" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Last Name</label>
              <input name="lastName" type="text" className="form-control" id="formGroupExampleInput" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Email</label>
              <input name="newEmail" type="text" className="form-control" id="formGroupExampleInput" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Password</label>
              <input name="newPassword" type="text" className="form-control" id="formGroupExampleInput2" onChange={this.handleInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
