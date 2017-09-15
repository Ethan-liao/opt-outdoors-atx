import React from 'react';
// import { Media } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class Event extends React.Component {
  render() {
    const details = this.props.details;

    return (
      <div>
        <img src={details.image_url} alt={details.name} />
        <p>{details.title}</p>
        <p>{details.location}</p>
        <p>{details.date}</p>
        <p>{details.description}</p>
        <p>{details.organizer}</p>
      </div>
      // <Media>
      //  <Media.Left>
      //     <img width={128} height={128} src="https://images.pexels.com/photos/443412/pexels-photo-443412.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" alt=""/>
      //   </Media.Left>
      //   <Media.Body>
      //     <Media.Heading>Event Heading</Media.Heading>
      //     <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
      //   </Media.Body>
      // {/* </Media> */}


      // <div>
      //   <MuiThemeProvider>
      //     <div>
      //       <Card style={style}>
      //         <CardHeader
      //           title="URL Avatar"
      //           subtitle="Subtitle"
      //           avatar=""
      //         />
      //         <CardMedia
      //           overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
      //           >
      //             <img src="https://images.pexels.com/photos/443412/pexels-photo-443412.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" alt="" />
      //           </CardMedia>
      //           <CardTitle title="Card title" subtitle="Card subtitle" />
      //           <CardText>
      //             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      //             Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      //             Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      //             Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      //           </CardText>
      //           <CardActions>
      //             <FlatButton label="Action1" />
      //             <FlatButton label="Action2" />
      //           </CardActions>
      //         </Card>
      //     </div>
      //   </MuiThemeProvider>
      // </div>
    )
  }
}

const style = {
  width: '50vw',
  height: '50vw'
};

export default Event;
