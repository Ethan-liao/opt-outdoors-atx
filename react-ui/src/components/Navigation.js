import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      goHome: false
    }
    this.logout = this.logout.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  logout(e) {
    e.preventDefault();
    axios.get('/logout')
    .then(response => {
      if (response.data.code === 200) {
        // User has logged out successfully
        this.setState({ redirect : true})
      } else {
        console.log("Unknown error code received. Redirect to public");
        this.setState({ redirect : true})
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  goHome(e) {
    e.preventDefault();
    this.setState({goHome : true})
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: "/"
      }} />)
    }

    if (this.state.goHome) {
      return (<Redirect to={{
        pathname: "/home"
      }} />)
    }

    const navStyle = {
      backgroundColor: "#763626"
    };

    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse" style={navStyle}>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/home" className="navbar-brand">Opt Outdoors ATX</Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/add" className="nav-link">Add Event</Link>
              </li>
              <li className="nav-item dropdown">
                 <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   My Events
                 </a>
                 <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                   <Link to="/organized" className="dropdown-item">Organizer</Link>
                   <Link to="/attending" className="dropdown-item">Attendee</Link>
                 </div>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">My Account</Link>
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
