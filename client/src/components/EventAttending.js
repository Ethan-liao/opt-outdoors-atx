import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class EventAttending extends React.Component {

  render() {
    const details = this.props.details;

    const headerStyle = {
      backgroundColor: "#90afc5"
    };

    const buttonStyle = {
      backgroundColor: "#336b87",
      borderColor: "#336b87"
    };

    const buttonStyle2 = {
      backgroundColor: "#283132",
      borderColor: "#283132"
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10 py-3">
            <div className="card">
              <h5 className=" text-center card-header" style={headerStyle}>
                <Moment format="dddd, MMMM Do">{details.date}</Moment>
              </h5>
              <div className="row px-5">
                <div className="col-sm-8 px-3">
                  <div className="card-block px-3">
                    <h4 className="card-title pb-2">{details.title}</h4>
                    <h5 className="card-text pb-2">{details.location}</h5>
                    <h6 className="card-text pb-2">Primary Activity: {details.activity}</h6>
                    <p className="card-text">{details.description}</p>
                  </div>
                </div>
                <div className="col-sm-4 px-1 py-3">
                  <Link to={`/event/${details.id}`} id={details.id} className="btn btn-block btn-success mb-1" style={buttonStyle}>Go To Event Page</Link>
                  <button className="btn btn-block btn-danger mb-1" onClick={() => this.props.removeMe(details.id)}  style={buttonStyle2}>Remove Me From Event</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    )
  }
}

export default EventAttending;
