
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './../js/Home.js';
import ShortUrl from './../js/ShortUrl.js';


function App() {
   return (
      <Router>
         <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/shorturl' component={ShortUrl} />
            <Route path="*" component={Home} />
         </Switch>
      </Router>
   );
}

export default App;

