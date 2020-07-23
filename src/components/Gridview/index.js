import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Gridview extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
   }



   render() {
    const {records} = this.props
    const everythings = records.length > 0 ? records.map((x)=>{
      return(

        <a href={'/event/'+x.id} key={x.id} id={x.id} className="list-item col-sm-3" >
          {!x.fields.MainImage ? '' :
            <img src={x.fields.MainImage[0].url}/>
          }
          <p>{x.fields.Name}</p>
        </a>
       )
      }) : 'loading'
    return (

     <div class='list-view row'>
         {everythings}
     </div>





    );
  }
}

export default Gridview
