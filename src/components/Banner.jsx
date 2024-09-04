
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 5000, 
  };

  return (
    <div className="banner">
      <Slider {...settings}>
        <div>
          <img src="/src/img/banner4.jpg" alt="Imagen 1" />
        </div>
        <div>
          <img src="/src/img/banner5.jpg" alt="Imagen 2" />
        </div>
        <div>
            <img src="/src/img/banner6.jpg" alt="Imagen 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;

