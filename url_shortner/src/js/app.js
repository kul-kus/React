
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './../js/Home.js';
import ShortUrl from './../js/ShortUrl.js';


// import { Provider } from 'react-redux'

function App() {

   const [longURL, setLURL] = useState(null)
   const [shortURl, setShURL] = useState(null)

   const setSiteData = (surl, lurl) => {
      setShURL(surl)
      setLURL(lurl)
   }

   return (
      <Router>
         <Switch>
            {/* <Route exact path='/' routeData={"sample test"} component={Home} /> */}
            <Route exact path='/'
               render={() =>
                  <Home longURL={longURL} shortURl={shortURl} setSiteData={setSiteData} />
               }
            />
            <Route exact path='/shorturl'
               render={() =>
                  <ShortUrl longURL={longURL} shortURl={shortURl} />
               }
            />
         </Switch>
      </Router>
   );
}

export default App;

