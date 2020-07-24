import React, { Component } from 'react';
import './style.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {Slider} from '../';
import {Menutrigger} from '../';


class Homecarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carousel_slides: [],
    };
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
   }

   componentDidMount() {
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/homepage_carousel?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          console.log(res.records)
          this.setState({ carousel_slides: res.records })
        })
        .catch(error => console.log(error))
    }

    goNext(){
      const slides = document.getElementsByClassName('carousel-slide');
      // const selectedSlide = document.getElementsByClassName('selected')[0];
      let currentIndex = 0;
      for (var i = slides.length - 1; i >= 0; i--) {
        if(slides[i].classList.contains('selected')){
          currentIndex = i;
        }
        slides[i].classList.remove('selected')
      }
      slides[currentIndex].classList.add('passed')
      slides[currentIndex+1].classList.add('selected')
      document.getElementsByClassName('arrow-next')[0].classList.remove('off');
      document.getElementsByClassName('arrow-prev')[0].classList.remove('off');
      if(currentIndex + 1 == slides.length -1){
        document.getElementsByClassName('arrow-next')[0].classList.add('off');
      }
    }
    goPrev(){
      console.log('hi')
      const slides = document.getElementsByClassName('carousel-slide');
      // const selectedSlide = document.getElementsByClassName('selected')[0];
      let currentIndex = 0;
      for (var i = slides.length - 1; i >= 0; i--) {
        if(slides[i].classList.contains('selected')){
          currentIndex = i;
        }
        slides[i].classList.remove('selected')

      }
      console.log(currentIndex)
      slides[currentIndex].classList.remove('passed')
      slides[currentIndex-1].classList.remove('passed')
      slides[currentIndex-1].classList.add('selected')
      document.getElementsByClassName('arrow-next')[0].classList.remove('off');
      document.getElementsByClassName('arrow-prev')[0].classList.remove('off');
      if(currentIndex - 1 == 0){
        document.getElementsByClassName('arrow-prev')[0].classList.add('off');
      }
    }

   render() {
   	const { carousel_slides } = this.state;

  
    const flickityOptions = {
    	cellAlign:'left',
    	contain:true
    }
    const slides = carousel_slides.length > 0 ? carousel_slides.map((x,i)=>{
      var divStyle = {
        backgroundColor: x.fields.BackgroundColor,
        backgroundImage: (x.fields.BackgroundImage ? 'url(' + x.fields.BackgroundImage[0].url + ')' : 'none')
        // WebkitTransition: 'all', // note the capital 'W' here
        // msTransition: 'all' // 'ms' is the only lowercase vendor prefix
      };
      var logoStyle = {
      	backgroundColor: x.fields.LogoBackgroundColor,
      	color: x.fields.LogoColor
      }
      var headlineStyle = {
      	color: x.fields.HeadlineColor
      }
      var subheadlineStyle = {
      	color: x.fields.SubHeadlineColor
      }
      var descriptionStyle = {
      	color: x.fields.DescriptiveCopyColor
      }
      return(
        <div style={divStyle} key={x.id} className={i == 0 ? 'carousel-slide selected':'carousel-slide'}>
          <Menutrigger style={logoStyle}></Menutrigger>
          <h1 style={headlineStyle} className='text-large baskerville'>{x.fields.Headline}</h1>
           {!x.fields.HeroImage ? '' :
            <img className='carousel-slide-image' alt='hero image' src={x.fields.HeroImage[0].url}/>
          }
          <h1 style={subheadlineStyle} className='text-large baskerville'>{x.fields.SubHeading}</h1>
          <div style={descriptionStyle} className='description text-medium'><ReactMarkdown source={x.fields.DescriptiveCopy} /></div>

        </div>
       )
      }) : 'loading'

    console.log(slides)
    // <Slider
    //         options={{
    //           autoPlay: 6000,
    //           pauseAutoPlayOnHover: true,
    //           wrapAround: false,
    //           fullscreen: true,
    //           adaptiveHeight: true,
    //           pageDots: false,
    //           draggable: false,
    //           arrowShape: "M1.9,49.9h96.9 M17.1,34.4C12.4,39.3,6,45.8,1.8,49.9l15.3,15.7"
    //         }}
    //       >
    // {slides}
    // </Slider>
    return (

     <header className="App-header">
      <div className='custom-slider'>
        {slides}
        <div className='arrow arrow-prev off' onClick={this.goPrev}>
              <svg version="1.1" x="0px" y="0px"
         viewBox="0 0 100 100">

      <path class="st0" d="M1.9,49.9h96.9 M17.1,34.4C12.4,39.3,6,45.8,1.8,49.9l15.3,15.7"/>
      </svg>
    </div>
        <div className='arrow arrow-next' onClick={this.goNext}>
            <svg version="1.1" x="0px" y="0px"
         viewBox="0 0 100 100">

      <path class="st0" d="M1.9,49.9h96.9 M17.1,34.4C12.4,39.3,6,45.8,1.8,49.9l15.3,15.7"/>
      </svg></div>
      </div>


      </header>




    );
  }
}

export default Homecarousel
