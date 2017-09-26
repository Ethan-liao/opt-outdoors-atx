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
        <div className="row py-2">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="card">
              <h5 className=" text-center card-header" style={headerStyle}>
                <Moment format="dddd, MMMM Do">{details.date}</Moment>
              </h5>
              <div className="row pt-3 px-5">
                <div className="col-sm-8">
                  <div>
                    <h4 className="card-title pb-2">{details.title}</h4>
                    <h5 className="card-text pb-2">{details.location}</h5>
                    <h6 className="card-text pb-2">Primary Activity: {details.activity}</h6>
                    <p><i>Posted <Moment fromNow>{details.created_at}</Moment></i></p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <img src={details.image_url} className="w-100" alt={details.title}/>
                </div>
              </div>
              <div className="py-1 px-5">
                <p><strong>Description:</strong></p>
                <p>{details.description}</p>
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
