import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactMarkdown from "react-markdown";
import {Navigation} from '../';
import {Mainmenu, Footer} from '../';
import {Menutrigger} from '../';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
    this.formatDate = this.formatDate.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.getOrdinalNum = this.getOrdinalNum.bind(this);
        
        this.handleScroll = this.handleScroll.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
   }
    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
  }
  scrollTop(){
       window.scrollTo({top: 0, behavior: 'smooth'});
    };
      openLightbox(e){
    console.log(e)
    var img_url = e.target.src;
    var newImg = document.createElement('img');
    newImg.src = img_url;
    var lightbox = document.getElementById('light-box');
    var lightboxInner = lightbox.getElementsByClassName("inner")[0];
    lightboxInner.innerHTML = '';
    lightboxInner.appendChild(newImg);
    lightbox.classList.add('on')

  }
     handleScroll(){
    document.getElementsByClassName('App-header');
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if(scrollTop > 0){
      document.getElementsByClassName('App-header')[0].classList.add('small-header')
    } else{
      document.getElementsByClassName('App-header')[0].classList.remove('small-header')
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
    const {record} = this.props
     var navStyle= {
        backgroundColor: record.fields.PageBackgroundColor
      }
    var pageStyle = {
        backgroundColor: record.fields.PageBackgroundColor,
        color: record.fields.PageTextColor
      };
    var borderStyle={
      borderColor: record.fields.PageLineColor,
    }
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
      const HtmlCode = props => {
            console.log(props)
            return (
              <div>{ReactHtmlParser(props.value)}</div>
            );
          };

          const renderers = {
              inlineCode: HtmlCode,
              code: HtmlCode
            };
      if(record.fields.PageHeroImages){
      var slides = record.fields.PageHeroImages.map((x,i)=>{

                    return(
                      <div>
                      <img onClick={this.openLightbox} src={x.url}></img>
                      <div className='caption row'>
                        
                      {record.fields.PageHeroImageCaptions ? 
                        <div className='col-12'>
                        {record.fields.PageHeroImages.length == record.fields.PageHeroImageCaptions.split(',').length ?
                        
                        <ReactMarkdown  source={record.fields.PageHeroImageCaptions.split(',')[i]}/>
                       
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
       
        <div className='event-page' key={record.id} >
          <div style={navStyle} className='banner row'>
            <div style={borderStyle} className='header text-medium '> Event </div>
          </div>

            <div className='row'>
          <div className='col-12 col-sm-6'>
            <header>
            {record.fields.HeaderImage ? 
              <img onClick={this.openLightbox} src={record.fields.HeaderImage[0].url}/>
              : 
             ""
            }
            {record.fields.PageHeaderText ? 
               <h1 className={record.fields.HeaderImage ? 'header-with-image text-large baskerville': 'text-large baskerville'}> {record.fields.PageHeaderText}</h1>
               :
               ""
            }

            </header>

            <div style={borderStyle} className='toolbar'>
            {record.fields.PageDateTimeText ? 
                <div className='row'>
                 <div className='col-6'>
                 <ReactMarkdown source={record.fields.PageDateTimeText} />
                 </div>
                 <div className='col-6'>
                 <ReactMarkdown source={record.fields.PageDetailsRight} />
                </div>
                </div>
               : 
               <div className='row'>
                 <div className='col-12'>
                 <ReactMarkdown source={record.fields.PageDetailsRight} />
                </div></div>}

        
            </div>
            <div className={record.fields.PageBigText ? ' text-large baskerville' :' text-small baskerville'}><ReactMarkdown renderers={renderers} source={record.fields.PageDescription}/></div>
          </div>
          <div className='col-12 col-sm-6 second-column'>
          {record.fields.PageHeroImages ?
              <div className='top'>
              {record.fields.PageHeroImages.length > 1 ?

                <div>
                  <div className='column-stacked'>
                  {slides}
                  </div>
                </div>
                :
                <div>
                <img onClick={this.openLightbox} src={record.fields.PageHeroImages[0].url}></img>
                <div style={borderStyle} className='toolbar'>
                 <div className='row'>
                  <div className='col-12 image-caption'>{record.fields.PageHeroImageCaptions}</div>
                 
                  </div>
                </div>
                </div>
              }
              </div>

          : ""}
          </div>
          
          </div>
        </div>
       ) : 'loading'
    return (
    <div style={pageStyle} className='exhibition'>
      <Navigation></Navigation>
      <Menutrigger style={logoStyle}></Menutrigger>
          <Mainmenu></Mainmenu>
     
     <div className=''>
      
         {everything}
     </div>
     <div className='archive-links'>
          <h1 className='baskerville text-large'><a href="javascript:history.back()">Back</a>, <span onClick={this.scrollTop}>Top</span></h1>
      </div>
     <Footer style={borderStyle}></Footer>
     </div>





    );
  }
}

export default Event
