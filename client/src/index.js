import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// ###################################
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import './index.css';
// import App from './components/App';
// // import registerServiceWorker from './registerServiceWorker';
//
// import Login from './components/Login';
// import NotFound from './components/NotFound';
//
// // Stateless component
// const Root = () => {
//   return (
//     <BrowserRouter>
//       <div className="container">
//         <Switch>
//           <Route path="/" exact component={Login} />
//           <Route path="/app/:id" exact component={App} />
//           <Route component={NotFound} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   )
// }
//
// ReactDOM.render(<Root />, document.getElementById('root'));
//
// // registerServiceWorker();
