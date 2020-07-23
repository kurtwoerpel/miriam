import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Exhibition extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
   }



   render() {
    const {record} = this.props
    const everything = record ? 
    (

        <div key={record.id} className="row" >
          {!record.fields.MainImage ? '' :
            <img src={record.fields.MainImage[0].url}/>
          }
          <p>{record.fields.Name}</p>
        </div>
       ) : 'loading'
    return (

     <div class='container'>
     hi
         {everything}
     </div>





    );
  }
}

export default Exhibition
