import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Homecarousel} from '../';
import {Navigation} from '../';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel_slides: [],
    };
   }

   render() {

    return (

     <header className="App-header">
          <Navigation></Navigation>
          <Homecarousel></Homecarousel>

      </header>




    );
  }
}

export default Home
