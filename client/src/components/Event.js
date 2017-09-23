import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class Event extends React.Component {

  render() {
    const details = this.props.details;

    const headerStyle = {
      backgroundColor: "#90afc5"
    };

    const buttonStyle = {
      backgroundColor: "#336b87",
      borderColor: "#336b87"
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
                    <h5 className="card-title">{details.title}</h5>
                    <p className="card-text">{details.location}</p>
                    <p className="card-text">{details.description}</p>
                    <p className="card-text"><i>Posted <Moment fromNow>{details.created_at}</Moment></i></p>
                  </div>
                </div>
                <div className="col-sm-4 px-1 py-3">
                  <img src={details.image_url} className="w-100" alt={details.title}/>
                </div>
              </div>
              <div className="px-3 py-3">
                <Link to={`/event/${details.id}`} id={details.id} className="btn btn-block btn-primary" style={buttonStyle}>Additional Info</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    )
  }
}

export default Event;
