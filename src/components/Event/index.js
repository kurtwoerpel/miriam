import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {Navigation} from '../';
import {Mainmenu} from '../';
import {Menutrigger} from '../';


// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Event extends Component {

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
    const {record} = this.props
    var bannerStyle = {
        backgroundImage: (record.fields.BannerImage ? 'url(' + record.fields.BannerImage[0].url + ')' : 'none')
      };
   var logoStyle = {
        backgroundColor: record.fields.LogoBackgroundColor,
        backgroundImage: (record.fields.LogoBackgroundImage ? "url(" + record.fields.LogoBackgroundImage[0].url +")" : " "),
        color: record.fields.LogoColor
      }
    console.log(record.fields.startDate)
    const everything = record ? 
    (
       
        <div key={record.id} >
          <div style={bannerStyle} className='banner row'>
          <div className='header text-medium baskerville'> Event </div>
            <h1 className='text-large baskerville'> {record.fields.Title}</h1>
          </div>
          <div className='container-fluid'>
          <div className='row'>
              <div className='three-column col-sm-12 col-md-2'>
                <ul>
                  <li className='text-small'> {this.formatDate(new Date(record.fields.StartDate))[0]}<br></br>{this.formatDate(new Date(record.fields.StartDate))[1]}</li>
                </ul>
              </div>
                 <div className='three-column col-sm-12 order-sm-1 order-md-2 col-md-5'>
                {!record.fields.MainImage ? '' :
                            <img src={record.fields.MainImage[0].url}/>
                          }
              </div>
              <div className='three-column col-sm-12 order-sm-2 order-md-1 col-md-5'>
                <ReactMarkdown source={record.fields.Description} />
              </div>
           
            </div>
          </div>
          
          
        </div>
       ) : 'loading'
    return (
    <div className='exhibition'>
      <Navigation></Navigation>
      <Menutrigger style={logoStyle}></Menutrigger>
          <Mainmenu></Mainmenu>
     
     <div className=''>
      
         {everything}
     </div>
     </div>





    );
  }
}

export default Event
