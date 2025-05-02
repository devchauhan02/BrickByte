import React from "react";
import { truncate } from 'lodash';
import { useNavigate } from "react-router-dom";
import "swiper/css";
import Heart from "./Heart";
const PropertyCard = ({ card }) => {
    const navigate = useNavigate();

    return (
        <div className=" relative flex flex-col items-start gap-2 p-4 rounded-xl max-w-max m-auto transition-all duration-300 hover:scale-105 hover:bg-gradient-to-b from-transparent to-blue-200/50 hover:shadow-[0px_72px_49px_-51px_rgba(136,160,255,0.21)] cursor-pointer " 
        onClick={() => navigate(`/properties/${card.id}`)}>
            <div className="absolute top-5 right-5 z-10">
    <Heart id={card.id} />
  </div>
            <img src={card.image} alt="home" className="w-full max-w-[15rem] h-[10rem] rounded-xl" />
            <span className="text-gray-400 text-xl font-semibold">
                <span className="text-orange-500">$</span>{card.price}
            </span>
            <span className="text-2xl font-bold text-white" style={{ color: "#1f3e72" }}>{truncate(card.title, {length: 15})}</span>
            <span className="text-sm text-gray-400 w-[15rem]">{truncate(card.description , {length: 80})}</span>
        </div>
    );
};

export default PropertyCard;
