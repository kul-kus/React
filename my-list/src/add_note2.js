import React from 'react';
import ReactDOM from 'react-dom';

import { react, Component } from 'react';
import { Nav, Navbar, Jumbotron, Button, Alert, Label, Form, Glyphicon } from 'react-bootstrap';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FormGroup, FormControl, Image } from 'react-bootstrap';

import { Modal } from 'react-bootstrap';

import styles from './user_home.css'

import { Link } from 'react-router-dom'


class AddNote extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,

      pop_list_del_btn: {
        backgroundColor: 'rgb(255, 255, 255)',
        marginLeft: '20px',
        width: '30px',
        height: '30px',
        marginBottom: '10px',
        padding: '3px',
        borderRadius: '50px'
      },
      children: [
        <div id="heading_body" style={{ padding: '10px 10px 0px 10px', width: '100%', display: 'inline-block' }}>
          <input style={{ width: '60%', float: 'left' }} type="text" class="form-control" id="title" required />
          <Button class="1"  onClick={(e)=>this.remove_list()} style={{
            backgroundColor: 'rgb(255, 255, 255)', marginLeft: '20px', width: '30px', height: '30px',
            marginBottom: '10px', padding: '3px', borderRadius: '50px'
          }}>
            <Glyphicon id={this.count} glyph="remove" />
          </Button>
        </div>
      ],
      count:0
    };


  }

  add_list() {

    this.setState({
      children: this.state.children.concat([
        <div id="heading_body" style={{ padding: '10px 10px 0px 10px', width: '100%', display: 'inline-block' }}>
          <input style={{ width: '60%', float: 'left' }} type="text" class="form-control" id="title" required />
          <Button onClick={(e)=>this.remove_list(e)} style={this.state.pop_list_del_btn}>
            <Glyphicon id={this.state.count} glyph="remove" />
          </Button>
        </div>
      ])
    });

    this.setState({count:this.state.count+1});
    alert("add_list " + this.state.children.length);
  }

  remove_list(e) {

    alert(e.target.id);
    // var array = this.state.children; // make a separate copy of the array
    // var index = this.state.children.length
    // array.splice(this.state.children.length-1, 1);
    // this.setState({children:array});

    alert("remove_list " + this.state.children.length);
  };

  handleHide() {


    this.setState({
      show: false,
      children: [
        <div id="heading_body" style={{ padding: '10px 10px 0px 10px', width: '100%', display: 'inline-block' }}>
          <input style={{ width: '60%', float: 'left' }} type="text" class="form-control" id="title" required />
          <Button onClick={(e)=>this.remove_list(e)} style={{
            backgroundColor: 'rgb(255, 255, 255)', marginLeft: '20px', width: '30px', height: '30px',
            marginBottom: '10px', padding: '3px', borderRadius: '50px'
          }}>
            <Glyphicon id={this.state.count} glyph="remove" />
          </Button>
        </div>
      ]

    });


  }

  render() {
    return (
      <div className="modal-container" style={{ height: 0 }}>
        <Button style={{ padding: 0, backgroundColor: '#232222', borderColor: '#232222', color: 'white' }}
          bsSize="large"
          onClick={() => this.setState({ show: true })}
        >
          <Glyphicon glyph="plus" />Add Note
          </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleHide}

          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              <h1>Add Note</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width: '100%' }}>
              <form>
                <div class="add_note_back" style={{ display: 'inline-block', width: '100%' }}>
                  <div class="note_heading_part" style={{ border: '1px solid #ccc8c8' }}>
                    <div id="heading_title" style={{ padding: '10px', fontSize: '15px', paddingBottom: '0px' }}>
                      Add Title
                    </div>
                    <div id="heading_body" style={{ padding: '10px' }}>
                      <input type="text" class="form-control" id="title" required />
                    </div>
                  </div>
                  <div class="note_body_part" style={{ border: '1px solid #ccc8c8', borderTop: '0px', paddingBottom: '10px' }}>
                    <div id="heading_title" style={{ padding: '10px', fontSize: '15px', paddingBottom: '20px' }}>
                      Add List <Button onClick={() => this.add_list()} style={{ backgroundColor: '#bbb', float: 'right', marginRight: '20px', marginBottom: '10px' }}>
                        <Glyphicon glyph="plus" />
                      </Button>
                    </div>

                    {this.state.children}

                    {}




                  </div>

                  <div class="active">
                    <input style={{ width: '100px' }} id="add_new_note" class="btn btn-info" type="submit" value="Add Note" />
                  </div>
                </div>

              </form>
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddNote;
