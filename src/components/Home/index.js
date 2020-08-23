import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Homecarousel} from '../';
import {Navigation} from '../';
import {Mainmenu, Footer} from '../';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel_slides: [],
    };

   }

   render() {

    return (

     <header className="App-header Homepage">
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <Homecarousel></Homecarousel>
          <Footer></Footer>
      </header>




    );
  }
}

export default Home
