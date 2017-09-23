import React from 'react';
import { Link } from 'react-router-dom';

class PublicNavigation extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   state: this.props
  //   // }
  // }

  render() {

    const navStyle = {
      backgroundColor: "#763626"
    };

    return (
      <div>
          <nav className="navbar navbar-toggleable-md navbar-inverse" style={navStyle}>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/" className="navbar-brand">Opt Outdoors ATX</Link>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Sign In</Link>
                </li>
              </ul>
            </div>
          </nav>
      </div>
    )
  }
}

export default PublicNavigation;
