
import React from 'react';
import ReactDOM from 'react-dom';

import {react, Component } from 'react';
import { Nav,Navbar, Jumbotron, Button , Alert, Label,Form} from 'react-bootstrap';
import { NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { FormGroup,FormControl} from 'react-bootstrap';

import {Modal } from 'react-bootstrap';

import Login from './login.js';

class Naviagtion_bar extends React.Component {

    render() {
        var member = {
            color: 'red',
            fontSize: 18,
            marginTop: 14
          };

          var logo = {
            color: '#dedede',
            fontSize: 60,
            marginTop: 14,
            fontWeight:'bold'

          };

      return (
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
                <Button bsStyle="primary" style={{height:50,width: 100,fontSize: 20}}>Login</Button>
                </NavItem>
              </Nav>
      
        </Navbar>

      </div>

      );
    }
  }


  export default Naviagtion_bar;