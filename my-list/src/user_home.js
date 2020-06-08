
import React from 'react';
import ReactDOM from 'react-dom';

import { react, Component } from 'react';
import { Nav, Navbar, Jumbotron, Button, Alert, Label, Form, Glyphicon } from 'react-bootstrap';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FormGroup, FormControl, Image, Panel, PanelGroup } from 'react-bootstrap';

import { Modal } from 'react-bootstrap';

import styles from './user_home.css'

import { Link } from 'react-router-dom'

import AddNote from './add_note.js'

class UserHome extends React.Component {

  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.value = ["success", "primary", "warning", "danger"];
  }


  render() {

    var singup_style = {
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
      fontWeight: 'bold'

    };

    var panel = {
      width: '600px',
      margin: 'auto',
      marginBottom: '10px'
    }

    var note_del_btn = {
      padding: '2px 5px',
      marginLeft: '350px',
      border: 'none',
      fontSize: '20px',
      backgroundColor: '#9acd3200',
      padding: '2px 5px 2px 5px'
    }



    return (

      <div id="main" style={{ backgroundColor: 'white' }}>
        <div id="nav">

          <div class="navigation">

            <Navbar inverse collapseOnSelect>
              <Navbar.Brand>
                <a href="#home" style={logo}>My-List</a>
              </Navbar.Brand>
              <Nav pullRight>
                <NavItem eventKey={1} style={{}}>
                  <AddNote isEdit={false}/>

                </NavItem>


                <NavItem eventKey={2}>
                  <NavDropdown eventKey={3} title="kuldeep kushwaha" id="basic-nav-dropdown" style={{ color: 'white' }}>
                    <MenuItem eventKey={3.1}>
                      <Link to={'/UserHome'} style={{ color: '#232222' }}><Glyphicon glyph="list-alt" /> My list</Link>
                    </MenuItem>


                    <MenuItem eventKey={3.2}>
                      <Link to={'/UserProfile'} style={{ color: '#232222' }}><Glyphicon glyph="user" /> Profile </Link>
                    </MenuItem>

                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>
                      <Link to={'/'} style={{ color: '#232222' }}><Glyphicon glyph="log-out" /> Logout</Link>
                    </MenuItem>
                  </NavDropdown>
                </NavItem>

                <NavItem eventKey={3} style={member}>
                  <Image src="./image/user.png" circle style={{ width: 45, height: 45, marginTop: -10 }} />
                </NavItem>
              </Nav>

            </Navbar>

          </div>

        </div>



        <div id="todolist_back">

          <div class="container">
            <div class="row">

              <div class="col-sm-12" style={{}}>


                <PanelGroup accordion id="accordion-example">


                  <Panel bsStyle={this.value[Math.floor((Math.random() * this.value.length) + 0)]} eventKey="1" style={panel} >
                    <Panel.Heading>
                      <Panel.Title toggle>Collapsible Group Item #1
                      <Button onClick={() => alert("delete")} style={note_del_btn} >
                          <Glyphicon glyph="remove" />
                        </Button>
                      </Panel.Title>

                    </Panel.Heading>

                    <Panel.Body collapsible>

                      <label>
                        <input type="checkbox" name="vehicle" value="Bike" /> I have a bike
                         <span style={{ marginLeft: '50px' }}>
                          <Button style={{ padding: '2px 5px 2px 5px' }}><Glyphicon glyph="remove" />
                          </Button>
                        </span>
                      </label>
                      <br />

                      <label>
                        <input type="checkbox" name="vehicle" value="Bike" /> I have a bike
                         <span style={{ marginLeft: '50px' }}>
                          <Button style={{ padding: '2px 5px 2px 5px' }}><Glyphicon glyph="remove" />
                          </Button>
                        </span>
                      </label>
                      <br />

                      <label>
                        <input type="checkbox" name="vehicle" value="Bike" /> I have a bike
                         <span style={{ marginLeft: '50px' }}>
                          <Button style={{ padding: '2px 5px 2px 5px' }}><Glyphicon glyph="remove" />
                          </Button>
                        </span>
                      </label>
                      <br />

                    </Panel.Body>
                  </Panel>









                </PanelGroup>




              </div>

            </div>


          </div>
        </div>


        <div id="">
        </div>
      </div>


    );



  }
}
export default UserHome;