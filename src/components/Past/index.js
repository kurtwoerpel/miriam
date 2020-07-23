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
import {Gridview} from '../';

class Past extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listview:true
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
    return (

     <header className="App-header pastpage">
          <Navigation></Navigation>
          <Mainmenu></Mainmenu>
          <div class='header text-large baskerville'> Archive </div>
          <div class='sub-menu'>
            <button onClick={this.showList} class='text-small'>list view</button>
            <button onClick={this.showGrid} class='text-small'>grid view</button>
            <div class='search'><div class='search-text baskerville text-small'>Search</div><input type='text'/><div class='letsgo'><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 86.6"><defs></defs><polygon class="cls-1" points="75 43.3 0 0 0 86.6 75 43.3"/></svg></div></div>
          </div>
          <div class='container'>
            <h1 class='top-header baskerville text-large'>This is Everything.</h1>
            <div class='view-space'>
            {!this.state.listview ? <Gridview records={records}></Gridview> :
              <Listview records={records}></Listview>
            }
            </div>
          </div>
      </header>




    );
  }
}

export default Past
