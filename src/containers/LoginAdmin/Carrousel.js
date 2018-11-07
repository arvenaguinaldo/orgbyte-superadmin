import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Carousel autoPlay showThumbs={false} showStatus={false} infiniteLoop dynamicHeight>
          <div><img src="https://i.postimg.cc/zGD9vbyr/Untitled-4.png" alt="TopNews" /></div>
          <div><img src="https://i.postimg.cc/zGD9vbyr/Untitled-4.png" alt="TopNews" /></div>
          <div><img src="https://i.postimg.cc/zGD9vbyr/Untitled-4.png" alt="TopNews" /></div>
        </Carousel>
      </div>
    );
  }
}

export default HomePage;
