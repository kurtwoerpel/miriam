import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Mainmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info:null
    };
    this.blanketClose = this.blanketClose.bind(this);
    this.triggerCloseMenu = this.triggerCloseMenu.bind(this);
   }

 componentDidMount() {
  fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/info?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
    .then(res => res.json())
    .then(res => {
      this.setState({ info: res.records })
    })
    .catch(error => console.log(error))

  }
 triggerCloseMenu(){
    const menu = document.getElementById('main-menu');
    menu.classList.remove('open')
   }
  blanketClose(){
    const menu = document.getElementById('main-menu');
    menu.classList.remove('open')
  }


   render() {
    const {info} = this.state
    console.log(info)
    let logoStyle;
    let menuStyle
    if(info){
      logoStyle = {
        'color': info[0].fields.LogoTextColor,
        'backgroundColor': info[0].fields.LogoBackgroundColor
      }

      menuStyle = {
        'color': info[0].fields.MenuTextColor,
        'backgroundColor': info[0].fields.MenuBackgroundColor
      }
    }
    
    
    return (

      <div style={menuStyle} id='main-menu'>
      <div className='blanket' onClick={this.blanketClose}></div>
       <a href='/'><div style={logoStyle} className='logo text-medium'>Miriam</div></a>
         <ul className='text-small baskerville'>
            <li><a>Current</a></li>
            <li><a>Upcoming</a></li>
            <li><a href='/past'>Past</a></li>
            <li><a>Happenings</a></li>
            <li><a>Info</a></li>
            <li><a>Bookshop</a></li>
         </ul>
         {info ? 
         <div className='info-menu text-tiny'>
         <ReactMarkdown source={info[0].fields.LocationText} />
         <ReactMarkdown source={info[0].fields.HoursText} />
         </div>
         : 'poop' }
      </div>

    );
  }
}

export default Mainmenu
