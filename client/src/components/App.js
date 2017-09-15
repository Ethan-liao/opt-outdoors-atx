import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

import '../App.css';
import Loginscreen from './Loginscreen'
injectTapEventPlugin();

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      events:{},
      loginPage:[],
      mainScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.mainScreen}
      </div>
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import '../App.css';
// import Event from './Event';
// import { Navbar, Nav, NavItem, ButtonToolbar, Button } from 'react-bootstrap';
//
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Navbar inverse collapseOnSelect>
//           <Navbar.Header>
//             <Navbar.Brand>
//               <a>Opt Outdoors ATX</a>
//             </Navbar.Brand>
//             <Navbar.Toggle />
//           </Navbar.Header>
//           <Navbar.Collapse>
//             <Nav pullRight>
//               <NavItem eventKey={1} href="#">My Events</NavItem>
//               <NavItem eventKey={2} href="#">Add Event</NavItem>
//               <NavItem eventKey={2} href="#">Settings</NavItem>
//               <NavItem eventKey={2} href="#">Log Out</NavItem>
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar>
//         <h3>Filter:</h3>
//         <ButtonToolbar>
//           <Button>Hiking</Button>
//           <Button>Mountain Biking</Button>
//           <Button>Road Biking</Button>
//           <Button>Trail Running</Button>
//           <Button>Climbing</Button>
//           <Button>Camping</Button>
//         </ButtonToolbar>
//         <h3>Upcoming Events:</h3>
//         <Event></Event>
//
//       </div>
//     );
//   }
// }
//
// // Code from Eric Sowell tutorial:
//
// // class App extends Component {
// //   state = {users: []}
// //
// //   componentDidMount() {
// //     fetch('/users')
// //       .then(res => res.json())
// //       .then(users => this.setState({ users }));
// //   }
// //
// //   render() {
// //     return (
// //       <div className="App">
// //         <h1>Users</h1>
// //         {this.state.users.map(user =>
// //           <div key={user.id}>{user.username}</div>
// //         )}
// //       </div>
// //     );
// //   }
// // }
//
// export default App;
