import React, { Component } from 'react';
import './style.css';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';

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
      nextslide:false,
      carousel_slides: [],
      carousel:null,
      prevslide:false,
      currentIndex:"no",
      
    };
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.handler = this.handler.bind(this);
    // this.showLeft = this.showLeft.bind(this);
    // this.showRight = this.showRight.bind(this);
    // this.moveLeft = this.moveLeft.bind(this);
    // this.moveRight = this.moveRight.bind(this);
   }

   componentDidMount() {
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/homepage_carousel?view=main&api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          this.setState({ carousel_slides: res.records })
          console.log(res.records)
        })
        .catch(error => console.log(error))
    }

  handler(){

    const slides = document.getElementsByClassName('carousel-slide');
       for (var i = slides.length - 1; i >= 0; i--) {
         if(slides[i].classList.contains('selected')){
           if(i == 0){
            this.setState({currentIndex: i})
           }else{
            this.setState({currentIndex: i})
           }
           
         }
       }
  }

  goNext(){

       const slides = document.getElementsByClassName('carousel-slide');
       for (var i = slides.length - 1; i >= 0; i--) {
         if(slides[i].classList.contains('is-selected')){
          if(i == slides.length-1){
           this.setState({currentIndex: 0})
          }else{
            console.log(i)
            this.setState({currentIndex: (i) + 1})
          }
         }
       }
       // this.setState({ nextslide: true })
       // this.setState({ nextslide: false })
      
    }
    goPrev(){
      console.log('prev')
       const slides = document.getElementsByClassName('carousel-slide');
       for (var i = slides.length - 1; i >= 0; i--) {
         if(slides[i].classList.contains('is-selected')){
           if(i == 0){
            this.setState({currentIndex: slides.length - 1})
           }else{
            console.log(i - 1)
            this.setState({currentIndex: i - 1})
           }
           
         }
       }
      
    }

   render() {
   	const { carousel_slides, carousel, currentIndex } = this.state;

   
    const flickityOptions = {
    	cellAlign:'left',
    	contain:true
    }
    const slides = carousel_slides.length > 0 ? carousel_slides.map((x,i)=>{
      if(x.fields.public){
        if(x.fields.TileBg){
           var divStyle = {
            backgroundColor: x.fields.BackgroundColor,
            backgroundImage: (x.fields.BackgroundImage ? 'url(' + x.fields.BackgroundImage[0].url + ')' : 'none'),
            backgroundRepeat:"repeat",
            backgroundSize: "10vw"
          }
        }else{
          var divStyle = {
            backgroundColor: x.fields.BackgroundColor,
            backgroundImage: (x.fields.BackgroundImage ? 'url(' + x.fields.BackgroundImage[0].url + ')' : 'none')
          }
        }
      
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
  var borderStyle = {
        borderColor: x.fields.LogoBackgroundColor,
      }
      var myborderStyle = {
        borderColor: x.fields.HeadlineColor,
      }
      var mySVGStyle = {
        stroke: x.fields.HeadlineColor,
      }
      return(

        
        <div style={divStyle} key={x.id} className={i == 0 ? 'carousel-slide is-selected':'carousel-slide'}>
          {!x.fields.Slidelink ? 
            <div>
           <div className='prev-invisible invisible-block' onClick={this.goPrev} ></div>
          <div className='next-invisible invisible-block' onClick={this.goNext} ></div>
          <Menutrigger style={logoStyle}></Menutrigger>
          <h1 style={headlineStyle} className='text-large baskerville title'>{x.fields.Headline}</h1>
           {!x.fields.HeroImage ? '' :

            
            <div className={x.fields.HeroImageStyle}><img className='carousel-slide-image' alt='hero image' src={x.fields.HeroImage[0].url}/></div>
           
            
          }
          <div>
          {!x.fields.SubHeading ? '' :
          <h1 style={subheadlineStyle} className='text-large baskerville'><ReactMarkdown source={x.fields.SubHeading} /></h1>
        }
        {!x.fields.DescriptiveCopy ? '' :
          <div style={descriptionStyle} className='description text-medium'><ReactMarkdown source={x.fields.DescriptiveCopy} /></div>
        }
        </div>

        </div>
        : 
        <div>

           <div className='prev-invisible invisible-block' onClick={this.goPrev} ></div>
          <div className='next-invisible invisible-block' onClick={this.goNext} ></div>
          <Menutrigger style={logoStyle}></Menutrigger>
          <div><a href={x.fields.Slidelink} ><h1 style={headlineStyle} className='text-large baskerville title'>{x.fields.Headline}</h1></a></div>
           {!x.fields.HeroImage ? '' :
           <div> <a href={x.fields.Slidelink} > <div className={x.fields.HeroImageStyle}><img className='carousel-slide-image' alt='hero image' src={x.fields.HeroImage[0].url}/></div></a></div>
          }
          {!x.fields.SubHeading ? '' :
          <div><a href={x.fields.Slidelink} ><h1 style={subheadlineStyle} className='text-large baskerville'>{x.fields.SubHeading}</h1></a></div>
        }
        {!x.fields.DescriptiveCopy ? '' :
         <div> <a href={x.fields.Slidelink} ><div style={descriptionStyle} className='description text-medium'><ReactMarkdown source={x.fields.DescriptiveCopy} /></div></a></div>
        }
          <div style={myborderStyle} className='mobile-controls'><svg onClick={this.goPrev} width="43" height="51" viewBox="0 0 43 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={mySVGStyle} d="M42.25 49.3157L0.999999 25.5L42.25 1.6843L42.25 49.3157Z" stroke="black"/>
            </svg>
            <span style={headlineStyle}> {i+1}/{carousel_slides.length}</span>
            <svg onClick={this.goNext} width="43" height="51" viewBox="0 0 43 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={mySVGStyle} d="M42.25 49.3157L0.999999 25.5L42.25 1.6843L42.25 49.3157Z" stroke="black"/>
            </svg>
            </div>
        </div>
         }
        </div>

       )
     }
      }) : 'loading'
  


    return (

     <header className="App-header">

       <Slider
            action={this.handler}
            currentIndex={currentIndex}
            options={{
              on:{change:this.props.action},
              autoPlay: 6000,
              pauseAutoPlayOnHover: true,
              wrapAround: true,
              fullscreen: true,
              adaptiveHeight: true,
              pageDots: false,
              prevNextButtons:false,
              draggable:false,
        arrowShape: "M1.9,49.9h96.9 M17.1,34.4C12.4,39.3,6,45.8,1.8,49.9l15.3,15.7"
            }}
          >
    {slides}

    </Slider>



      </header>




    );
  }
}

export default Homecarousel
