
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './js/components/Home.js';
import ShortUrl from './js/components/ShortUrl.js';




function App() {
   return (
      <Router>
         <Switch>
            <Route exact path='/'
               render={() => <Home />}
            />
            <Route exact path='/shorturl'
               render={() => <ShortUrl />}
            />
         </Switch>
      </Router>
   );
}

export default App;

