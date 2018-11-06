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
          <img src="https://i.postimg.cc/SNNcbc7m/Untitled-3.png" alt="jeje" />
        </div>
        <div>
          <img src="http://bulsu.edu.ph/resources/news/president_anniversary_2018.jpg" alt="jeje" />
        </div>
        <div>
          <img src="http://bulsu.edu.ph/resources/news/scitech_week_2018.jpg" alt="jeje" />
        </div>
      </Carousel>
    );
  }
}
export default DemoCarousel;
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

