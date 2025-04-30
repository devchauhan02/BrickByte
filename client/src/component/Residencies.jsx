import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../utils/common";
import PropertyCard from "./PropertyCard";
import useProperties from "../hooks/useProperties";
import PuffLoader from "react-spinners/PuffLoader";

const Residencies = () => {
  const {data , isLoading, isError} = useProperties();
  
  if(isLoading) return <div className="flex justify-center items-center mt-4 "><PuffLoader color="#36d7b7" height={80} width={80} radius={1} aria-label="Loading..." /></div>;
  if(isError) return <div className="flex justify-center mt-4">Error while fetching data</div>;
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
        {data.residencies.slice(0 , 8).map((card, i) => (
          <SwiperSlide key={i}>
            <PropertyCard card={card} />
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
