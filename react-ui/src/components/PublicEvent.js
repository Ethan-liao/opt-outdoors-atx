import React from 'react';
import Moment from 'react-moment';

class PublicEvent extends React.Component {

  render() {
    const details = this.props.details;

    const headerStyle = {
      backgroundColor: "#90afc5"
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
              <div className="row py-3 px-5">
                <div className="col-sm-8">
                  <div>
                    <h4 className="card-title">{details.title}</h4>
                    <h5 className="card-text">{details.location}</h5>
                    <h6 className="card-text">Primary Activity: {details.activity}</h6>
                    <p><i>Posted <Moment fromNow>{details.created_at}</Moment></i></p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <img src={details.image_url} className="w-100" alt={details.title}/>
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

export default PublicEvent;
