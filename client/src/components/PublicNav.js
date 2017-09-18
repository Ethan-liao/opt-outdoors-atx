import React from 'react';

class PublicNav extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //
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
                <a className="nav-link" href="">Sign In</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default PublicNav;
