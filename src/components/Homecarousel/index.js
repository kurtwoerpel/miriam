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
      fetch('https://api.airtable.com/v0/apprjbiiZGRAW9lxA/homepage_carousel?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY)
        .then(res => res.json())
        .then(res => {
          this.setState({ carousel_slides: res.records })
        })
        .catch(error => console.log(error))
    }

  handler(){
  console.log('handler')
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
//   showRight(e){
//     document.getElementsByClassName('left-arrow')[0].classList.remove('on')
//     document.getElementsByClassName('right-arrow')[0].classList.add('on')
   

//   }
//   showLeft(e){
//     document.getElementsByClassName('right-arrow')[0].classList.remove('on')
//     document.getElementsByClassName('left-arrow')[0].classList.add('on')




//   }
//    moveRight(e){
//     let x = e.nativeEvent.clientX;
//     let y = e.nativeEvent.clientY;
//     document.getElementsByClassName('right-arrow')[0].style.left = x - 50 + 'px';
//     document.getElementsByClassName('right-arrow')[0].style.top = y - 95 + 'px';
//   }
//   moveLeft(e){
//     console.log('hi')

// let x = e.nativeEvent.clientX;
//     let y = e.nativeEvent.clientY;
//     document.getElementsByClassName('left-arrow')[0].style.left = x - 50 + 'px';
//     document.getElementsByClassName('left-arrow')[0].style.top = y - 95 + 'px';
//     // let x = e.nativeEvent.clientX;
//     // let y = e.nativeEvent.clientY;
//     // document.getElementsByClassName('left-arrow')[0].style.left = x + 'px';
//     // document.getElementsByClassName('left-arrow')[0].style.top = y + 'px';
//   }
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
  //onMouseEnter={(e) => this.showRight(e)} onMouseMove={(e) => this.moveRight(e)}

   render() {
   	const { carousel_slides, carousel, currentIndex } = this.state;

  
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
  var borderStyle = {
        borderColor: x.fields.LogoBackgroundColor,
      }
      return(


        <div style={divStyle} key={x.id} className={i == 0 ? 'carousel-slide is-selected':'carousel-slide'}>

           <div className='prev-invisible invisible-block' onClick={this.goPrev} ></div>
          <div className='next-invisible invisible-block' onClick={this.goNext} ></div>
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
