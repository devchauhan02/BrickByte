import React from "react";
import data from "../utils/slider.json";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../utils/common";

const Residencies = () => {
  return (
    <div  className="flex flex-col gap-8 relative overflow-hidden px-6 py-10 max-w-[1200px] mx-auto">
      {/* Headings */}
      <div className="flex flex-col items-start gap-2 mb-2 ">
        <span className="text-orange-500 text-lg font-semibold">Best Choices</span>
        <span className="text-3xl font-bold"  style={{ color: "#1f3e72" }}>Popular Residencies</span>
      </div>

      {/* Slider */}
      <Swiper {...sliderSettings} className="w-full">
        <SlideNextButton />
        {data.map((card, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col items-start gap-2 p-4 rounded-xl max-w-max m-auto transition-all duration-300 hover:scale-105 hover:bg-gradient-to-b from-transparent to-blue-200/50 hover:shadow-[0px_72px_49px_-51px_rgba(136,160,255,0.21)] cursor-pointer">
              <img src={card.image} alt="home" className="w-full max-w-[15rem]" />
              <span className="text-gray-400 text-xl font-semibold">
                <span className="text-orange-500">$</span>{card.price}
              </span>
              <span className="text-2xl font-bold text-white" style={{ color: "#1f3e72" }}>{card.name}</span>
              <span className="text-sm text-gray-400 w-[15rem]">{card.detail}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute top-[-4rem] right-0 flex gap-4 sm:static sm:justify-center mt-4">
      <button onClick={() => swiper.slidePrev()} className="text-blue-500 bg-[#EEEEFF] text-lg px-3 py-1 rounded-md cursor-pointer ">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="text-blue-500  text-lg px-3 py-1 rounded-md shadow-md cursor-pointer hover:bg-blue-50">
        &gt;
      </button>
    </div>
  );
};
