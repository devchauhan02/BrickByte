import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="relative z-[1] text-white pb-8 bg-black pt-8">
      <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex flex-col gap-12 max-w-[550px] sm:px-15">
          <div className="relative z-[1]">
            <div className="absolute right-[55%] -top-[8%] w-12 h-12 rounded-full z-[-10] bg-gradient-to-r from-orange-400 to-orange-600" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "ease-in" }}
              className="font-semibold text-[3.8rem] leading-[4rem] sm:text-[2.5rem] sm:leading-[3rem] "
            >
              Discover <br />
              Most Suitable <br /> Property
            </motion.h1>
          </div>

          <div className="flex flex-col text-gray-300 text-sm leading-6 gap-2">
            <span>Find a variety of properties that suit you very easily</span>
            <span>Forget all difficulties in finding a residence for you</span>
          </div>

          <SearchBar/>

          <div className="flex justify-between w-full flex-wrap gap-6 sm:justify-center">
            <div className="flex flex-col items-center">
              <span className="text-[2rem] sm:text-[1.5rem]">
                <CountUp start={8800} end={9000} duration={4} /> <span className="text-orange-500">+</span>
              </span>
              <span className="text-gray-300 text-sm sm:text-xs">Premium Products</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[2rem] sm:text-[1.5rem]">
                <CountUp start={1950} end={2000} duration={4} /> <span className="text-orange-500">+</span>
              </span>
              <span className="text-gray-300 text-sm sm:text-xs">Happy Customers</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[2rem] sm:text-[1.5rem]">
                <CountUp end={28} /> <span className="text-orange-500">+</span>
              </span>
              <span className="text-gray-300 text-sm sm:text-xs">Award Winning</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "ease-in" }}
            className="w-[38rem] h-[34rem] sm:w-[95%] sm:h-[28rem] overflow-hidden rounded-t-[18rem] border-[10px] border-white/10"
          >
            <img src="./hero-image.png" alt="houses" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
