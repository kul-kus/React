
import React from 'react';
import ReactDOM from 'react-dom';

import { react, Component } from 'react';
import { Nav, Navbar, Jumbotron, Button, Alert, Label, Form, Glyphicon } from 'react-bootstrap';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FormGroup, FormControl, Image, Panel, PanelGroup } from 'react-bootstrap';

import { Modal } from 'react-bootstrap';

import styles from './user_home.css';
import st from './user_profile.css';

import { Link } from 'react-router-dom';

import AddNote from './add_note.js';

class UserProfile extends React.Component {

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



        return (

            <div id="main" style={{ backgroundColor: 'white' }}>
                <div id="nav">

                    <div class="navigation">

                        <Navbar inverse collapseOnSelect>
                            <Navbar.Brand>
                                <a href="#home" style={logo}>My-List</a>
                            </Navbar.Brand>
                            <Nav pullRight>



                                <NavItem eventKey={2}>
                                    <NavDropdown eventKey={3} title="kuldeep kushwaha" id="basic-nav-dropdown" style={{ color: 'white' }}>
                                        <MenuItem eventKey={3.1}>
                                            <Link to={'/UserHome'} style={{color:'#232222'}}><Glyphicon glyph="list-alt" /> My list</Link>
                                        </MenuItem>


                                        <MenuItem eventKey={3.2}>
                                            <Link to={'/UserProfile'} style={{color:'#232222'}}><Glyphicon glyph="user" /> Profile </Link>
                                        </MenuItem>

                                        <MenuItem divider />
                                        <MenuItem eventKey={3.3}>
                                            <Link to={'/'} style={{color:'#232222'}}><Glyphicon glyph="log-out" /> Logout</Link>
                                        </MenuItem>
                                    </NavDropdown>
                                </NavItem>

                                <NavItem eventKey={2} style={member}>
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






                                <div class="user_setting_centered">

                                    <div class="form_tab3" id="usersetting" >



                                        <div class="heading">
                                            <h2>Profile</h2>
                                        </div>
                                        <label>Avtar</label>
                                        <div class="main_user_avtar">
                                            <div class="user_img">
                                                <img src="./image/user.png" class="user_avtar" id="userpic" />
                                            </div>
                                            {/* <div class="choose_img">
                                                <input type="file" class="filestyle" ID="file_field" name="file_field" />
                                                <p>JPG, GIF or PNG, Max size: 2MB</p>
                                            </div> */}
                                        </div>

                                        <form>
                                            <div class="form-group">
                                                <label for="username">Name</label>
                                                <input type="text" class="form-control" id="usernamedisp" required />
                                                <p></p>
                                            </div>

                                            <div class="form-group">
                                                <label>Your Email</label>
                                                <input type="text" class="form-control" id="useremail" value="xyz@gmail.com" disabled />
                                                <p>Email Id cannot be changed or altered..</p>
                                            </div>

                                            <div class="active">
                                                <input class="btn btn-info" id="finalclick" type="button" value="Update" />
                                            </div>
                                        </form>


                                        <div class="heading">
                                            <h2>Change Password</h2>
                                        </div>

                                        <form >
                                            <div class="form-group">
                                                <label for="new_pass">New Password</label>
                                                <input type="password" class="form-control" id="new_pass" min="6" required />
                                            </div>

                                            <div class="form-group">
                                                <label for="re_new_pass">Re-type New Password</label>
                                                <input type="password" class="form-control" id="re_new_pass" min="6" required />
                                            </div>
                                            <label id="notmatch" style={{ color: 'red' }} />

                                            <div class="active">
                                                <input id="ChangePassClick" class="btn btn-info" type="submit" value="Save Changes" />
                                            </div>
                                        </form >

                                    </div>

                                </div>










                            </div>

                        </div>


                    </div>
                </div>


                <div id="" style={{ position: 'relative' }}>
                </div>
            </div>


        );

    }
}
export default UserProfile;