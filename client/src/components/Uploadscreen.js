// Add layout main page here
import React from 'react';
import { Media } from 'react-bootstrap'

class UploadScreen extends React.Component {
  render() {
    return (
      <Media>
       <Media.Left>
          <img width={128} height={128} src="https://images.pexels.com/photos/443412/pexels-photo-443412.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" alt=""/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>Event Heading</Media.Heading>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
        </Media.Body>
      </Media>
    )
  }
}

export default Event;
