import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Homecarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carousel_slides: [],
    };
    // this.renderFlowers = this.renderFlowers.bind(this);
   }
   // componentDidMount() {
   //    fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/homepage_carousel?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
   //      .then(res => res.json())
   //      .then(res => {
   //        console.log(res.records)
   //        this.setState({ carousel_slides: res.records })
   //      })
   //      .catch(error => console.log(error))
   //  }


   render() {
   	const { carousel_slides } = this.state;




    return (

     <header className="App-header">
         <Homecarousel></Homecarousel>
        <p className='text-large col-md-4 offset-md-4'>
          Miriam!
        </p>

      </header>




    );
  }
}

export default Homecarousel
