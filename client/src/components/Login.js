import React from 'react';
// import { BrowserRouter, Redirect} from 'react-router-dom';
// import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel  } from 'react-bootstrap'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email:'',
      pasword:''
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('event', event);
    // first grab the text from the box
    const email = this.email.value;
    console.log('email:', email);
    const password = this.password.value;
    console.log('password:', password);
    // second we're going to transition from / to /store/:storeId
    // this.context.router.transitionTo('/app/1');
    // this.browserHistory.push('/app/1')
    // this.props.history.push('/app/1')

    fetch('/users/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad respose from server');
      }
      // console.log(response.json());
      return response.json();
    }).then(function(data) {
      console.log('data: ', data);
      this.setState({user: data})
    })
    .catch(function(error) {
      console.error(error);
    });

  }

  render() {
    return (
      <div>
        <h4>Log In</h4>
        <form className="" onSubmit={(e) => this.handleSubmit(e)}>
          <h2>Email</h2>
          <input type="text" defaultValue="danielisham1@gmail.com" ref={(input) => {
            this.email = input
          }}/>
          <h2>Password</h2>
          <input type="text" defaultValue="password" ref={(input) => {
            this.password = input
          }}/>
          <button type="submit">Sign In</button>
        </form>
        <h4>Register Here</h4>
      </div>
    )
  }
}

// tell react that login expects something called context
// Login.contextTypes = {
//   router: React.PropTypes.object
// }

export default Login;
