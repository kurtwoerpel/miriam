import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Navigation} from '../';
import {Mainmenu} from '../';

class Past extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel_slides: [],
    };
   }

   render() {

    return (

     <header className="App-header pastpage">
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <div class='header text-large baskerville'> Archive </div>
          <div class='sub-menu'>
            <button class='text-small'>list view</button>
            <button class='text-small'>grid view</button>
            <div class='search'><div class='search-text baskerville text-small'>Search</div><input type='text'/></div>
          </div>
          <div class='container'>
          </div>
      </header>




    );
  }
}

export default Past
