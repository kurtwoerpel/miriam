import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
   }



   render() {

    return (

     <nav>
         <div class='nav-bookstore'><a href='derp'>Bookstore</a></div>
      </nav>




    );
  }
}

export default Navigation
