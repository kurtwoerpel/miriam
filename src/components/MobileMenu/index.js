import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class MobileMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.triggerMenu = this.triggerMenu.bind(this);
    this.triggerCloseMenu = this.triggerCloseMenu.bind(this);
    this.triggerOpenMenu = this.triggerOpenMenu.bind(this);
   }

   triggerMenu(){
    const menu = document.getElementById('main-menu');
    if(menu.classList.contains("open")){
      menu.classList.remove('open')
    }else{
      menu.classList.add('open')
    }
   }
   triggerOpenMenu(){
   	const menu = document.getElementsByClassName('logo');
    for (var i = menu.length - 1; i >= 0; i--) {
      menu[i].textContent = 'Menu'
    }
   }
  triggerMiriam(){
    const menu = document.getElementsByClassName('logo');
        for (var i = menu.length - 1; i >= 0; i--) {
      menu[i].textContent = 'Miriam'
    }
   }
   triggerCloseMenu(){
    const menu = document.getElementById('main-menu');
    menu.classList.remove('open')
   }

   render() {

    return (

      <div style={this.props.style} onClick={this.triggerMenu} className=' text-medium mobile-menu-trigger'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
      </div>

    );
  }
}

export default MobileMenu
