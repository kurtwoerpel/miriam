import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Menutrigger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.triggerMenu = this.triggerMenu.bind(this);
   }

   triggerMenu(){
   	const menu = document.getElementById('main-menu');
   	if(menu.classList.contains("open")){
   		menu.classList.remove('open')
   	}else{
   		menu.classList.add('open')
   	}
   }

   render() {

    return (

      <div style={this.props.style} onClick={this.triggerMenu} className='logo text-medium'>Miriam</div>

    );
  }
}

export default Menutrigger
