import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class GridviewUpcoming extends Component {

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
    let upcoming = [];
    let past = [];
    let current = [];
    let urlswitch = false;
    let allTags = []; 
    const {records, tense} = this.props
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

      return(
        <a href={'/happening/'+x.id} key={x.id} id={x.id} className={dateClass == tense ? x.fields.Tags + " "+ dateClass + " grid-item on col-6 col-sm-6" :  x.fields.Tags + " "+ dateClass + " grid-item col-6 col-sm-6"} >
         <div>
          <h2 className='baskerville text-large'>{x.fields.isEvent ? 'Event' : 'Exhibition'}</h2>
          <div className='grid-image' style={divStyle}></div>
          <h1 className='text-small baskerville title'>{x.fields.Title}</h1>
          <h1 className='text-small baskerville'>{this.formatDate(new Date(x.fields.StartDate))[0]}<br></br>{this.formatDate(new Date(x.fields.StartDate))[1]}</h1>
         </div>
        </a>
       )
      }) : 'loading'
     if(tense == 'upcoming' && upcoming.length == 1){
      window.location.href='/happening/'+upcoming[0]
    }
    if(tense == 'current' && current.length == 1){
      window.location.href='/happening/'+upcoming[0]
    }
    return (

     <div className='grid-view upcoming row'>
         {everythings}
     </div>





    );
  }
}

export default GridviewUpcoming
