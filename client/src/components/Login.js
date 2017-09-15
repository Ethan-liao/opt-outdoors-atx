import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import MainScreen from './MainScreen';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleClick(event) {
    event.preventDefault();
    var self = this;
    var payload = {
      "email": this.state.email,
      "password": this.state.password
    }

    axios.post('/login', payload)
    .then(function(response) {
      if (response.data.code === 200) {
        console.log("Login successful");
        let user = {
          id: response.data.user.id,
          admin: response.data.user.admin,
          email: response.data.user.email,
          first: response.data.user.first,
          last: response.data.user.last,
        };
        var mainScreen = [];
        mainScreen.push(<MainScreen appContext={self.props.appContext} user={user}/>)
        self.props.appContext.setState({loginPage: [], mainScreen: mainScreen})
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

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Opt Outdoors ATX"/>
            <TextField hintText="Enter your Email" floatingLabelText="Email" onChange= {(event,newValue) => this.setState({email:newValue})}/>
            <br/>
            <TextField type="password" hintText="Enter your Password" floatingLabelText="Password" onChange= {(event,newValue) => this.setState({password:newValue})}/>
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Login;
