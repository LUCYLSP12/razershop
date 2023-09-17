import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { GetContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Swiper, SwiperSlide} from "swiper/react";
import s from './home.css'
import { ProductList } from "../../productList";

export const Home = () => {

  const {user,} = GetContext();
  const navigate = useNavigate();

  useEffect(()=> {
    if(localStorage.getItem(`user`) === null){
      navigate("login")

    }
  
  }, [navigate]);






  // useEffect(()=> {
  //   if(!user.token){
  //     navigate("/login")
  //     navigate("/") 
  //   }
  //   }),[navigate, user]

 
  return (

    
    <div>
      <Container fixed>
      <Swiper

spaceBetween={30} 
centeredSlides={true}
autoplay={{
delay: 2500,
disableOnInteraction: false,
}}


  Pagination={{
    dynamicBullets: true,
    Clipboard: true,
  }}
  navigation={true}
  modules={[Pagination,Autoplay, Navigation]}
  className={s.mySwiper}
>
    <SwiperSlide><img className={s.next} src="https://www.bleepstatic.com/content/hl-images/2020/09/11/razer.jpg" alt=""/></SwiperSlide>
  <SwiperSlide><img className={s.next}src="https://static.razer.ru/media/offers/new-bundle.jpg" alt="" /></SwiperSlide>
  <SwiperSlide><img className={s.next} src="https://rozetked.me/images/uploads/N2IUQzKUTwDY.jpg" alt="" /></SwiperSlide>
</Swiper>







<ProductList/>





<footer>
  <div className="icon">
  <a href="https://www.instagram.com/razer/"><img className="insticon" src="src/img/free-icon-instagram-1384089.png" alt="" /> </a>
  </div>
</footer>


      </Container>
    </div>







    
  );
};
