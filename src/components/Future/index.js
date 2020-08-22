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
import {Listview} from '../';
import {GridviewUpcoming} from '../';

class Past extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listview:false
    };
    this.showList = this.showList.bind(this);
    this.showGrid = this.showGrid.bind(this);
   }
   showList(){
    this.setState({ listview: true });
   }
   showGrid(){
    this.setState({ listview: false });
   }

   render() {
    const {records} = this.props
    const {listview} = this.state
    return (

     <header className={listview ? "App-header pastpage list-header" : "App-header pastpage" }>
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <div className='header text-large baskerville'> Upcoming </div>
          <div className='sub-menu'>
            <button onClick={this.showList} className={listview ? 'text-small on' : 'text-small'}>list view</button>
            <button onClick={this.showGrid} className={listview ? 'text-small' : 'text-small on'}>grid view</button>
            <div className='search'><div className='search-text baskerville text-small'>Search</div><input type='text'/><div className='letsgo'><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 86.6"><defs></defs><polygon  points="75 43.3 0 0 0 86.6 75 43.3"/></svg></div></div>
          </div>
          <div className='main-area'>
            <div className='view-space'>
            {!listview ? <GridviewUpcoming tense="upcoming" records={records}></GridviewUpcoming> :
              <Listview tense="upcoming" records={records}></Listview>
            }
            </div>
          </div>
          <hr></hr>
          <div className='archive-links'>
          <a href='/current'><h1 className='baskerville text-large'>Current,</h1></a><a href='/past'><h1 className='baskerville text-large'>Past</h1></a>
          </div>
      </header>




    );
  }
}

export default Past
