import "./index.scss"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay,  Navigation } from 'swiper/modules';

const Header = () => {
  return (
    <section id="Header">
         <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}

        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
           <img src="https://preview.colorlib.com/theme/tasty/images/bg_1.jpg" alt="" />
           <div className="content">
            <h1>Book a table for yourselfa at a time convenient for you</h1>
            <button>Book a table</button>
           </div>
        </SwiperSlide>
        <SwiperSlide>
           <img src="https://preview.colorlib.com/theme/tasty/images/bg_2.jpg" alt="" />
           <div className="content">
            <h1>Book a table for yourselfa at a time convenient for you</h1>
            <button>Book a table</button>
           </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Header