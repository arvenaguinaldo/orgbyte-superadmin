import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import TopBarAndFooter from '../layouts/TopBarAndFooter';
import Events from './EventSection/Event';
import Organizations from './OrganizationSection/Organizations';
import style from './index.scss';
import Announcement from './AnnouncementSection/Announcement';

class HomePage extends Component {
  render() {
    return (
      <TopBarAndFooter>
        <div className={style.Children}>
          <Carousel autoPlay showThumbs={false} showStatus={false} infiniteLoop dynamicHeight>
            <div><img src="http://bulsu.edu.ph/resources/slider/pres_gascon.jpg" alt="TopNews" /></div>
            <div><img src="http://bulsu.edu.ph/resources/slider/COED_LLE.jpg" alt="TopNews" /></div>
            <div><img src="http://bulsu.edu.ph/resources/slider/call_for_papers_2018_revised.jpg" alt="TopNews" /></div>
          </Carousel>
          <Events />
          <Announcement />
          <Organizations />
        </div>
      </TopBarAndFooter>
    );
  }
}

export default HomePage;
