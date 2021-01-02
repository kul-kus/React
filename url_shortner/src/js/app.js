
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './../js/Home.js';
import ShortUrl from './../js/ShortUrl.js';


function App() {



   const [longURL, setLURL] = useState(null)
   const [shortURl, setShURL] = useState(null)
   // [formData["url"], setUrl] = useState("");

   // let siteData = {

   // }


   const setSiteData = (surl, lurl) => {
      setLURL(lurl)
      setShURL(surl)
      console.log("======siteData=====>", longURL, shortURl)
   }

   // useEffect(() => {
   // }, [longURL, shortURl])
   return (
      <Router>
         <Switch>
            {/* <Route exact path='/' routeData={"sample test"} component={Home} /> */}
            <Route exact path='/'
               render={() =>
                  <Home setSiteData={setSiteData} />
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

