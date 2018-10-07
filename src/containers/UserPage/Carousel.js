import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel
        autoPlay
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        dynamicHeight
      >
        <div>
          <img src="http://bulsu.edu.ph/resources/slider/pres_gascon.jpg" alt="jeje" />
        </div>
        <div>
          <img src="http://bulsu.edu.ph/resources/slider/COED_LLE.jpg" alt="jeje" />
        </div>
        <div>
          <img src="http://bulsu.edu.ph/resources/slider/call_for_papers_2018_revised.jpg" alt="jeje" />
        </div>
      </Carousel>
    );
  }
}
export default DemoCarousel;
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

