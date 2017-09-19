import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    axios.get('/logout')
    .then(response => {
      if (response.data.code === 200) {
        console.log("User has logged out");
        this.setState({ redirect : true})
      } else {
        console.log("Unknown error code received");
        this.setState({ redirect : true})
      }
    }).catch(function(error) {
      console.log(error);
    });
    }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/"
      }} />)
    }

    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="">Opt Outdoors ATX</a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="">Add Event</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">My Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">Settings</a>
              </li>
              <li className="nav-item">
                <a onClick={this.logout} className="nav-link" href="">Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation;
