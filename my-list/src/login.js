
import React from 'react';
import ReactDOM from 'react-dom';

import {react, Component } from 'react';
import { Nav,Navbar, Jumbotron, Button , Alert, Label,Form} from 'react-bootstrap';
import { NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { FormGroup,FormControl} from 'react-bootstrap';

import {Modal} from 'react-bootstrap';
import styles from './login_signup.css'
import { Link } from 'react-router-dom'

class Login extends React.Component {

render() {

    var singup_style={
        display: 'inline-block',
    width: '90%',
    alignItems: 'center',
    padding: 25,
    paddingTop: 15,
    borderRadius: 15,
    border: '1px solid #8c8888'
    };

       var member = {
            color: 'red',
            fontSize: 18,
            marginTop: 6
          };

          var logo = {
            color: '#dedede',
            fontSize: 50,
            marginTop: 6,
            fontWeight:'bold'

          };

      return (

        <div id="main">
      <div id="nav">

            <div class="navigation">

                <Navbar inverse collapseOnSelect>
                      <Navbar.Brand>
                        <a href="#home" style={logo}>My-List</a>
                      </Navbar.Brand>
                      <Nav pullRight>
                        <NavItem eventKey={1} style={member}>
                            Join Us Now! 
                        </NavItem>
                        <NavItem eventKey={2}>
                         <Link to={'/Signup'}>
                          <Button bsStyle="primary" style={{height:35,width: 100,fontSize:18}}>
                          Sign Up
                          </Button>
                        </Link> 
                        </NavItem>
                      </Nav>

              
                </Navbar>

          </div>
      </div>

      <div id="bottom_back">
          <div id="image">
           
          </div>

          <div id="signup_page">

           <div class="login" style={singup_style}>

                    
                      <div class="heading">
                      <h2 style={{padding:15,paddingTop:15,color:'#2d2c2c'}}>Login</h2>
                         <p class="lead">Connect with a social network</p> 
                      </div>  

                        <div class="social_btn" style={{width:'100%'}}>
                        <Link to={'/UserHome'} style={{width:'100%'}}>
                            <input style={{width:'85%',marginLeft:30,float:'left'}} type="button" class="btn btn-danger" value="Google" />
                        </Link>
                        </div>

                        <hr style={{backgroundColor:'rgba(204, 200, 200, 0.56)'}}/>

                      <div class="heading" style={{marginBottom:30}}>
                         <p class="lead">Login in with your email address</p>
                      </div>

                       <form style={{display:'flow-root'}}>


                     <div class="messagealert" id="alert_container">
                     </div>

                  

                        <div class="form-group">
                          <label for="usr">Email</label>
                          <input type="email" class="form-control" id="mail" required/>
                             
                        </div>
                        
                        <div class="form-group">
                          <label for="usr" id="lblResult" >Password</label>
                          <input type="password" class="form-control"  id="pass" minlength="6" required/>
                        </div>
     
                      <div class="active">
                          <input type="submit" value="Log In" class="btn btn-info"  Text="Log In" style={{width:100,marginBottom:0}}/>
    
                      </div>
                    </form>

                </div>
          </div>
      </div>

    <div id="main_footer">
    </div>
    </div>

      
      );



    }
}
  export default Login;