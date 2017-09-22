import React from 'react';
import {Link} from 'react-router-dom';

class EventAttending extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    const details = this.props.details;

    return (
      <div>
        <div className="col-sm-6">
          <div className="card mb-3">
            <div className="card-header">
              {details.activity}
            </div>
            <img className="card-img-top" src={details.image_url} alt={details.name} />
            <div className="card-block">
              <h4 className="card-title">{details.title}</h4>
              <p className="card-text">{details.description}</p>
              <Link to={`/event/${details.id}`} id={details.id} className="nav-link">Event Page</Link>
              <button className="btn btn-primary" onClick={() => this.props.removeMe(details.id)}>Remove Me</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventAttending;
