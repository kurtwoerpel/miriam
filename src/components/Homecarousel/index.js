import React, { Component } from 'react';
import './style.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Slider} from '../';

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Homecarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carousel_slides: [],
    };

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


   render() {
   	const { carousel_slides } = this.state;

  
    const flickityOptions = {
    	cellAlign:'left',
    	contain:true
    }
    const slides = carousel_slides.length > 0 ? carousel_slides.map((x)=>{
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
        <div style={divStyle} key={x.id} className='carousel-slide'>
          <div style={logoStyle} className='logo text-small'>Miriam</div>
          <h1 style={headlineStyle} className='text-large'>{x.fields.Headline}</h1>
          <h1 style={subheadlineStyle} className='text-large'>{x.fields.SubHeading}</h1>
           {!x.fields.HeroImage ? '' :
            <img className='carousel-slide-image' alt='hero image' src={x.fields.HeroImage[0].url}/>
          }
          <div style={descriptionStyle} className='description text-medium'>{x.fields.DescriptiveCopy}</div>
        </div>
       )
      }) : 'noslides'

    console.log(slides)
    return (

     <header className="App-header">
 <Slider
            options={{
              autoPlay: 4000,
              pauseAutoPlayOnHover: true,
              wrapAround: true,
              fullscreen: true,
              adaptiveHeight: true,
            }}
          >
    {slides}
    </Slider>

        <p className='text-large col-md-4 offset-md-4'>
          Miriam!
        </p>

      </header>




    );
  }
}

export default Homecarousel
