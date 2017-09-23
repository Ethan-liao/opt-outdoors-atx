import React from 'react';
import Moment from 'react-moment';

class PublicEvent extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   events: {}
  //   // }
  // }

  render() {
    const details = this.props.details;

    const headerStyle = {
      backgroundColor: "#90afc5"
    };

    return (
        <div className="col-sm-8 offset-sm-2 py-3">
          <div className="card">
            <h5 className=" text-center card-header" style={headerStyle}>
              <Moment format="dddd, MMMM Do">{details.date}</Moment>
            </h5>
            <div className="row px-5">
              <div className="col-sm-4 px-3 py-3">
                <img src={details.image_url} className="w-100" alt={details.title}/>
              </div>
              <div className="col-sm-8 px-3">
                <div className="card-block px-3">
                  <h5 className="card-title">{details.title}</h5>
                  <p className="card-text">{details.location}</p>
                  <p className="card-text"><i>Posted <Moment fromNow>{details.created_at}</Moment></i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default PublicEvent;
