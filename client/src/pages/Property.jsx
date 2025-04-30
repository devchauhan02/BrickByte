import React from 'react'
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai';
import {FaShower} from 'react-icons/fa'
import { MdMeetingRoom , MdLocationPin} from 'react-icons/md';
import Map from '../component/Map'


const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
 
  const { data, isLoading, isError } = useQuery(["residency", id], () => getProperty(id));

  if (isLoading) return <div className="flex justify-center items-center mt-4 "><PuffLoader color="#36d7b7" height={80} width={80} radius={1} aria-label="Loading..." /></div>;
  if (isError) return <div className="flex justify-center mt-4">Error while fetching data</div>;

  return (
    <div>
      <div className="gap-[2rem] relative">
        <div className='absolute top-[1.1rem] right-[15rem] cursor-pointer'>
          <AiFillHeart size={24} color='red' />
        </div>
        <img src={data?.residency?.image} className='mx-auto max-h-[30rem] w-[70%] rounded-xl mt-[2rem] object-cover' />

        <div className="flex flex-col md:flex-row justify-between gap-8 w-[70%] mx-auto">
          {/* Left Section */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-[1rem]  mt-[1.9rem]">
              <span className="text-3xl font-bold text-primary">{data?.residency?.title}</span>
              <span className="text-orange-500 text-xl font-semibold">
                $ {data?.residency?.price}
              </span>
            </div>

            {/* Facilities */}
            <div className="flex flex-col md:flex-row gap-4 text-sm p-4  ">
              <div className="flex items-center gap-2">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities?.parkings} Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            {/* Description */}
            <span className="text-gray-500 text-justify  ">{data?.residency?.description}</span>

            <div className="flex items-center gap-4 ">
            <MdLocationPin size={25} />
            <span className="text-gray-600">
              {data?.residency?.address} {data?.residency?.city} {data?.country}
            </span>
          </div>
          <button className="w-[35%] mt-4 px-1 py-3 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-lg transition-transform hover:scale-105">
            Book Your Visit
          </button>
          </div>

          {/* Right Section */}
          <div className='flex flex-col gap-6 flex-1'>
             <Map address = {data?.residency?.address} city = {data?.residency?.city} country = {data?.residency?.country} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Property