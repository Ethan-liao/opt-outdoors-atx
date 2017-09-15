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
        // console.log("user: ", user);
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

// ####################################################################

// import React from 'react';
// import axios from 'axios';
// import { BrowserRouter, Redirect} from 'react-router-dom';
// import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel  } from 'react-bootstrap'
//
// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.handleSubmit = this.handleSubmit.bind(this);
//
//     this.state = {
//       email:'',
//       pasword:''
//     }
//
//   }
//
//   handleSubmit(event) {
//     event.preventDefault();
//     // console.log('event', event);
//     // first grab the text from the box
//     const email = this.email.value;
//     console.log('email:', email);
//     const password = this.password.value;
//     console.log('password:', password);
//     // second we're going to transition from / to /store/:storeId
//     // this.context.router.transitionTo('/app/1');
//     // this.browserHistory.push('/app/1')
//     // this.props.history.push('/app/1')
//
//     axios.post('/users', {
//         email,
//         password
//       })
//       .then(function (response) {
//         console.log('response: ', response);
//       })
//       .catch(function (error) {
//         console.log('error: ', error);
//       });

// fetch('/users/', {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({email: email, password: password})
// }).then(function(response) {
//   if (response.status >= 400) {
//     throw new Error('Bad respose from server');
//   }
//   // console.log(response.json());
//   return response.json();
// }).then(function(data) {
//   console.log('data: ', data);
//   this.setState({user: data})
// })
// .catch(function(error) {
//   console.error(error);
// });

//   }
//
//   render() {
//     return (
//       <div>
//         <h4>Log In</h4>
//         <form className="" onSubmit={(e) => this.handleSubmit(e)}>
//           <h2>Email</h2>
//           <input type="text" defaultValue="danielisham1@gmail.com" ref={(input) => {
//             this.email = input
//           }}/>
//           <h2>Password</h2>
//           <input type="text" defaultValue="password" ref={(input) => {
//             this.password = input
//           }}/>
//           <button type="submit">Sign In</button>
//         </form>
//         <h4>Register Here</h4>
//       </div>
//     )
//   }
// }

// tell react that login expects something called context
// Login.contextTypes = {
//   router: React.PropTypes.object
// }

// export default Login;
