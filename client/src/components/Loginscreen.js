// This page acts a container to switch between login and register components
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import Register from './Register';

class Loginscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginscreen: [],
      loginmessage: '',
      buttonLabel: 'Register',
      isLogin: true
    }
  }

  componentWillMount() {
    var loginscreen = [];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "Not registered yet?";
    this.setState({loginscreen: loginscreen, loginmessage: loginmessage})
  }

  handleClick(event) {
    let loginmessage;
    if (this.state.isLogin) {
      let loginscreen = [];
      loginscreen.push(<Register parentContext={this} appContext={this.props.parentContext}/>);
      loginmessage = "Already registered? Go to Login";
      this.setState({loginscreen: loginscreen, loginmessage: loginmessage, buttonLabel: "Login", isLogin: false})
    } else {
      let loginscreen = [];
      loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
      loginmessage = "Not Registered yet? Go to Registration";
      this.setState({loginscreen: loginscreen, loginmessage: loginmessage, buttonLabel: "Register", isLogin: true})
    }
  }

  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <MuiThemeProvider>
            <div>
              <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15
};

export default Loginscreen;
