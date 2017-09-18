import React from 'react';

import Navigation from './Navigation';
import Main from './Main';

class App extends React.Component {
  constructor() {
    super();
    }

  state = {
    login: false,
    user: {},
    events: {}
  }

  render() {
    return (
      <div>
        <Navigation {...this.state}/>
        <Main {...this.state}/>
      </div>
    )
  }
}

export default App;
