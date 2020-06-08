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
    this.add_list = this.add_list.bind(this);
    this.remove_list = this.remove_list.bind(this);

    this.state = {
      show: false,
      list: [
        {
          list_name: '',
          checked:false,
        }]
    };
  }

  add_list() {
    this.setState({
      list:this.state.list.concat([{
        list_name: '',
        checked:false,
      }])
    });
  }

  remove_list(e,index) {

    var array = this.state.list; 
     array.splice(index, 1);
     this.setState({list:array});
  };

  update_list(evt,index)
  {
    this.setState({
      list:this.state.list.filter((curr)=>{
          return curr.list_name=evt.target.valuel
      })
     
    });
    this.state.list.map((curr)=>{
      alert(curr.list_name)
  })

  }

  update_list_checkbox(evt,index)
  {
    alert(evt.target.value);
    alert(evt.target.checked);

    this.setState({
      list:this.state.list.map((curr,i)=>{
        if(index == i){curr.checked=true}
      })
    });

  }

  handleHide() {


    this.setState({
      show: false,
       list:[{
        list_name: '',
        checked: false
       }]

    });


  }

  render() {

    var pop_list_del_btn={
      backgroundColor: 'rgb(255, 255, 255)',
      marginLeft: '20px',
      width: '30px',
      height: '30px',
      marginBottom: '10px',
      padding: '3px',
      borderRadius: '50px'
    }

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
              <h4>Add Note</h4>
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




                    {
                      this.state.list.map((c,index) => {
                     //  console.log(c.list_name)
                        return (
                          <div id="heading_body"  key={index} style={{ padding: '10px 10px 0px 10px', width: '100%', display: 'inline-block' }}>
                           
                          
                            <input  key={index} value={c.list_name} onChange={(e)=>this.update_list(e,index)} style={{ width: '60%', float: 'left' }} type="text" class="form-control" id="title" 
                            required />
                            <Button onClick={(e) => this.remove_list(e,index)} style={{
                              backgroundColor: 'rgb(255, 255, 255)', marginLeft: '20px', width: '30px', height: '30px',
                              marginBottom: '10px', padding: '3px', borderRadius: '50px'
                            }}>
                              <Glyphicon glyph="remove" />
                            </Button>
                          </div>
                        )
                      })
                    }

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
