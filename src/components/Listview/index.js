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
    const everythings = records.length > 0 ? records.map((x)=>{
      const divStyle={
        backgroundImage: (!x.fields.MainImage ? '' : "url(" + x.fields.MainImage[0].url + ")")
      }
      return(

        <a href={'/happening/'+x.id} key={x.id} id={x.id} className="list-item row" >
          <h1 className='text-small baskerville col-sm-3'>{x.fields.Title}</h1>
          <h1 className='text-small baskerville col-sm-3'>{this.formatDate(new Date(x.fields.StartDate))[0]}<br></br>{this.formatDate(new Date(x.fields.StartDate))[1]}</h1>
          <h1 className='people text-small baskerville col-sm-3'><ReactMarkdown source= {x.fields.People}></ReactMarkdown></h1>
          <div style={divStyle} className='col-sm-3'>
          
          </div>
          
        </a>
       )
      }) : 'loading'
    return (

     <div className='list-view container-fluid'>
      <div className="list-item list-item-menu row" >
          <h1 className='text-small col-sm-3'>Event/Exhibition</h1>
          <h1 className='text-small col-sm-3'>Date</h1>
          <h1 className='text-small col-sm-3'>People</h1>
          <h1 className='text-small col-sm-3'>
             Image
          </h1>
          
        </div>
         {everythings}

     </div>





    );
  }
}

export default Listview
