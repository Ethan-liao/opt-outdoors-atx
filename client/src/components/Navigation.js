import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   state: this.props
    // }
  }

  render() {
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
                <a className="nav-link" href="">Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation;
