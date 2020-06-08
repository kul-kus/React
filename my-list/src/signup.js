
import React from 'react';
import ReactDOM from 'react-dom';

import {react, Component } from 'react';
import { Nav,Navbar, Jumbotron, Button , Alert, Label,Form} from 'react-bootstrap';
import { NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { FormGroup,FormControl} from 'react-bootstrap';

import {Modal} from 'react-bootstrap';
 
import styles from './login_signup.css'

import { Link } from 'react-router-dom'

class Signup extends React.Component {

render() {

    var singup_style={
        display: 'inline-block',
        width: '90%',
        alignItems: 'center',
        padding: 15,
        'borderRadius': 15,
        border: '1px solid #8c8888'
    }

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
                            Already a member? 
                        </NavItem>
                        <NavItem eventKey={2}>
                        <Link to='/'>
                          <Button bsStyle="primary" style={{height:35,width: 100,fontSize: 20,paddingTop: '3px'}}> 
                              Login
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

          <div id="signup_page"style={{marginBottom:'40px'}}>

           <div class="login" style={singup_style}>

                     <div class="heading" style={{marginBottom:30}}>
                        <h2 style={{textAlign:'center',color:'#2d2c2c'}}>Become a Member</h2>
                    </div>

                       <form runat="server" contenteditable="false">


                     <div class="messagealert" id="alert_container">
                     </div>


                        <div class="form-group">
                          <label for="usr">Full Name</label>
                          <input type="text" class="form-control" id="usr" required/>
                        </div>

                        <div class="form-group">
                          <label for="usr">Email</label>
                          <input type="email" class="form-control" id="mail" required/>
                             
                        </div>
                        
                        <div class="form-group">
                          <label for="usr" id="lblResult" >Password</label>
                          <input type="password" class="form-control"  id="pass" minlength="6" required/>
                        </div>

                        <div class="form-group">
                          <label for="usr" id="lblResult" >Confirm Password</label>
                          <input type="password" class="form-control"  id="pass" minlength="6" required/>
                        </div>

                   <div class="g-recaptcha" data-sitekey="6LczKVcUAAAAAOU7HHLv6VfzGejOK4iHEnCwpBIr"></div>  
                     

                   
                      <div class="active">
                          <input type="submit" class="btn btn-info"  Text="Log In" style={{width:100,marginBottom:20}} />
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
  export default Signup;