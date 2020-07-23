import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Menutrigger} from '../';

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Mainmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
   }



   render() {

    return (

      <div id='main-menu'>
       <Menutrigger></Menutrigger>
         <ul>
            <li><a>Current</a></li>
            <li><a>Upcoming</a></li>
            <li><a href='/past'>Past</a></li>
            <li><a>Happenings</a></li>
            <li><a>Info</a></li>
            <li><a>Bookshop</a></li>
         </ul>
      </div>

    );
  }
}

export default Mainmenu
