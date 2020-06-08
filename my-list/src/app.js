import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import Signup from './signup.js';
import Login from './login.js';
import UserHome from './user_home.js';
import UserProfile from './user_profile.js'

class App extends Component {
   render() {
      return (
         <Router>
  
               <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/Signup' component={Signup} />
                  <Route exact path='/UserHome' component={UserHome} />
                  <Route exact path='/UserProfile' component={UserProfile} />
               </Switch>
         </Router>
      );
   }
}
export default App;