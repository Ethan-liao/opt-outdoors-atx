import React from 'react';
// import { BrowserRouter, Redirect} from 'react-router-dom';
// import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel  } from 'react-bootstrap'

class Login extends React.Component {
  // constructor() {
  //   super();
  //   this.goToApp = this.goToApp.bind(this);
  // }

  goToApp(event) {
    event.preventDefault();
    console.log('event', event);
    console.log('You Changed the URL');
    // first grab the text from the box
    const email = this.storeInput.value;
    console.log(email);
    // second we're going to transition from / to /store/:storeId
    // this.context.router.transitionTo('/app/1');
    // this.browserHistory.push('/app/1')
    // console.log(this);
    // return (
    //   <Redirect to='/app/1' push />
    // )
    this.props.history.push('/app/1')
  }

  render() {
    return (
      <div>
        <h4>Log In</h4>
        <form className="" onSubmit={(e) => this.goToApp(e)}>
          <h2>Email</h2>
          <input type="text" defaultValue="example@example.com" ref={(input) => { this.storeInput = input}}/>
          <h2>Password</h2>
          <input type="text" />
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
