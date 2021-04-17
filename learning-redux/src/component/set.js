



import LinearProgress from '@material-ui/core/LinearProgress'
import React, { useState, useEffect } from 'react';


import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, islogged, thunk_fun, saveState } from "./../actions"
import store from "./../store"
import { Redirect, useHistory } from 'react-router-dom';

import CustomProgressBar from "./Progressbar"
import FixedProgressbar from "./FixedProgressbar"
import MyForm from "./Form"









function SetApp() {
  const dispatch = useDispatch()
  const { counter, isLogged } = useSelector((state) => state)
  // console.log("App -> counter", counter)
  let AllState = useSelector((state) => state)
  // console.log("App -> AllState", AllState)
  // console.log("getState -=====>", store.getState())

  const history = useHistory();

  const styles = props => ({
    colorPrimary: {
      backgroundColor: '#00695C',
    },
    barColorPrimary: {
      backgroundColor: '#B2DFDB',
    }
  });
  // const { classes } = this.props;

  let [showrogressBar, setProgressBar] = useState(false)
  return (
    <div className="App">

      <h1 style={{ fontFamily: 'Train One' }}> ESY URL </h1>
      <h1> Hello {counter}</h1>

      <button onClick={() => dispatch(increment())}>   +   </button>
      <button onClick={() => dispatch(decrement())}>   -   </button>
      <button onClick={() => dispatch(islogged())}>   Sign IN  </button><br></br>
      <button onClick={() => dispatch(thunk_fun(2))}>   Thunk Function  </button>
      <button onClick={() => history.push('/get')}>  GOTO  GET PAGE  </button>
      <button onClick={() => { setProgressBar(!showrogressBar) }}>SHOW PROGRESS BAR </button>
      {/* <LinearProgress {...this.props} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/> */}

      {isLogged ? <h1>Valueable Information shouldn't see </h1> : ""}
      {
        showrogressBar ? <CustomProgressBar /> : <FixedProgressbar />
      }
      <br></br>

      <MyForm></MyForm>

    </div>
  );
  // })
}

export default SetApp;
