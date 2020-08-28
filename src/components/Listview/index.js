import React, { Component } from 'react';
import './style.css';
import { Dropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Listview extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
    this.formatDate = this.formatDate.bind(this);
    this.getOrdinalNum = this.getOrdinalNum.bind(this);
    this.filterTags = this.filterTags.bind(this);
   }

  filterTags(e){

    let currentClass = e.target.text;
    let all = document.getElementsByClassName('list-item')
    console.log(currentClass)
    if(currentClass !== "All"){

      console.log('here')
      for (var i = all.length - 1; i >= 0; i--) {
          all[i].classList.remove('on')

      }
      let currents = document.getElementsByClassName(currentClass)
      for (var i = currents.length - 1; i >= 0; i--) {
        currents[i].classList.add('on')
      }
    } else{
      for (var i = all.length - 1; i >= 0; i--) {
        all[i].classList.add('on')
      }
    }
  }

 getOrdinalNum(number) {
      let selector;

      if (number <= 0) {
        selector = 4;
      } else if ((number > 3 && number < 21) || number % 10 > 3) {
        selector = 0;
      } else {
        selector = number % 10;
      }

      return number + ['th', 'st', 'nd', 'rd', ''][selector];
    };
   formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + '' + ampm;
      const myArr = [];
      myArr.push((monthNames[date.getMonth()]) + " " + this.getOrdinalNum(date.getDate()) + ", " + date.getFullYear());
      myArr.push(strTime);
      return myArr;
    }
   
   render() {
    const {records, tense} = this.props
    let upcoming = [];
    let past = [];
    let current = [];
    let urlswitch = false;
    let allTags = [];
    const everythings = records.length > 0 ? records.map((x)=>{
      const divStyle={
        backgroundImage: (!x.fields.HeroImages ? '' : "url(" + x.fields.HeroImages[0].url + ")"),
        backgroundSize: "cover",
        backgroundPosition: "center"
      }
      if(x.fields.Tags){
        for (var i = x.fields.Tags.split(" ").length - 1; i >= 0; i--) {
          if(!allTags.includes(x.fields.Tags.split(" ")[i])){
            allTags.push(x.fields.Tags.split(" ")[i])
          }
        }
      }
      let dateClass = ''
      if(x.fields.StartDate){
        var d1 = new Date();
        var d2 = new Date(x.fields.StartDate);

        if(d2 > d1){
          dateClass = "upcoming"
          upcoming.push(x.id)
        }else{
          dateClass = "past"

          if(x.fields.EndDate){
            var d3 = new Date(x.fields.EndDate);
            if(d3 > d1){
              dateClass = "current"
              current.push(x.id)
            }else{
              past.push(x.id)
            }
          }
        }

      }
 if(dateClass == tense){
  var linkroot = ''
      if(x.type == 'exhibition'){
         linkroot = '/exhibition/'
      }else if(x.type == 'event'){
        linkroot = '/event/'
      }else if(x.type == 'announcement'){
        linkroot = '/announcement/'
      }
      return(

        <a href={linkroot+x.id} key={x.id} id={x.id} className={dateClass == tense ? x.fields.Tags + " "+ dateClass + " list-item on row" :  x.fields.Tags + " "+ dateClass + " list-item row"} >
          <h1 className='text-small baskerville col-special'>{x.fields.Title}</h1>
          <div className='text-small baskerville col-special'>
          {x.fields.StartDate ? 
          
          <h1 className='text-small baskerville'>{this.formatDate(new Date(x.fields.StartDate))[0]}<br></br>{this.formatDate(new Date(x.fields.StartDate))[1]}</h1>
            : <h1 className='text-small baskerville '></h1> }
            {x.fields.EndDate ? 
          <h1 className='text-small baskerville'> - {this.formatDate(new Date(x.fields.EndDate))[0]}<br></br>{this.formatDate(new Date(x.fields.EndDate))[1]}</h1>
            : <h1 className='text-small baskerville '></h1> }
            </div>
          <div className='text-small baskerville col-special'>{x.fields.Tags ? (x.fields.Tags.split(' ').join(', ')) :""}</div>
          <h1 className='people text-small baskerville col-special'><ReactMarkdown source= {x.fields.People}></ReactMarkdown></h1>
          <div style={divStyle} className='col-special'>
          
          </div>
          
        </a>
       )}
      }) : 'loading'

    if(tense == 'upcoming' && upcoming.length == 1){
       var linkroot = ''
      if(upcoming[0].type == 'exhibition'){
         linkroot = '/exhibition/'
      }else if(upcoming[0].type == 'event'){
        linkroot = '/event/'
      }else if(upcoming[0].type == 'announcement'){
        linkroot = '/announcement/'
      }
      window.location.href=linkroot+upcoming[0]
    }
    if(tense == 'current' && current.length == 1){
       var linkroot = ''
      if(current[0].type == 'exhibition'){
         linkroot = '/exhibition/'
      }else if(current[0].type == 'event'){
        linkroot = '/event/'
      }else if(current[0].type == 'announcement'){
        linkroot = '/announcement/'
      }
      window.location.href=linkroot+current[0]
    }

    const tagFilter = allTags.length > 0 ? allTags.map((x)=>{
      return(
      <Dropdown.Item onClick={this.filterTags} key={x} >{x}</Dropdown.Item>
      )
    }) : ''

    return (

     <div className='list-view container-fluid'>
      <div className="list-item on list-item-menu row" >
          <h1 className='text-small col-special'>Event/Exhibition</h1>
          <h1 className='text-small col-special'> <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Date
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.filterTags}>All</Dropdown.Item>
              <Dropdown.Item onClick={this.filterTags}>current</Dropdown.Item>
              <Dropdown.Item onClick={this.filterTags}>upcoming</Dropdown.Item>
              <Dropdown.Item onClick={this.filterTags}>past</Dropdown.Item>
            </Dropdown.Menu></Dropdown></h1>
          <h1 className='text-small col-special'>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Tags
            </Dropdown.Toggle>
            <Dropdown.Menu><Dropdown.Item onClick={this.filterTags}>All</Dropdown.Item>{tagFilter}</Dropdown.Menu></Dropdown></h1>
          <h1 className='text-small col-special'>People</h1>
          <h1 className='text-small col-special'>
             Image
          </h1>
          
        </div>
         {everythings}

     </div>





    );
  }
}

export default Listview
