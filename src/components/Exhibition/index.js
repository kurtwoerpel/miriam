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
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Exhibition extends Component {

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
    var pageStyle = {
        backgroundColor: record.fields.PageBackgroundColor,
        color: record.fields.TextColor
      };
      var bookButton = {
        color: record.fields.PageBackgroundColor
      }
   var logoStyle = {
        backgroundColor: record.fields.LogoBackgroundColor,
        backgroundImage: (record.fields.LogoBackgroundImage ? "url(" + record.fields.LogoBackgroundImage[0].url +")" : " "),
        color: record.fields.LogoColor
      }
      var headerStyle = {
        "backgroundImage": (record.fields.HeaderImage ? 'url(' + record.fields.HeaderImage[0].url + ')' : ''),
      }
      if(record.fields.HeroImages){
      var slides = record.fields.HeroImages.map((x,i)=>{

                    return(
                      <div>
                      <img src={x.url}></img>
                      <div className='caption row'>
                        <span className='counter col-2'>{(i+1)+"/"+ record.fields.HeroImages.length}</span>
                      {record.fields.HeroImageCaptions ? 
                        <div className='col-8'>
                        {record.fields.HeroImages.length == record.fields.HeroImageCaptions.split(',').length ?
                        
                        <ReactMarkdown  source={record.fields.HeroImageCaptions.split(',')[i]}/>
                       
                      :""}
                      </div>
                        :""}
                       </div>
                      </div>

                      )
                  })
      }


    const everything = record ? 
    (
       
        <div  key={record.id} >
          <div className='banner row'>
            <div className='header text-medium baskerville'> Exhibition </div>
          </div>
          <header>
          {record.fields.HeaderImage ? 
            <img src={record.fields.HeaderImage[0].url}/>
            : 
           ""
          }
          {record.fields.HeaderText ? 
             <h1 className={record.fields.HeaderImage ? 'header-with-image text-large baskerville': 'text-large baskerville'}> {record.fields.HeaderText}</h1>
             :
             ""
          }

          </header>

          <div className='toolbar'>
            <div className='row'>
               <div className='col-4'>
               <ReactMarkdown source={record.fields.DateTimeText} /></div>
               <div className='col-4'>
               <ReactMarkdown source={record.fields.TicketInfo} />
              </div>
               <div className='col-4'>{record.fields.ExternalInfo ? 
                  <a href={record.fields.ExternalInfo[0].url}>{record.fields.ExternalInfo[0].filename.split('.')[0]}</a>
               :""}</div>
            </div>
          </div>
          {record.fields.HeroImages ?
              <div className='top'>
              {record.fields.HeroImages.length > 1 ?

                <div>
                {record.fields.HeroImagesGrid ? 
                  <div className='hero-grid'>
                  {slides}
                  </div>
                  :
                <AliceCarousel duration='0' autoPlay autoPlayInterval="3000"
                >

                  {slides}
                </AliceCarousel>
              }
                </div>
                :
                <div>
                <img src={record.fields.HeroImages[0].url}></img>
                <div className='toolbar'>
                 <div className='row'>
                  <div className='col-2'></div>
                  <div className='col-8'>{record.fields.HeroImageCaptions}</div>
                 
                  </div>
                </div>
                </div>
              }
              </div>

          : ""}
        {record.fields.BodyImages ? 
          <div className='page-body container-fluid'>
            <div className='row'>
              <div className='col-6 text-small baskerville'><ReactMarkdown source={record.fields.ColOneBodyText}/></div>
              <div className='col-6 second-column text-small baskerville'>
              <div className='row'>
                {record.fields.BodyImages.map((x,i)=>{

                    return(
                      <img className={record.fields.BodyImages.length > 2 ? "col-4" : "col-12"} src={x.url}></img>
                      )
                  })
      }
                </div>
              </div>
            </div>
          </div>
          :
          <div className='page-body container-fluid'>
            <div className='row'>
              <div className='col-12 text-medium baskerville'><ReactMarkdown source={record.fields.ColOneBodyText}/></div>
            </div>
          </div>
        } 
        {record.fields.FeaturedBookImage ? 
          <div className='featured-book container-fluid'>
            <div className='row'>

              <div className='col-6 '><ReactMarkdown style={bookButton} className='text-medium baskerville' source={record.fields.FeaturedBookText}/><a className='book-button' href={record.fields.FeaturedBookLink}><span className='text-medium'>Visit Bookshop</span></a></div>
              <div className='col-6'><img src={record.fields.FeaturedBookImage[0].url}></img></div>
            </div>
          </div>
        :""}
          
          
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

export default Exhibition
