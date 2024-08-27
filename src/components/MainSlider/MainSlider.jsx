import { useState, useEffect } from "react";
import classes from "./MainSlider.module.css";
import image1 from "../../assets/images/slider-2.jpeg";
import image2 from "../../assets//images/grocery-banner-2.jpeg";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";

import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = [
    {
      src: slide1,
      label: "Slide 1",
    },
    {
      src: slide2,
      label: "Slide 2",
    },
    {
      src: slide3,
      label: "Slide 3",
    },
  ];

  return (
    <>
      <section className="py-20 hidden lg:block">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="w-2/3 ">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    className="w-full h-80 object-cover"
                    src={image.src}
                    alt={image.label}
                  />
                ))}
              </Slider>
            </div>
            <div className="w-1/3 flex flex-col">
              <img className="w-full h-40 object-cover " src={image1} alt="" />
              <img className="w-full h-40 object-cover" src={image2} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
