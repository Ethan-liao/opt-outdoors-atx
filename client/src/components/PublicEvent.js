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

    return (
      <div>
        {/* <div className="col-sm-6">
          <div className="card mb-3">
            <div className="card-header">
              {details.date}
            </div>
            <img className="card-img-top" src={details.image_url} alt={details.name} />
            <div className="card-block">
              <h4 className="card-title">{details.title}</h4>
              <p className="card-text">{details.description}</p>
            </div>
          </div>
        </div> */}
        <div className="container col-sm-9 py-3">
          <div className="card">
            <h5 className=" text-center card-header">
              <Moment format="dddd, MMMM Do">{details.date}</Moment>
            </h5>
            <div className="row px-5">
              <div className="col-sm-4 px-3 py-3">
                <img src={details.image_url} className="w-100"/>
              </div>
              {/* <div className="col-sm-3 py-2">
                <p className="align-middle text-center card-text"><Moment format="dddd">{details.date}</Moment></p>
                <p className="align-middle text-center card-text"><Moment format="MMMM Do">{details.date}</Moment></p>
              </div> */}
              <div className="col-sm-8 px-3">
                <div className="card-block px-3">
                  <h5 className="card-title">{details.title}</h5>
                  {/* <p><strong>Description</strong></p> */}
                  <p className="card-text">{details.location}</p>
                  <p className="card-text"><i>Posted <Moment fromNow>{details.created_at}</Moment></i></p>
                  {/* <a href="#" className="btn btn-primary">Read More</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default PublicEvent;
