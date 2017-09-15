import React from 'react';
// import { Popover } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
// import { Tooltip } from 'react-bootstrap';
// import { Modal } from 'react-bootstrap';
// import { Modal.Header } from 'react-bootstrap';
// import { Modal.Title } from 'react-bootstrap';
// import { Modal.Body } from 'react-bootstrap';
// import { Modal.Footer } from 'react-bootstrap';
// import { OverlayTrigger } from 'react-bootstrap';

import Example from './eventModal';

class Event extends React.Component {

  // constructor(props) {
  //   super(props);

    // this.close = this.close.bind(this);
    // this.open = this.open.bind(this);

    // this.state = {showModal: false};
  // }

  // getInitialState() {
  //   return { showModal: false };
  // }

  // close() {
  //   console.log('close hit');
  //   this.setState({ showModal: false });
  // }
  //
  // open() {
  //   console.log('open hit');
  //   this.setState({ showModal: true });
  // }

  render() {
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = (
    //   <Tooltip id="modal-tooltip">
    //     wow.
    //   </Tooltip>
    // );

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
              <p className="card-text"><small className="text-muted">Additional Info</small></p>
              <Example details={details}></Example>
              {/* <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.open}
              >
                Launch demo modal
              </Button>

              <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Text in a modal</h4>
                  <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                  <h4>Popover in a modal</h4>
                  <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                  <h4>Tooltips in a modal</h4>
                  <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                  <hr />

                  <h4>Overflowing text to show scroll behavior</h4>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                  <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                  <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                  <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
              </Modal> */}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

// const style = {
//   width: '45vw'
//   // height: '50vw'
// };

export default Event;
