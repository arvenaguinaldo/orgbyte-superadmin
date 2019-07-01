import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import TopBarAndFooter from '../layouts/TopBarAndFooter';
import Events from './EventSection/Event';
import Organizations from './OrganizationSection/Organizations';
import style from './index.scss';
import Announcement from './AnnouncementSection/Announcement';
import VideoSection from './VideoSection/VideoSection';

class HomePage extends Component {
  render() {
    return (
      <TopBarAndFooter>
        <div className={style.CarouselContainer}>
          <Carousel autoPlay showThumbs={false} showStatus={false} infiniteLoop dynamicHeight>
            <div><img src="http://bulsu.edu.ph/resources/slider/pres_gascon.jpg" alt="TopNews" /></div>
            <div><img src="http://bulsu.edu.ph/resources/slider/6b81f230dad0c1c002d99630ed2f4bba.jpg" alt="TopNews" /></div>
            <div><img src="http://bulsu.edu.ph/resources/slider/foi_slider.jpg" alt="TopNews" /></div>
            <div><img src="http://bulsu.edu.ph/resources/slider/bulsu_iso_2018.jpg" alt="TopNews" /></div>
            <div><img src="http://bulsu.edu.ph/resources/slider/call_for_papers_2018_revised.jpg" alt="TopNews" /></div>
          </Carousel>
          <VideoSection />
          <Events />
          <Announcement />
          <Organizations />
        </div>
      </TopBarAndFooter>
    );
  }
}
export default HomePage;
