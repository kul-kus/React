
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SetApp from './component/set';
import GetApp from './component/get';
import Progressbar from './component/Progressbar';



// import { Provider } from 'react-redux'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'
          render={() =>
            <SetApp />
          }
        />

        <Route exact path='/get'
          render={() =>
            <GetApp />
          }
        />
        <Route exact path='/progress'
          render={() =>
            <Progressbar />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;

