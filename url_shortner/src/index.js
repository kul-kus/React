

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/app';


import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export class Table extends React.Component {

  // Dummy data for the table
  state = {
    data: [{
      "company": "sagar",
      "contact":"123",
      "country":"ddd"
    }, {
      "company": 2,
      "contact":"123",
      "country":"ddd"
    }]
  }

  getData = (rowData) => {
    // This is the row data from ChildComponent
    console.log(rowData);
  }

  render() {
    return (
      <div>
        sss
        {this.state.data.map(item => (
          <ListItem rowData={item} handleClick={this.getData} />
        ))}
      </div>
    );
  }
  
}


const ListItem = (props) => {
  return (
    // Using Props handleClick as callback function
    <div>
      <p> {props.rowData.company} </p>
      <p> {props.rowData.contact} </p>
      <p> {props.rowData.country} </p>
    </div>
  );
}
export default ListItem;

// ReactDOM.render(
//   <Table />,
//   document.getElementById('root')
// );


serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
