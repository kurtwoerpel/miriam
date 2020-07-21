import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel_slides: [],
    };
    // this.renderFlowers = this.renderFlowers.bind(this);
   }



   render() {
   	// const { roses } = this.state;
    // console.log(this.props)

    return (
      // <div>{this.renderFlowers()}</div>
     <header className="App-header">
        <p className='text-large col-md-4 offset-md-4'>
          Miriam!
        </p>

      </header>




    );
  }
}

export default Home
