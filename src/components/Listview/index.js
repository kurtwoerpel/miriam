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

    let currentClass = e.target.value;
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
      myArr.push((monthNames[date.getMonth()]) + "." + this.getOrdinalNum(date.getDate()) + ", " + date.getFullYear());
      myArr.push(strTime + ' EST');
      return myArr;
    }
   
   render() {
    const {records} = this.props
    let allTags = [];
    const everythings = records.length > 0 ? records.map((x)=>{
      const divStyle={
        backgroundImage: (!x.fields.MainImage ? '' : "url(" + x.fields.MainImage[0].url + ")"),
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
      return(

        <a href={'/happening/'+x.id} key={x.id} id={x.id} className={x.fields.Tags + " list-item on row"} >
          <h1 className='text-small baskerville col-sm-2'>{x.fields.Title}</h1>
          <h1 className='text-small baskerville col-sm-2'>{this.formatDate(new Date(x.fields.StartDate))[0]}<br></br>{this.formatDate(new Date(x.fields.StartDate))[1]}</h1>
          <div className='text-small baskerville col-sm-2'>{x.fields.Tags ? (x.fields.Tags.split(' ').join(', ')) :""}</div>
          <h1 className='people text-small baskerville col-sm-2'><ReactMarkdown source= {x.fields.People}></ReactMarkdown></h1>
          <div style={divStyle} className='col-sm-2'>
          
          </div>
          
        </a>
       )
      }) : 'loading'
    const tagFilter = allTags.length > 0 ? allTags.map((x)=>{
      return(
      <option key={x} >{x}</option>
      )
    }) : ''

    return (

     <div className='list-view container-fluid'>
      <div className="list-item on list-item-menu row" >
          <h1 className='text-small col-sm-2'>Event/Exhibition</h1>
          <h1 className='text-small col-sm-2'>Date</h1>
          <h1 className='text-small col-sm-2'>Tags<select className="selectpicker" onChange={this.filterTags}><option>All</option>{tagFilter}</select></h1>
          <h1 className='text-small col-sm-2'>People</h1>
          <h1 className='text-small col-sm-2'>
             Image
          </h1>
          
        </div>
         {everythings}

     </div>





    );
  }
}

export default Listview
